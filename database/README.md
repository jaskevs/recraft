# Payload Postgres (Docker)

This is an isolated Postgres instance for the Payload app.

## Start / Stop

```bash
# from repo root (or from ./database)
docker compose -f database/docker-compose.yml --env-file database/.env up -d
docker compose -f database/docker-compose.yml --env-file database/.env ps
docker compose -f database/docker-compose.yml --env-file database/.env logs -f
docker compose -f database/docker-compose.yml --env-file database/.env down
```

## Connection string (host → container)

Use this in `payload/.env` when running Payload on your host:

```
DATABASE_URL=postgres://payload:payload_pass@localhost:5434/recraft_payload
```

## Connection string (container → container)

If you later run the Payload app in Docker on the same compose/network, use the service name and internal port:

```
DATABASE_URL=postgres://payload:payload_pass@payload-postgres:5432/recraft_payload
```

## Notes

- Data is persisted in the `payload_pg_data` Docker volume.
- Change credentials/port in `database/.env` if needed.
- Healthcheck waits for the DB to be ready before dependent services (if any) start.
