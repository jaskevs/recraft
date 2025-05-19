FROM directus/directus:10.0.0

# Install any additional extensions or custom modules
# RUN npm install -g some-directus-extension

# Custom configuration if needed
# COPY ./config.js /directus/config.js

# Add any health checks or optimizations
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8055/server/health || exit 1