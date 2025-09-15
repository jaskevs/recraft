# backend/Dockerfile
FROM directus/directus:10.13.1

# Prepare standard folders (harmless if volumes are mounted)
USER root
RUN mkdir -p /directus/uploads /directus/extensions /directus/snapshots \
 && chown -R node:node /directus
USER node

EXPOSE 8055

# Healthcheck without needing curl/wget
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "fetch('http://localhost:8055/server/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npx", "directus", "start"]