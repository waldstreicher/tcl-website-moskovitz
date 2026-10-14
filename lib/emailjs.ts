export const EMAILJS_CONFIG = {
  serviceId:  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  publicKey:  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? '',
  // The notification RECIPIENT is deliberately not here. Anything in this
  // file (and any NEXT_PUBLIC_* var) is inlined into the browser bundle and
  // visible to anyone. The recipient is configured in the EmailJS template's
  // "To Email" field instead, so the address never leaves EmailJS's servers.
};
