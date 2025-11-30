# Payload Postgres (Docker)

This is an isolated Postgres instance for the Payload app.

## Start / Stop

```bash
# from repo root (uses your root .env)
docker compose -f database/docker-compose.yml up -d
docker compose -f database/docker-compose.yml ps
docker compose -f database/docker-compose.yml logs -f
docker compose -f database/docker-compose.yml down
```

## Connection string (host → container)

Use this in your root `.env` when running Payload on your host:

```env
DATABASE_URI=postgres://payload:payload_pass@localhost:5434/recraft_payload
```

## Connection string (container → container)

If you later run the Payload app in Docker on the same compose/network, use the service name and internal port:

```env
DATABASE_URI=postgres://payload:payload_pass@payload-postgres:5432/recraft_payload
```

## Notes

- Data is persisted in the `payload_pg_data` Docker volume.
- Change credentials/port in your root `.env` if needed (POSTGRES_* vars and the DATABASE_URI connection string).
- Healthcheck waits for the DB to be ready before dependent services (if any) start.
