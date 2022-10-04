FROM ubuntu:22.04

# Update linux
RUN apt -y update
RUN apt -y upgrade

# Install php
RUN apt install software-properties-common apt-transport-https -y
RUN add-apt-repository ppa:ondrej/php -y
RUN apt install php8.1 libapache2-mod-php8.1

RUN apt install curl unzip
RUN apt install php php-curl
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# Install node and npm
RUN apt install nodejs npm

# INSTALL NGINX
RUN apt install nginx

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
