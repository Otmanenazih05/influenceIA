# InfluenceIA Setup Guide

Welcome to the **InfluenceIA** repository. This guide covers how to set up the backend (Laravel) and frontend (React/Vite) for local development and demo purposes.

## Prerequisites

- **PHP 8.2+** and **Composer**
- **Node.js 18+** and **npm**
- **MySQL** (or another supported relational database)
- **Git**

## 1. Backend Setup (Laravel)

The backend serves as the core API, handling authentication, data management, and the mock AI scoring & payment systems.

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your local database credentials (e.g., `DB_DATABASE=influenceia`, `DB_USERNAME=root`, etc.).

4. **Generate Application Key:**
   ```bash
   php artisan key:generate
   ```

5. **Run Migrations & Seed Demo Data:**
   ```bash
   php artisan migrate:fresh --seed
   ```
   *Note: This will populate the database with realistic demo data for the PFE defense, including influencers (nano/micro tiers), brands, campaigns, and payments.*

6. **Serve the Application:**
   ```bash
   php artisan serve
   ```
   The backend will typically be available at `http://127.0.0.1:8000`.

## 2. Frontend Setup (React + Vite)

The frontend is a modern React application utilizing Tailwind CSS and shadcn/ui.

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   Ensure `.env` contains the correct API URL:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The frontend will typically be available at `http://localhost:5173`.

## 3. Demo Guidelines

For testing or presenting the application:
- Use the credentials found in the generated `DatabaseSeeder.php` or simply register new accounts on the login page.
- **Tokens** are stored in-memory in the React Context (`AuthContext`). Refreshing the browser requires logging in again to maintain high security against XSS.

Enjoy exploring InfluenceIA!
