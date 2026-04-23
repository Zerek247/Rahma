# 🌹 Rahma — Love Page

A beautiful love dedication page for Rahma, built with Next.js and ready to deploy on Vercel.

## 📁 Project Structure

```
rahma-love/
├── app/
│   ├── layout.tsx      → Root layout with Google Fonts
│   ├── page.tsx        → Main page (splash + love page)
│   └── globals.css     → All styles & animations
├── public/
│   └── video.mp4       → ⭐ ADD YOUR GEMINI VIDEO HERE
├── package.json
├── next.config.js
└── tsconfig.json
```

## 🎬 Adding Your Video

1. Generate your ~12 second video with Gemini
2. Name the file `video.mp4`
3. Place it in the `/public` folder
4. That's it! The video will autoplay, loop silently, and have no controls.

## 🚀 Deploy to Vercel (Super Easy)

### Option A — Via Vercel Dashboard (Recommended)
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and log in
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Vercel auto-detects Next.js — just click **Deploy**
6. Done! You'll get a live URL in ~60 seconds 🎉

### Option B — Via Vercel CLI
```bash
npm install -g vercel
cd rahma-love
npm install
vercel
```

## 💻 Run Locally (to preview before deploying)

```bash
cd rahma-love
npm install
npm run dev
```

Then open http://localhost:3000

## ✨ Features

- **Splash screen** with animated roses and a "Click Here" button
- **Arabic name "رحمة"** in Naskh calligraphy with golden shimmer
- **Love lyrics** translated to English, appearing line by line
- **Video player** — autoplay, loop, no controls, like a GIF
- **Floating hearts** rising from the bottom (canvas particles)
- **Floating rose petals** drifting upward
- **Decorative roses and flowers** on sides and corners
- **Color palette**: Black (#0a0806), Brown (#6b4226), Beige (#e2c9a8)
- **Fonts**: Cormorant Garamond + Great Vibes + Noto Naskh Arabic
- **Mobile-first**, no scroll, fits any screen
