@"
# Rehive Space Backend

Directus-powered headless CMS for rehive space

## Setup
1. Copy `.env.example` to `.env` and adjust values
2. Run `docker-compose up -d`
3. Access Directus admin panel at http://localhost:8055

## Structure
- `/docker`: Docker configuration files
- `/snapshots`: Directus schema snapshots for version control
- `/extensions`: Custom Directus extensions
"@ | Out-File -FilePath "backend\README.md" -Encoding utf8