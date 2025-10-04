FROM directus/directus:10.13.1

USER root
RUN mkdir -p /directus/uploads /directus/extensions /directus/snapshots

# Bake the committed schema snapshot and seed assets into the image
COPY --chown=node:node snapshots /directus/snapshots
COPY --chown=node:node seed-data.json /directus/seed-data.json
COPY --chown=node:node scripts /directus/scripts

COPY --chown=node:node entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
USER node

EXPOSE 8055
CMD ["/entrypoint.sh"]