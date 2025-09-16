#!/usr/bin/env sh
set -e

# wait briefly for DB (optional)
if [ -n "$DB_HOST" ]; then
  echo "Waiting for DB $DB_HOST:${DB_PORT:-3306}…"
  for i in $(seq 1 60); do
    (echo > /dev/tcp/$DB_HOST/${DB_PORT:-3306}) >/dev/null 2>&1 && break
    sleep 1
  done
fi

# idempotent: create core tables if empty
npx directus bootstrap || true

# idempotent: apply structure from snapshot if present
if [ -f "/directus/snapshots/schema.yaml" ]; then
  echo "Applying schema snapshot…"
  npx directus schema apply /directus/snapshots/schema.yaml --yes || true
fi

exec npx directus start