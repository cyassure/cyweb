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
# MARKETPLACE_CATALOG_TOKEN gates catalog access to licensed CyCentra 360 instances.
COPY nginx.conf.template /etc/nginx/nginx.conf.template
EXPOSE 80
# envsubst injects FRONTEND_URL and MARKETPLACE_CATALOG_TOKEN before nginx starts.
CMD ["/bin/sh", "-c", \
  "envsubst '${FRONTEND_URL} ${MARKETPLACE_CATALOG_TOKEN}' \
     < /etc/nginx/nginx.conf.template \
     > /etc/nginx/conf.d/default.conf \
   && nginx -g 'daemon off;'"]
