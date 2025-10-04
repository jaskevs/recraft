#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DEFAULT_URL = 'http://127.0.0.1:8055';
const DIRECTUS_URL = process.env.DIRECTUS_URL || DEFAULT_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'General@7';
const SEED_FILE = process.env.DIRECTUS_SEED_FILE || '/directus/seed-data.json';

function log(message) {
  process.stdout.write(`[seed] ${message}\n`);
}

function preparePostPayload(post) {
  if (!post) return {};
  const { user_created, user_updated, id, ...rest } = post;
  return rest;
}

async function readSeedData() {
  try {
    const filePath = path.resolve(SEED_FILE);
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Unable to read seed file at ${SEED_FILE}: ${error.message}`);
  }
}

async function login() {
  const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to authenticate (${response.status}): ${text}`);
  }

  const data = await response.json();
  const token = data?.data?.access_token;
  if (!token) {
    throw new Error('Directus auth response missing access_token');
  }

  return token;
}

async function fetchJSON(pathname, token, options = {}) {
  const url = pathname.startsWith('http') ? pathname : `${DIRECTUS_URL}${pathname}`;
  const headers = Object.assign(
    { 'content-type': 'application/json' },
    options.headers || {},
    token ? { Authorization: `Bearer ${token}` } : {}
  );

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request to ${url} failed (${response.status}): ${text}`);
  }
  return response.json();
}

async function findPostBySlug(slug, token) {
  const params = new URLSearchParams();
  params.set('filter[slug][_eq]', slug);
  params.set('limit', '1');
  const data = await fetchJSON(`/items/posts?${params.toString()}`, token, { method: 'GET', headers: { accept: 'application/json' } });
  const items = data?.data || [];
  return Array.isArray(items) && items.length > 0 ? items[0] : null;
}

async function upsertPost(post, token) {
  const payload = preparePostPayload(post);
  const existing = await findPostBySlug(post.slug, token);

  if (existing) {
    await fetchJSON(`/items/posts/${existing.id}`, token, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
    log(`Updated post: ${post.slug}`);
  } else {
    await fetchJSON('/items/posts', token, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    log(`Created post: ${post.slug}`);
  }
}

async function run() {
  log(`Connecting to Directus at ${DIRECTUS_URL}`);
  const payload = await readSeedData();
  const posts = Array.isArray(payload.posts) ? payload.posts : [];

  if (posts.length === 0) {
    log('No posts found in seed data. Nothing to do.');
    return;
  }

  const token = await login();
  log('Authenticated as admin user.');

  for (const post of posts) {
    if (!post.slug) {
      log('Skipping post without slug.');
      continue;
    }
    await upsertPost(post, token);
  }

  log('Seed completed successfully.');
}

run().catch((error) => {
  console.error('[seed] Failed:', error.message);
  if (error.stack) {
    console.error(error.stack);
  }
  process.exit(1);
});