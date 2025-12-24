# My Portfolio

A full‑stack portfolio project built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and **Cloudinary**.
It showcases personal projects, profile information, and includes an **admin panel** with full CRUD support and optional server‑side revalidation.

---

## ✨ Features

* Dynamic **Projects section** powered by MongoDB
* **Profile section** with bio & metadata stored in database
* **Admin Panel** (Add / Edit / Delete projects)
* Clean **Add / Edit dialog** with image upload & live preview
* **Client–Server separation** using Next.js App Router
* **Server‑side rendering** for fast initial load
* **On‑demand revalidation API** (no redeploy required)
* Fully responsive UI with **Tailwind CSS**
* **Cloudinary** integration for secure image hosting
* Secure configuration via **environment variables**

---

## 🧱 Tech Stack

* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
* **Backend / API:** Next.js Route Handlers
* **Database:** MongoDB
* **Auth / Session:** Lucia (sessions & users collections)
* **Image Hosting:** Cloudinary
* **Deployment:** Vercel or self‑hosted (Node.js)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

---

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

---

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI="<your-mongodb-uri>"
DB_NAME="<your-database-name>"

# Collections
DB_TABLE_PROJECT_COLLECTION_NAME="<your-project-collection-name>"
DB_TABLE_PROFILE_COLLECTION_NAME="<your-profile-collection-name>"
DB_TABLE_LUCIA_SESSIONS="<your-sessions-collection-name>"
DB_TABLE_LUCIA_USERS="<your-users-collection-name>"

# Admin Initial Login (used only for first setup)
INIT_USERNAME_ADMIN="<your-admin-username>"
INIT_PASSWORD_ADMIN="<your-admin-password>"

# Admin Panel
ADMIN_LOGIN_SLUG="<your-admin-login-slug>"

# Revalidation
REVALIDATE_SECRET="<your-revalidate-secret>"
REVALIDATE_ENABLE=false

# Cloudinary
CLOUDINARY_CLOUD_NAME="<your-cloudinary-cloud-name>"
CLOUDINARY_API_KEY="<your-cloudinary-api-key>"
CLOUDINARY_API_SECRET="<your-cloudinary-api-secret>"
CLOUDINARY_FOLDER="<your-cloudinary-folder>"

# Next-Auth
NEXT_AUTH_SECRET=<your-next-auth-secret>
```

> ⚠️ **IMPORTANT**
>
> * Never commit `.env.local` to version control
> * Rotate secrets before deploying to production
> * `INIT_*` variables should be removed or disabled after the first admin account is created
> * `CLOUDINARY_FOLDER` is optional — if not set, images are uploaded to the root folder

---

### 4. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Admin Panel

* Access is protected by a **custom admin slug**
* Supports full CRUD operations:

  * Create project
  * Edit project
  * Delete project
* Uses client‑side dialogs with server API routes
* Image upload handled securely via server
* UI state resets correctly on open / cancel / close
* Data refresh handled via controlled re‑fetch (no full page reload)

---

## 🔄 Revalidation

This project supports **on‑demand revalidation** using a secret key.

Enable or disable via:

```env
REVALIDATE_ENABLE=true
```

* Protected by `REVALIDATE_SECRET`
* Useful when content changes without redeploying

---

## ☁️ Cloudinary

* Images are uploaded and stored in **Cloudinary**
* Uploads are handled **server‑side** via API routes
* The database stores the **full image URL** (`secure_url`)
* Each image also stores a `public_id` for safe deletion
* Cloudinary credentials are **never exposed to the client**
* Old images are safely removed when projects are deleted

---

## 📦 Deployment

### Vercel

1. Push repository to GitHub
2. Import project in Vercel
3. Add all environment variables in **Vercel → Settings → Environment Variables**
4. Deploy

---

### Self‑Hosted / On‑Premise

1. Copy required files:

```
.next/
public/
package.json
package-lock.json / pnpm-lock.yaml
next.config.js
.env.local
```

2. Install dependencies:

```bash
npm install
```

3. Secure env file:

```bash
chmod 600 .env.local
```

4. Start server:

```bash
npm start
```

---

## 🌱 Environment Variables Reference

| Variable                           | Description                   |
| ---------------------------------- | ----------------------------- |
| `MONGODB_URI`                      | MongoDB connection string     |
| `DB_NAME`                          | Database name                 |
| `DB_TABLE_PROJECT_COLLECTION_NAME` | Projects collection           |
| `DB_TABLE_PROFILE_COLLECTION_NAME` | Profile collection            |
| `DB_TABLE_LUCIA_SESSIONS`          | Lucia sessions collection     |
| `DB_TABLE_LUCIA_USERS`             | Lucia users collection        |
| `INIT_USERNAME_ADMIN`              | Initial admin username        |
| `INIT_PASSWORD_ADMIN`              | Initial admin password        |
| `ADMIN_LOGIN_SLUG`                 | Custom admin route slug       |
| `REVALIDATE_SECRET`                | Revalidation API secret       |
| `REVALIDATE_ENABLE`                | Enable / disable revalidation |
| `CLOUDINARY_CLOUD_NAME`            | Cloudinary cloud name         |
| `CLOUDINARY_API_KEY`               | Cloudinary API key            |
| `CLOUDINARY_API_SECRET`            | Cloudinary API secret         |
| `CLOUDINARY_FOLDER`                | Default upload folder         |
| `NEXT_AUTH_SECRET`                 | JWT Secret for Next-Auth      |

---

## 🛠 Error Handling

* Defensive checks in API routes
* Graceful UI fallbacks for empty states
* Clear logging during development

---

## 📄 License

This project is open‑source and licensed under the **MIT License**.

---

> Built with care, iteration, and a lot of debugging ☕
