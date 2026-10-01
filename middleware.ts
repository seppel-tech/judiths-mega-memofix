import { ipAddress, next } from "@vercel/functions";
import { gate, type GateConfig, type RateLimitEntry } from "./middleware.core";
// Vercel supplies this server-only binding; these SPA projects have no Node globals.
declare const process: { env: { FIX_GATE_PASSWORD?: string } };
const CONFIG: GateConfig = {
  appId: "memofix",
  appName: "MEMOFIX",
  publicExact: ["/gate.css"],
  serviceWorkerPaths: ["/sw.js"],
};
const failures = new Map<string, RateLimitEntry>();
export default async function middleware(request: Request): Promise<Response> {
  return (await gate(request, CONFIG, {
    appPassword: process.env.FIX_GATE_PASSWORD,
    now: Date.now(),
    clientIp: ipAddress(request) ?? "unknown",
    failures,
  })) ?? next();
}
