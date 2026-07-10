#!/bin/sh
# ─────────────────────────────────────────────────────────────────────────────
# docker-entrypoint.sh — InfluenceIA Laravel startup script
#
# Runs on every container start (including Render deploys).
# Safe to run repeatedly: migrations are idempotent, caches are just rebuilt.
#
# NEVER calls `php artisan key:generate` — APP_KEY must be set in Render's
# environment variables dashboard (copy from your local .env once, never change).
# ─────────────────────────────────────────────────────────────────────────────

set -e

echo "==> [entrypoint] Starting InfluenceIA Laravel API..."

# ── Guard: ensure APP_KEY is set ──────────────────────────────────────────────
if [ -z "$APP_KEY" ]; then
    echo "ERROR: APP_KEY environment variable is not set!"
    echo "       Set it in Render's Environment tab (copy from your local .env)."
    exit 1
fi

# ── Fix storage/cache permissions (www-data needs write access) ────────────────
echo "==> [entrypoint] Setting storage permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# ── Create supervisor log directory ───────────────────────────────────────────
mkdir -p /var/log/supervisor

# ── Create PHP-FPM socket directory ───────────────────────────────────────────
mkdir -p /run

# ── Run database migrations (idempotent — safe to repeat on every deploy) ─────
echo "==> [entrypoint] Running database migrations..."
php artisan migrate --force

# ── Rebuild Laravel package manifest and caches ───────────────────────────────
# package:discover must run here (not at build time) because --no-scripts was
# used during `composer install` to avoid needing .env during Docker build.
echo "==> [entrypoint] Discovering packages and caching config/routes/views..."
php artisan package:discover --ansi
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> [entrypoint] Setup complete. Starting services via supervisord..."

# ── Start supervisor (manages nginx + php-fpm) ────────────────────────────────
exec supervisord -c /etc/supervisor/conf.d/supervisord.conf
