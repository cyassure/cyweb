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
# Token-gated nginx config for the /marketplace/ path.
# MARKETPLACE_CATALOG_TOKEN and FRONTEND_URL must be set at runtime.
COPY nginx.conf.template /etc/nginx/nginx.conf.template
EXPOSE 80
# envsubst injects MARKETPLACE_CATALOG_TOKEN + FRONTEND_URL before nginx starts.
CMD ["/bin/sh", "-c", \
  "envsubst '${MARKETPLACE_CATALOG_TOKEN} ${FRONTEND_URL}' \
     < /etc/nginx/nginx.conf.template \
     > /etc/nginx/conf.d/default.conf \
   && nginx -g 'daemon off;'"]
