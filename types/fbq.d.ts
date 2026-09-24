// Meta Pixel attaches fbq to the global window. See components/MetaPixel.tsx.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export {};
