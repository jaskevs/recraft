FROM directus/directus:10.13.1

USER root
RUN mkdir -p /directus/uploads /directus/extensions /directus/snapshots

# Bake the committed schema snapshot into the image for bootstrapping
COPY --chown=node:node snapshots /directus/snapshots

COPY --chown=node:node entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
USER node

EXPOSE 8055
CMD ["/entrypoint.sh"]