// api/config.ts
export const DEV = import.meta.env.DEV; // boolean
export const PROD = import.meta.env.PROD; // boolean

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
