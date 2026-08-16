FROM node:20 AS frontend

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM serversideup/php:8.4-fpm-nginx

USER root

COPY . /var/www/html
COPY --from=frontend /app/public/build /var/www/html/public/build

ENV AUTORUN_ENABLED=true
ENV PHP_OPCACHE_ENABLE=1

RUN composer install --no-dev --optimize-autoloader --no-interaction

USER www-data