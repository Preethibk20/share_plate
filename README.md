# SharePlate — Frontend (Next.js)

This repository has been migrated from a Vite-based React starter to a Next.js 14 App Router application.

What changed:

- Migrated app to Next.js 14 (App Router) with TypeScript and Tailwind CSS.
- Implemented role-based routes and mock auth middleware.
- Replaced Vite entry with `app/` routes and Next API routes under `app/api/`.
- Removed legacy Vite files (index.html, `vite.config.ts`, `src/` Vite entry files, etc.).

Quick commands

```bash
# Install dependencies (once)
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Notes

- Leaflet map components are loaded client-side only.
- Mock auth uses an httpOnly cookie with a simple mock JWT (see `app/api/auth/*` and `lib/auth.ts`).
- If you want to re-generate `package-lock.json`, run `npm install` again after pulling.

If you want, I can also tidy ESLint configuration and add a short CONTRIBUTING guide.
