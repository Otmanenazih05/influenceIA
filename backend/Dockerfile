# ─────────────────────────────────────────────────────────────────────────────
# InfluenceIA — Production Dockerfile
# Runtime: PHP 8.3-FPM + Nginx (single container, Alpine Linux)
# Target platform: Render.com web service (Docker)
#
# IMPORTANT — before deploying, set these environment variables in Render:
#   APP_KEY          = base64:... (copy from your local .env — never regenerate)
#   APP_ENV          = production
#   APP_DEBUG        = false
#   APP_URL          = https://<your-service>.onrender.com
#   FRONTEND_URL     = https://<your-frontend>.vercel.app
#   DB_CONNECTION    = mysql (or pgsql)
#   DB_HOST / DB_PORT / DB_DATABASE / DB_USERNAME / DB_PASSWORD
# ─────────────────────────────────────────────────────────────────────────────

FROM php:8.3-fpm-alpine

LABEL maintainer="InfluenceIA Team"

# ── System dependencies ───────────────────────────────────────────────────────
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    git \
    zip \
    unzip \
    oniguruma-dev \
    libxml2-dev \
    libzip-dev \
    icu-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        pdo_pgsql \
        mbstring \
        xml \
        ctype \
        bcmath \
        tokenizer \
        zip \
        pcntl \
        fileinfo \
        intl \
        gd \
    && rm -rf /var/cache/apk/*

# ── Composer ──────────────────────────────────────────────────────────────────
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# ── App source code ───────────────────────────────────────────────────────────
WORKDIR /var/www/html

COPY . .

# ── Install PHP dependencies (production only, no dev) ────────────────────────
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    && rm -rf /root/.composer/cache

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
