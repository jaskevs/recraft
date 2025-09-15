# Recraft Backend (Directus)

## Local Development

1. Create env:
   ```bash
   cd backend
   copy .env.example.local .env   # or cp on macOS/Linux

2. Start:

docker compose up -d

3. Open:

Directus: http://localhost:8055

Health: http://localhost:8055/server/health → {"status":"ok"}

4. To stop:

docker compose down

5. To reset data (nukes local DB & uploads):

docker compose down -v