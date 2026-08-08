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
# Pure static site — no backend, no env-driven config. The marketplace
# catalog service (marketplace-api) that used to run alongside this image
# was retired 2026-08; that responsibility now lives in CyAdmin. See
# docs/README.md for where the catalog moved to.
COPY nginx.conf.template /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
