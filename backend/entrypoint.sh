#!/usr/bin/env sh
set -e

# Wait for DB (optional but helpful)
if [ -n "$DB_HOST" ]; then
  echo "Waiting for DB $DB_HOST:$DB_PORT…"
  for i in $(seq 1 60); do
    (echo > /dev/tcp/$DB_HOST/${DB_PORT:-3306}) >/dev/null 2>&1 && break
    sleep 1
  done
fi

# One-time bootstrap (safe to run repeatedly)
npx directus bootstrap || true

# Optional: apply a schema snapshot when present (fully declarative)
# Put your exported snapshot at /directus/snapshots/schema.yaml
if [ -f "/directus/snapshots/schema.yaml" ]; then
  echo "Applying Directus schema snapshot…"
  npx directus schema apply /directus/snapshots/schema.yaml --yes || true
fi

# Start Directus
exec npx directus start
