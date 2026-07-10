# InfluenceIA — Backend API

A **Laravel 13** REST API serving as the backend for the InfluenceIA platform.

- **Framework:** Laravel 13 (PHP 8.2+)
- **Auth:** Laravel Sanctum (token-based, SPA-ready)
- **Database:** MySQL
- **Folder structure:** `app/Http/Controllers/Api/` · `app/Http/Requests/` · `app/Http/Resources/`

---

## Prerequisites

| Tool | Minimum version |
|---|---|
| PHP | 8.2 |
| Composer | 2.x |
| MySQL | 8.0 |

---

## Installation

### 1. Install PHP dependencies

```bash
cd backend
composer install
```

### 2. Set up the environment file

```bash
cp .env.example .env
php artisan key:generate
```

Then open `.env` and fill in your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=influenceia
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

> **Note:** Create the `influenceia` database in MySQL first:
> ```sql
> CREATE DATABASE influenceia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
> ```

### 3. Configure CORS

By default, the API accepts requests from `http://localhost:5173` (the Vite dev server).
You can override this in `.env`:

```env
FRONTEND_URL=http://localhost:5173
```

For production, set `FRONTEND_URL` to your deployed frontend URL.

### 4. Run database migrations

```bash
php artisan migrate
```

This creates the `users`, `cache`, `jobs`, and `personal_access_tokens` (Sanctum) tables.

---

## Running the local dev server

```bash
php artisan serve
```

The API will be available at **http://localhost:8000**.

You can verify it's running by hitting the health-check endpoint:

```
GET http://localhost:8000/api/health
```

Expected response (DB connected):

```json
{
  "status": "ok",
  "app": "InfluenceIA",
  "version": "13.x.x",
  "env": "local",
  "database": {
    "status": "ok",
    "driver": "mysql",
    "message": null
  },
  "timestamp": "2024-06-01T12:00:00+00:00"
}
```

---

## Project structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/          <- All API controllers go here
│   │   │       └── HealthController.php
│   │   ├── Requests/         <- Form Request validation classes
│   │   │   └── ApiFormRequest.php  (base class)
│   │   └── Resources/        <- API Resource (JSON formatters)
│   │       └── ApiResource.php     (base class)
│   └── Models/
│       └── User.php          <- HasApiTokens (Sanctum) already added
├── config/
│   ├── cors.php              <- CORS allowed origins
│   └── sanctum.php           <- Sanctum stateful domains
├── database/
│   └── migrations/           <- Schema migrations
├── routes/
│   ├── api.php               <- All /api/* routes
│   └── web.php
└── .env.example              <- Copy to .env and fill in your values
```

---

## Authentication (Sanctum tokens)

This backend uses **token-based authentication** (not cookie-based SPA auth), which is the right approach for a React SPA making explicit API calls.

Flow (to be implemented in next phase):
1. `POST /api/register` — creates user, returns `{ token }`
2. `POST /api/login` — authenticates, returns `{ token }`
3. All protected routes require: `Authorization: Bearer <token>` header
4. `POST /api/logout` — revokes current token

---

## Running tests

```bash
php artisan test
```

---

## Useful Artisan commands

```bash
# Generate a new API controller
php artisan make:controller Api/CampaignController --api

# Generate a Form Request
php artisan make:request StoreCampaignRequest

# Generate an API Resource
php artisan make:resource CampaignResource

# Generate a Model + migration
php artisan make:model Campaign -m

# Run specific migration
php artisan migrate --step
```
