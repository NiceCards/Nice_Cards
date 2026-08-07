# GiftCart — Hostinger Web Apps Deployment Guide

This package is a **single self-contained Node.js application**: one Express server that serves
both the REST API and the built React frontend, so Hostinger's Web App platform needs only
**one app / one port**.

## What's inside

```
giftcart-prod/
├── package.json          # npm workspaces (server + client) + build/start/seed scripts
├── package-lock.json
├── server/               # Express API (config, controllers, models, routes, middleware, seed)
│   └── .env.example      # production env template
└── client/               # React (Vite) source + prebuilt dist/
    └── dist/             # built frontend (served by Express in production)
```

## Prerequisites (IMPORTANT)

1. **MongoDB** — Hostinger Web Apps does **not** include MongoDB. You need an external instance.
   The app **requires a MongoDB replica set** because orders deduct stock inside a transaction.
   - **Recommended:** MongoDB Atlas free tier (M0). It is a replica set and supports transactions.
   - Standalone `mongod` / a single-node "MongoDB Add-on" **will not work** for checkout.
   - Create a database (e.g. `giftcart`) and grab the connection string.

2. **Node.js** — select **Node 20 LTS** (or 18+) in the Hostinger Web App settings.

## Steps on Hostinger

### 1. Create the Web App
- In hPanel → **Web Apps** → **Add** (Node.js).
- Pick **Node 20 LTS**.

### 2. Upload this package
- Use the **Deployment / Upload ZIP** flow, or connect a Git repo containing these files.
- The ZIP must be extracted so that `package.json` sits at the **app root**.

### 3. Environment variables
Add these under **Web App → Settings → Environment Variables**:

| Variable        | Example / notes                                                            |
|-----------------|----------------------------------------------------------------------------|
| `NODE_ENV`      | `production`                                                               |
| `MONGO_URI`     | `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/giftcart`               |
| `JWT_SECRET`    | long random string (see below)                                             |
| `JWT_EXPIRES_IN`| `7d`                                                                       |
| `ADMIN_PASSWORD`| a strong password for the admin login                                      |
| `CLIENT_URL`    | `https://yourdomain.com` (your deployed URL)                               |
| `UPLOADS_DIR`   | `uploads` (default)                                                        |

Generate a JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

### 4. Build & start commands
In the Web App settings set:

- **Install command:** `npm install`
- **Build command:** `npm run build`
- **Start command:** `npm start`

`npm start` runs `NODE_ENV=production node server/index.js`, which:
- connects to MongoDB,
- serves the API on `/api`,
- serves admin-uploaded images on `/uploads`,
- serves the built frontend at `/` with an SPA fallback (client-side routing works).

> PORT is injected by Hostinger automatically; the app honours `process.env.PORT`.

### 5. Seed the database (first run only)
Run the seed once so the store has categories, products, a demo user and sample orders:

```bash
npm run seed
```

You can do this from Hostinger's **Terminal** feature after deployment. The seed is idempotent.

> Note: this DELETES all existing data in the `giftcart` DB and re-creates it. Run it only
> once on an empty (or disposable) database.

### 6. Access
- Storefront: `https://yourdomain.com`
- Admin: `https://yourdomain.com/admin` — password = `ADMIN_PASSWORD` env value.

## Persistent storage for uploads (recommended)

Hostinger Web Apps restarts on ephemeral storage. Any file written to the filesystem
(e.g. admin-uploaded product images) can be lost on redeploy. Options:

1. **Hostinger persistent storage / volume** — mount a persistent volume and point
   `UPLOADS_DIR` at the mount path.
2. **Object storage (S3-compatible)** — for a fully durable setup, modify
   `server/middleware/upload.js` and the image-serving logic to use an S3 bucket.

The bundled seed images are regenerated each time you re-run the seed, so the demo store
works without any storage configuration.

## Things you MUST change from the repo defaults

| Item                  | Current default            | Required action                                                    |
|-----------------------|----------------------------|--------------------------------------------------------------------|
| `JWT_SECRET`          | `giftcart_dev_secret`      | Set a strong random secret (env).                                  |
| `ADMIN_PASSWORD`      | `Admin123`                 | Set a strong admin password (env).                                 |
| `MONGO_URI`           | localhost                  | Point at Atlas / external MongoDB with a replica set.              |
| `CLIENT_URL`          | `http://localhost:5173`    | Set to your deployed domain.                                       |
| Payment gateway       | none (checkout w/o payment)| Add Stripe/PayPal/etc. if you want real payments (not included).   |

## Common issues

- **Checkout fails** → your MongoDB is not a replica set. Use Atlas M0 or add `--replSet rs0`.
- **Blank page / 404 on refresh** → ensure `npm run build` ran and `client/dist` exists.
- **Images broken after redeploy** → configure persistent storage (see above).
- **Port errors** → do NOT hardcode `PORT`; let Hostinger inject it.

## Local sanity check

```bash
npm install
npm run build
npm start   # API + frontend on http://localhost:5000 (or $PORT)
```
