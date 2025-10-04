#!/usr/bin/env sh
set -e

DB_HOST="${DB_HOST:-}"
DB_PORT="${DB_PORT:-5432}"

if [ -n "$DB_HOST" ]; then
  echo "Waiting for database $DB_HOST:$DB_PORT..."
  COUNT=0
  until (echo > /dev/tcp/$DB_HOST/$DB_PORT) >/dev/null 2>&1; do
    COUNT=$((COUNT + 1))
    if [ "$COUNT" -ge 60 ]; then
      echo "Database did not become ready in time. Continuing regardless."
      break
    fi
    sleep 1
  done
fi

npx directus bootstrap || true

if [ -f "/directus/snapshots/schema.yaml" ]; then
  echo "Applying schema snapshot..."
  npx directus schema apply /directus/snapshots/schema.yaml --yes || true
fi

echo "Starting Directus"
exec npx directus start