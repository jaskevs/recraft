# Directus Schema Workflow Guide

This guide explains how to keep Directus schema changes in source control and apply them across environments.

## Recommended Flow
1. Start the containers:
   ```bash
   cd backend
   docker compose up -d
   ```
2. Make collection/field changes inside the Directus admin UI.
3. Snapshot the schema back into the repo:
   ```bash
   cd ..   # repo root if not already there
   npm run schema:snapshot
   ```
4. Commit the updated `backend/snapshots/schema.yaml`.

## Applying the Snapshot Locally
If a teammate updates the snapshot, pull their changes and run:
```bash
npm run schema:apply:local
```
This copies `backend/snapshots/schema.yaml` into the Directus container and reapplies it. The command is safe to repeat.

## Production / Render Workflow
1. Build and deploy the backend image using `backend/Dockerfile` (the snapshot is copied into the image).
2. When the container starts, `entrypoint.sh` automatically applies `/directus/snapshots/schema.yaml`.
3. After modifying the schema, repeat the snapshot/commit/redeploy steps to propagate changes.

## Troubleshooting
- **Schema already exists**: Directus will log warnings when schema is unchanged. This is expected.
- **Database errors**: Check `docker compose -f backend/docker-compose.yml logs directus` for details. Ensure the snapshot matches the target environment's current schema state.
- **Snapshot missing**: Verify `backend/snapshots/schema.yaml` exists. If it was removed, create a new snapshot before deploying.

## Post-Change Checklist
- Confirm the Directus admin panel reflects your new fields/collections.
- Verify the Remix frontend loads data as expected.
- Commit the snapshot so other environments stay aligned.

Need more background? See `docs/context/backend-directus.md` for architecture details.
