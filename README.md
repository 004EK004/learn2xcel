# Learn2XCEL

Premium Excel bootcamp landing page built with **React + Vite + Tailwind CSS** and **Appwrite**.

## ✨ Features
- Modern, conversion-focused bootcamp layout
- Dark mode default with light mode toggle
- Glassmorphism styling, micro-interactions, smooth scroll
- Appwrite client ready for members area, progress tracking, and auth

## ✅ Local Setup
```bash
cp .env.example .env
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## 🧱 Folder Structure
```
learn2xcel/
├─ public/
│  ├─ favicon.svg
│  └─ icons.svg
├─ src/
│  ├─ lib/
│  │  └─ appwrite.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .env.example
├─ index.html
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
├─ package.json
└─ README.md
```

## 🎨 Customization Guide
**Colors**
- Update brand colors in `tailwind.config.js` (`colors` section).
- Adjust gradients or glow shadows in the same file.

**Typography**
- Fonts are imported in `src/index.css`. Replace the Google Fonts import to swap families.
- Tailwind font settings are in `tailwind.config.js` (`fontFamily` section).

**Content**
- Edit section content in `src/App.jsx` (arrays for benefits, curriculum, projects, etc.).
- Update CTA labels directly in the hero and pricing sections in the same file.

**Images & Icons**
- Replace icons or add new SVGs in `public/`.
- Add custom images by placing files in `src/assets/` and referencing them in `App.jsx`.

## 🔌 Appwrite Setup
The Appwrite client is initialized in `src/lib/appwrite.js` using:
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_PROJECT_NAME`
- `VITE_APPWRITE_ENDPOINT`

Update `.env` with your own Appwrite project details when needed.

## 🚀 Deployment Suggestions
**Vercel / Netlify**
1. Set the build command to `npm run build`
2. Set the output directory to `dist`
3. Add the same `.env` variables in the platform dashboard

**GitHub Pages**
1. In `vite.config.js`, set `base: "/learn2xcel/"` (or your repo name)
2. Run `npm run build`
3. Deploy the `dist/` folder to GitHub Pages (via Actions or manual upload)

---
Built for high-conversion, premium Excel bootcamps.
