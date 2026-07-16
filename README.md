# TuLi (Tumescent Lipolysis) Website

A premium, production-ready Next.js 14 website for the TuLi procedure by Dr. Martin Moskovitz, MD, FACS.
Live at [www.tumescentlipolysis.com](https://www.tumescentlipolysis.com).

## Brand

The TuLi wordmark is direction **1f** from the brand handoff: a two-tone camel-case Montserrat
lockup — `Tu` in ink, `Li` in gold — over the `TUMESCENT LIPOLYSIS` tagline. It lives in one place,
[`components/Wordmark.tsx`](components/Wordmark.tsx); use `variant="dark"` over dark backgrounds.
The circular app-icon treatment is [`app/icon.svg`](app/icon.svg).

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
  toEmail: 'jwaldstreicher@karimedical.com',
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
