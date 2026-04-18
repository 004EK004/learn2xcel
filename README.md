# Learn2Excel — AI + Excel Bootcamp Website

Modern, production-ready marketing site for Learn2Excel. Built with Next.js (App Router), Tailwind CSS, Framer Motion, and Appwrite-ready auth/database helpers. Includes a clean white/green theme, responsive layouts, legal/compliance pages, and protected dashboard routing.

## Features
- Three tracks: AI with Excel, Original Excel, Data Analysis (with detailed modules)
- Sticky navbar, animated hero, testimonials carousel, CTA sections
- Footer with newsletter capture, legal links, and scroll-to-top
- Auth page with email/password + OAuth (Google/GitHub) via Appwrite
- Protected `/dashboard` route with progress display and placeholders when Appwrite is not configured
- Bootcamp schedule with enrollment action that writes to Appwrite (or falls back gracefully)
- Contact/waitlist form writing to Appwrite enrollments collection
- Affiliate support section with disclosure and sponsored link attributes
- SEO metadata routes for `sitemap.xml` and `robots.txt`
- Appwrite schemas and `.env.local.example` included

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Appwrite SDK v13+
- next-themes for dark/light toggle
- react-hot-toast for feedback

## Routes
- `/` Home (hero, tracks, cohorts, testimonials, CTA)
- `/tracks` Track overview
- `/tracks/[slug]` AI with Excel, Original Excel, Data Analysis details
- `/bootcamp` Cohort schedule + enrollment
- `/dashboard` Protected user dashboard (redirects to `/auth` if not logged in)
- `/auth` Login/Signup + OAuth buttons
- `/contact` Waitlist/contact form
- `/privacy-policy` Privacy policy
- `/terms-and-conditions` Terms and conditions
- `/*` Custom 404 + error boundary

## Getting Started
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Lint
```bash
npm run lint
```

### Build
```bash
npm run build
```

## Appwrite Setup
1) Create a project in Appwrite (self-hosted or Cloud)  
2) Add a Web platform with your local/dev domains (e.g., http://localhost:3000)  
3) Create a Database and two collections using the JSON schemas in `appwrite-schemas/`:
   - `users_progress.json` (trackId, userId, completedLessons[], certificateUrl)
   - `enrollments.json` (email, trackId, cohortId, paymentStatus)
4) In Auth providers, enable Email/Password and optionally OAuth (Google/GitHub).  
5) Copy `.env.local.example` to `.env.local`, then fill in your values:
```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=users_progress
NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID=enrollments
APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your-project-id
APPWRITE_API_KEY=your-server-api-key
```
6) Keep `APPWRITE_API_KEY` server-only. Add it to your GitHub repository secrets for deployments (never commit it).
7) Restart `npm run dev` after setting env vars.

### Appwrite Integration Notes
- All Appwrite helpers are in `src/lib/appwrite.ts`. They log a warning and fall back safely if env vars are missing.
- Signup first calls `POST /api/auth/signup` (server-side Appwrite API key). If server signup is not configured, it falls back to client `account.create`.
- Enrollment/contact submits to the `enrollments` collection. Dashboard progress reads from `users_progress`.
- OAuth buttons call `account.createOAuth2Session` with success redirect to `/dashboard`.

## Deployment
- Deploy to Vercel/Netlify; ensure environment variables are configured in the platform settings.
- Set the correct Appwrite Web origins for your production domain.

## Customization
- Update track content in `src/data/tracks.ts` and testimonials/cohorts in `src/data/content.ts`.
- Adjust theming in `src/app/globals.css` and shared layout in `src/app/layout.tsx`.
