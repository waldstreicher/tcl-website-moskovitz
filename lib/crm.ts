// Base URL of the TuLi CRM, derived from the intake URL the consultation form
// already uses, so no extra env var is needed. Empty when the CRM isn't
// configured (local dev without NEXT_PUBLIC_CRM_INTAKE_URL).
export const CRM_BASE_URL = (process.env.NEXT_PUBLIC_CRM_INTAKE_URL || '').replace(/\/api\/intake\/?$/, '');
