#!/usr/bin/env sh
set -e

npx directus bootstrap || true

if [ -f "/directus/snapshots/schema.yaml" ]; then
  echo "Applying schema snapshot..."
  npx directus schema apply /directus/snapshots/schema.yaml --yes || true
fi

echo "Starting Directus"
exec npx directus start