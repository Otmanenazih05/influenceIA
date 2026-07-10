# ─────────────────────────────────────────────────────────────────────────────
# InfluenceIA — Production Dockerfile
# Runtime: PHP 8.3-FPM + Nginx (single container, Debian Bookworm)
# Target platform: Render.com web service (Docker)
#
# IMPORTANT — before deploying, set these environment variables in Render:
#   APP_KEY          = base64:... (copy from your local .env — never regenerate)
#   APP_ENV          = production
#   APP_DEBUG        = false
#   APP_URL          = https://<your-service>.onrender.com
#   FRONTEND_URL     = https://<your-frontend>.vercel.app
#   DB_CONNECTION    = mysql  (or pgsql if using Postgres)
#   DB_HOST / DB_PORT / DB_DATABASE / DB_USERNAME / DB_PASSWORD
# ─────────────────────────────────────────────────────────────────────────────

# Debian Bookworm base — stable, well-known package names, no Alpine quirks.
# php-fpm listens on TCP 127.0.0.1:9000 by default in this official image.
FROM php:8.3-fpm

LABEL maintainer="InfluenceIA Team"

# ── System dependencies (Debian apt package names) ───────────────────────────
# libonig-dev  → mbstring
# libxml2-dev  → xml
# libzip-dev   → zip
# libicu-dev   → intl
# libfreetype6-dev + libjpeg62-turbo-dev + libpng-dev → GD
# libpq-dev    → pdo_pgsql (kept for Postgres flexibility; Aiven MySQL only needs pdo_mysql)
RUN apt-get update && apt-get install -y --no-install-recommends \
        nginx \
        supervisor \
        curl \
        git \
        zip \
        unzip \
        libonig-dev \
        libxml2-dev \
        libzip-dev \
        libicu-dev \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libpq-dev \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \
        pdo_pgsql \
        mbstring \
        xml \
        bcmath \
        zip \
        pcntl \
        fileinfo \
        intl \
        gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
# Note: ctype and tokenizer are compiled into PHP 8.x core — no separate install needed

# ── Composer ──────────────────────────────────────────────────────────────────
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ── Stage 1: Install PHP dependencies ────────────────────────────────────────
# Copy only composer files first so this layer is cached between deploys
# (only re-runs when composer.json or composer.lock changes)
COPY composer.json composer.lock ./

# COMPOSER_MEMORY_LIMIT=-1 prevents exit code 2 (OOM) when resolving
# Laravel's large dependency tree. --no-scripts skips `php artisan package:discover`
# which cannot run at build time (no .env / APP_KEY available yet).
ENV COMPOSER_MEMORY_LIMIT=-1
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    && rm -rf /root/.composer/cache

# ── Stage 2: Copy full application code ──────────────────────────────────────
COPY . .

# Re-generate the optimized autoloader now that all app files are present.
# Still skip scripts (package:discover runs in docker-entrypoint.sh at runtime).
RUN composer dump-autoload --no-scripts --optimize --no-dev

# ── Directory permissions ─────────────────────────────────────────────────────
RUN mkdir -p storage/framework/sessions \
             storage/framework/views \
             storage/framework/cache \
             storage/logs \
             bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache


# ── Nginx config ──────────────────────────────────────────────────────────────
COPY nginx.conf /etc/nginx/nginx.conf

# ── Supervisor config ─────────────────────────────────────────────────────────
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# ── Entrypoint script ─────────────────────────────────────────────────────────
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# ── Expose HTTP port ──────────────────────────────────────────────────────────
EXPOSE 80

# ── Start ─────────────────────────────────────────────────────────────────────
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
