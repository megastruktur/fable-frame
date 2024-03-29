FROM node:18 as base
# Env variables
ARG PUBLIC_POCKETBASE_URL
ENV PUBLIC_POCKETBASE_URL $PUBLIC_POCKETBASE_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx:stable as application
WORKDIR /usr/share/nginx/html
COPY --from=base /app/build .
# COPY --from=base /app/build_config/nginx_templates /etc/nginx/templates

EXPOSE 80
