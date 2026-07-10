# InfluenceIA — Deployment Guide

> **Stack**: Laravel 13 backend → [Render.com](https://render.com) (Docker web service) | React/Vite frontend → [Vercel](https://vercel.com)

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Backend — Deploy to Render](#2-backend--deploy-to-render)
3. [Frontend — Deploy to Vercel](#3-frontend--deploy-to-vercel)
4. [Post-Deploy: Wire Everything Together](#4-post-deploy-wire-everything-together)
5. [Environment Variable Reference](#5-environment-variable-reference)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Prerequisites

- Your code is pushed to a GitHub repository
- You have a [Render account](https://dashboard.render.com)
- You have a [Vercel account](https://vercel.com)
- You have an **external managed database** (see options below — Render's free tier disk is ephemeral)

### Database Options (choose one)

| Option | Type | Free Tier | Notes |
|--------|------|-----------|-------|
| **Render PostgreSQL** | Postgres | Yes (90 days) | Easiest — stays on Render |
| **PlanetScale** | MySQL-compatible | Yes | No schema change needed |
| **Supabase** | Postgres | Yes | Generous limits |
| **Aiven** | MySQL or Postgres | Yes (trial) | Enterprise-grade |

> **If you use Postgres**: change `DB_CONNECTION=pgsql` and `DB_PORT=5432` in Render's environment variables. The Dockerfile already installs the `pdo_pgsql` extension.

---

## 2. Backend — Deploy to Render

### Step 1: Create a Render Web Service

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**
2. Connect your GitHub repo and select the `influenceIA` repository
3. Configure the service:
   - **Name**: `influenceia-api` (or whatever you like)
   - **Root Directory**: `backend`
   - **Environment**: `Docker`
   - **Branch**: `main`
   - **Region**: Choose the closest to your users
   - **Instance Type**: `Free`
4. Render will detect the `Dockerfile` automatically

### Step 2: Set Environment Variables in Render

In the Render dashboard → your service → **Environment** tab, add these variables:

| Variable | Value |
|----------|-------|
| `APP_NAME` | `InfluenceIA` |
| `APP_ENV` | `production` |
| `APP_KEY` | Copy from your local `.env` (e.g. `base64:zSoFVb...`) — **never regenerate** |
| `APP_DEBUG` | `false` |
| `APP_URL` | `https://<your-service>.onrender.com` (fill in after deploy) |
| `FRONTEND_URL` | `https://<your-frontend>.vercel.app` (fill in after frontend deploy) |
| `DB_CONNECTION` | `mysql` (or `pgsql` if using Postgres) |
| `DB_HOST` | Your external DB host |
| `DB_PORT` | `3306` (MySQL) or `5432` (Postgres) |
| `DB_DATABASE` | Your DB name |
| `DB_USERNAME` | Your DB username |
| `DB_PASSWORD` | Your DB password |
| `SESSION_DRIVER` | `file` |
| `CACHE_STORE` | `file` |
| `QUEUE_CONNECTION` | `sync` |
| `LOG_CHANNEL` | `stderr` |
| `LOG_LEVEL` | `warning` |

> **Security**: `APP_DEBUG=false` in production — never set it to `true` on a live server.

> **APP_KEY**: This value must stay the same across all deploys. Copy it once from your local `.env`. If you change it, all existing sessions and encrypted values break.

### Step 3: Deploy

Click **Create Web Service**. Render will:
1. Build the Docker image from `backend/Dockerfile`
2. Run `docker-entrypoint.sh` which:
   - Validates `APP_KEY` is set
   - Runs `php artisan migrate --force` (safe on every deploy)
   - Caches config/routes/views
   - Starts nginx + php-fpm via supervisord

### Step 4: Verify the backend

Once deployed, visit:
```
https://<your-service>.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "app": "InfluenceIA",
  "database": { "status": "ok" },
  ...
}
```

---

## 3. Frontend — Deploy to Vercel

### Step 1: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite` (Vercel detects this automatically)
   - **Build Command**: `npm run build` (already in `package.json`)
   - **Output Directory**: `dist`

### Step 2: Set Environment Variables in Vercel

In Vercel → your project → **Settings** → **Environment Variables**:

| Variable | Value | Environments |
|----------|-------|-------------|
| `VITE_API_URL` | `https://<your-service>.onrender.com` | Production, Preview |

> No trailing slash on the URL.

### Step 3: Deploy

Click **Deploy**. Vercel will run `npm run build` and serve the `dist/` folder.

The `vercel.json` in `frontend/` configures a catch-all rewrite so React Router handles navigation correctly — no 404s on page refresh.

### Step 4: Verify the frontend

Visit your Vercel URL and try logging in. Check the browser DevTools Network tab to confirm API calls go to your Render backend with no CORS errors.

---

## 4. Post-Deploy: Wire Everything Together

After both services are live, update Render's `FRONTEND_URL` environment variable:

1. Render dashboard → your API service → **Environment**
2. Update `FRONTEND_URL` to your actual Vercel URL (e.g. `https://influenceia.vercel.app`)
3. Also update `APP_URL` to your Render URL
4. Click **Save** — Render will automatically redeploy

This ensures CORS allows requests from your production frontend.

---

## 5. Environment Variable Reference

### Backend (Render)

```env
APP_NAME=InfluenceIA
APP_ENV=production
APP_KEY=base64:your-key-here           # ← copy once from local .env
APP_DEBUG=false
APP_URL=https://your-api.onrender.com
FRONTEND_URL=https://your-app.vercel.app

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=influenceia
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password

SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=local

LOG_CHANNEL=stderr
LOG_LEVEL=warning
```

### Frontend (Vercel)

```env
VITE_API_URL=https://your-api.onrender.com
```

---

## 6. Troubleshooting

### `500 Server Error` on API calls
- Check Render logs → **Logs** tab
- Most common cause: `APP_KEY` not set or wrong `DB_*` credentials
- Run health check: `GET /api/health` — it shows DB status

### CORS errors in browser
- Verify `FRONTEND_URL` in Render matches your Vercel domain exactly (including `https://`)
- No trailing slash
- After updating env vars on Render, wait for the automatic redeploy

### React Router 404 on page refresh
- The `frontend/vercel.json` handles this with a catch-all rewrite
- If it's still happening, ensure Vercel picked up `vercel.json` from the `frontend/` subdirectory

### Migrations fail on deploy
- Check that `DB_*` credentials are correct
- Make sure your external DB allows connections from Render's IPs (check firewall/allowlist settings in your DB provider)
- Render's outbound IPs: check [Render docs](https://render.com/docs/static-outbound-ip-addresses)

### Free tier cold starts
- Render's free tier spins down after 15 minutes of inactivity
- First request after idle may take 30-60 seconds (cold start)
- To avoid: upgrade to the Starter tier ($7/month) or use a cron job to ping `/api/health` every 14 minutes

---

*Last updated: July 2026*
