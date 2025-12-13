# My Portfolio

A fullstack portfolio project built with **Next.js, TypeScript, Tailwind CSS, MongoDB**, and Cloudinary for image hosting. It showcases personal projects, profile information, and supports server-side revalidation for up-to-date content.

---

## Features

- Dynamic **projects section** powered by MongoDB  
- **Profile section** with bio and metadata  
- **Server-side rendering** for fast load times  
- **Revalidation API** for automatic cache refresh  
- Fully responsive using **Tailwind CSS**  
- Cloudinary integration for image uploads  
- Environment variables for secure configuration

---

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS  
- **Backend / Database:** MongoDB  
- **Image Hosting:** Cloudinary  
- **Deployment:** Vercel or On-Premise Server

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/myportfolio?appName=DB_MONGO"
DB_TABLE_PROJECT_COLLECTION_NAME="projects"
DB_TABLE_PROFILE_COLLECTION_NAME="profiles"

REVALIDATE_SECRET="your-secret-key"
REVALIDATE_ENABLE="true"

CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
```

> ⚠️ **Do not commit `.env.local`**. Keep it secure on your server or deployment platform.

### 4. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## Deployment

### Vercel

1. Push your repository to GitHub  
2. Import the project in Vercel  
3. Add all environment variables in **Vercel Dashboard → Environment Variables**  
4. Deploy; Vercel handles build automatically

### On-Premise Server

1. Copy the following to your server:

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

3. Set permissions for `.env.local`:

```bash
chmod 600 .env.local
```

4. Run the production server:

```bash
npm start
```

- Server will read `.env.local` → MongoDB, API keys, etc.
- Server-side code (MongoDB, API routes, server components) can access env vars.

---

## Environment Variables

| Variable | Description | Example / Notes |
|----------|------------|----------------|
| `MONGODB_URI` | Connection URI for MongoDB database | `mongodb+srv://username:password@cluster.mongodb.net/myportfolio` |
| `DB_TABLE_PROJECT_COLLECTION_NAME` | Name of the collection to store project data | `projects` |
| `DB_TABLE_PROFILE_COLLECTION_NAME` | Name of the collection to store user profile data | `profiles` |
| `REVALIDATE_SECRET` | Secret key for calling Next.js revalidate API | `some-secret-key` |
| `REVALIDATE_ENABLE` | Flag to enable/disable revalidation | `true` / `false` |
| `CLOUDINARY_URL` | Cloudinary URL for uploading/hosting images | `cloudinary://api_key:api_secret@cloud_name` |

---

## Usage

- Update projects in MongoDB and use the **revalidate API** to refresh content without redeploying  
- Profile metadata (`title`, `description`) is pulled dynamically from the database  
- Images are served via Cloudinary

---

## Error Handling

The application includes a **custom error page** to display server-side errors. Any thrown error message (`throw new Error("..."`) will be shown on the page for debugging purposes in development.

---

## License

This project is open-source and free to use under the **MIT License**.

