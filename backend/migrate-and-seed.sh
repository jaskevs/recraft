#!/bin/bash

set -euo pipefail

# Colour codes for readable CLI output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SNAPSHOT_PATH="${BACKEND_DIR}/snapshots/schema.yaml"
HEALTH_URL="${DIRECTUS_HEALTH_URL:-http://localhost:8055/server/health}"

if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE="docker-compose"
else
  printf "${RED}[recraft] docker compose/docker-compose not found.${NC}\n"
  exit 1
fi

DIRECTUS_SERVICE="directus"

log() {
  printf "${GREEN}[recraft]${NC} %s\n" "$1"
}

warn() {
  printf "${YELLOW}[recraft] %s${NC}\n" "$1"
}

error() {
  printf "${RED}[recraft] %s${NC}\n" "$1"
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    error "Required command '$1' not found on PATH."
    exit 1;
  fi
}

ensure_stack_running() {
  if ! ${COMPOSE} ps --services --filter status=running | grep -q "^${DIRECTUS_SERVICE}$"; then
    warn "Directus container is not running; starting with '${COMPOSE} up -d'."
    ${COMPOSE} up -d
  fi
}

wait_for_directus() {
  warn "Waiting for Directus health endpoint at ${HEALTH_URL}..."
  until curl -sSf "${HEALTH_URL}" >/dev/null 2>&1; do
    printf '.'
    sleep 2
  done
  printf "\n"
  log "Directus is healthy."
}

apply_schema() {
  if [ ! -f "${SNAPSHOT_PATH}" ]; then
    error "Schema snapshot not found at ${SNAPSHOT_PATH}."
    exit 1
  fi

  log "Applying schema snapshot to Directus."
  ${COMPOSE} exec ${DIRECTUS_SERVICE} npx directus schema apply /directus/snapshots/schema.yaml --yes
}

seed_data() {
  log "Seeding data via /directus/scripts/seed.cjs"
  ${COMPOSE} exec ${DIRECTUS_SERVICE} node /directus/scripts/seed.cjs
}

print_menu() {
  cat <<'EOF'
Choose an option:
  [1] Apply schema snapshot only
  [2] Apply schema snapshot and seed sample data
  [3] Seed sample data only
  [4] Exit without changes
EOF
}

main() {
  require_command docker
  require_command curl

  cd "${BACKEND_DIR}"

  print_menu
  read -rp "Selection: " choice

  case "$choice" in
    1)
      ensure_stack_running
      wait_for_directus
      apply_schema
      ;;
    2)
      ensure_stack_running
      wait_for_directus
      apply_schema
      seed_data
      ;;
    3)
      ensure_stack_running
      wait_for_directus
      seed_data
      ;;
    4)
      warn "No changes applied."
      exit 0
      ;;
    *)
      error "Invalid selection."
      exit 1
      ;;
  esac

  log "Done."
}

main "$@"
