/// <reference types="@cloudflare/workers-types" />
export interface Env {
  DB: D1Database;
  FILES: R2Bucket;
  TOKEN_SECRET: string;
  ADMIN_AUTH_MODE?: "password" | "access";
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD_HASH?: string;
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
  ADMIN_EMAILS?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  INTERNAL_IPS?: string;
  LOCAL_DEVELOPMENT?: string;
  ANALYTICS_MODE?: "aggregate" | "detailed";
}
export type Context = {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
};
export type Actor = { username: string; csrf: string; tokenHash?: string };
export type Visit = {
  id: string;
  visitor_id: string;
  source: string;
  channel: string;
  country: string;
  device: string;
  language: string;
  is_returning: number;
  internal: number;
};
export type EventType =
  | "page_view"
  | "product_view"
  | "parameters_expand"
  | "image_view"
  | "download_click"
  | "quote_click"
  | "whatsapp_click"
  | "email_click"
  | "form_start"
  | "form_error"
  | "inquiry_success";
export const publicEventTypes: readonly string[] = [
  "page_view",
  "product_view",
  "parameters_expand",
  "image_view",
  "download_click",
  "quote_click",
  "whatsapp_click",
  "email_click",
  "form_start",
  "form_error",
];
