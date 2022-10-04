FROM alpine:latest

# Update alpine linux
RUN apk update

# Install node and npm
RUN apk add nodejs npm

# Install php
RUN apk add php8=8.1.1

# Install depentencies
RUN apk add bash
RUN apk add curl
RUN apk add php-phar
RUN apk add php-iconv
RUN apk add php-openssl
RUN apk add composer

# INSTALL NGINX
RUN apk add nginx

# Copy the project files
COPY . .

# Install dependencies
RUN composer update
RUN composer install
RUN npm install

# Make and migrate the database
WORKDIR /database
RUN touch database.sqlite
WORKDIR /
RUN php artisan migrate

# Run the application
RUN php artisan build
RUN npm run production

EXPOSE 80
