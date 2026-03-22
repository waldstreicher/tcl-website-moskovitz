# Tumescent Cryolipolysis (TCL) Website

A premium, production-ready Next.js 14 website for the TCL procedure by Dr. Martin Moskovitz, MD, FACS.

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure EmailJS

Sign up at [emailjs.com](https://www.emailjs.com/), create a service and template, then update `/lib/emailjs.ts`:
```ts
export const EMAILJS_CONFIG = {
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key',
  toEmail: 'info@tumescentcryolipolysis.com',
};
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Replacing Placeholder Content

### Images
All placeholder images use `data-slot` attributes for easy replacement:
- `data-slot="hero-background"` — Hero section background
- `data-slot="about-doctor-photo"` — Dr. Moskovitz photo
- `data-slot="before-after-{1-6}"` — Before/after gallery
- `data-slot="video-testimonial-{1-3}"` — Video thumbnail images
- `data-slot="consultation-side-image"` — Consultation form side image

### Videos
In `/components/VideoGallery.tsx`, replace `videoUrl` values with actual YouTube embed URLs.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- EmailJS
- Lucide React
