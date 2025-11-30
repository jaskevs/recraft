#!/usr/bin/env sh
set -e

echo "========================================"
echo "Initializing Directus..."
echo "========================================"

# Bootstrap Directus (creates admin user, initializes DB)
echo "[1/3] Running bootstrap..."
if npx directus bootstrap; then
  echo "✓ Bootstrap completed successfully"
else
  echo "⚠ Bootstrap failed or already completed (this is usually fine)"
fi

# Apply schema snapshot if it exists
if [ -f "/directus/snapshots/schema.yaml" ]; then
  echo "[2/3] Applying schema snapshot..."
  if npx directus schema apply /directus/snapshots/schema.yaml --yes; then
    echo "✓ Schema applied successfully"
  else
    echo "⚠ Schema apply failed (may already be up-to-date)"
  fi
else
  echo "[2/3] No schema snapshot found, skipping..."
fi

echo "[3/3] Starting Directus server..."
echo "========================================"
exec npx directus start