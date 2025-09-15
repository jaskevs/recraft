# Dockerfile for Dokploy deployment
FROM directus/directus:10.13.1

# Switch to root for file operations
USER root

# Create necessary directories
RUN mkdir -p /directus/uploads /directus/extensions /directus/snapshots

# Copy uploads and extensions directories (if they exist)
COPY --chown=node:node ./uploads /directus/uploads
COPY --chown=node:node ./extensions /directus/extensions
COPY --chown=node:node ./snapshots /directus/snapshots

# Set proper permissions
RUN chown -R node:node /directus/uploads /directus/extensions /directus/snapshots
RUN chmod -R 755 /directus/uploads /directus/extensions /directus/snapshots

# Switch back to node user for security
USER node

# Expose port
EXPOSE 8055

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8055/server/health || exit 1

# Use the default Directus entrypoint and command
CMD ["npx", "directus", "start"]