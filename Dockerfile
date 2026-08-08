# Stage 1 — build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# Stage 2 — serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html
# FRONTEND_URL controls the CORS origin for the /marketplace/ path.
# MARKETPLACE_CATALOG_TOKEN / entitlement checks are no longer done in nginx
# (2026-08-08, content-tiering feature) — /marketplace/ now proxies to
# marketplace-api, which owns both the catalog-token gate and the new
# Enterprise entitlement check as a single source of truth. See
# nginx.conf.template's /marketplace/ location comment for why.
COPY nginx.conf.template /etc/nginx/nginx.conf.template
EXPOSE 80
# envsubst injects FRONTEND_URL before nginx starts.
CMD ["/bin/sh", "-c", \
  "envsubst '${FRONTEND_URL}' \
     < /etc/nginx/nginx.conf.template \
     > /etc/nginx/conf.d/default.conf \
   && nginx -g 'daemon off;'"]
