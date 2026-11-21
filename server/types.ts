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
  first_seen: number;
  referrer_host?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};
export { publicEventTypes } from "../src/lib/visitEvents";
export type { VisitEventType as EventType } from "../src/lib/visitEvents";
