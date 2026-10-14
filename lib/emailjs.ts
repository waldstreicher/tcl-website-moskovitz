export const EMAILJS_CONFIG = {
  serviceId:  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  publicKey:  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? '',
  // Recipient of form notifications. Configured in the environment (Vercel)
  // rather than committed here. Ideally set the recipient in the EmailJS
  // template itself so no address ships to the browser at all.
  toEmail: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL ?? '',
};
