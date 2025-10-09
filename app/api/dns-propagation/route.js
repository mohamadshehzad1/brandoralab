// app/api/dns/route.js
export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // Node for server-side DNS lookups
import { NextResponse } from "next/server";

let dns;
try {
  // Only import dns/promises if running on Node (not Edge)
  dns = await import("dns/promises");
} catch {
  dns = null;
}

/**
 * Helper function — fallback DNS-over-HTTPS queries
 */
async function resolveWithDoH(domain, type = "A") {
  const dohProviders = [
    `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`,
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
    `https://dns.quad9.net/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
  ];

  for (const url of dohProviders) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/dns-json" },
      });
      if (!response.ok) continue;
      const data = await response.json();

      if (data.Answer && data.Answer.length > 0) {
        return {
          success: true,
          records: data.Answer,
          resolved: true,
          source: url.includes("google")
            ? "Google DoH"
            : url.includes("cloudflare")
            ? "Cloudflare DoH"
            : "Quad9 DoH",
        };
      }
    } catch {
      continue;
    }
  }

  return { success: false, resolved: false, error: "All DoH providers failed" };
}

/**
 * API Route
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");
  const type = searchParams.get("type") || "A";
  const server = searchParams.get("server") || "8.8.8.8";

  if (!domain) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  const startTime = Date.now();

  // Step 1: Try native Node DNS first
  if (dns) {
    try {
      dns.setServers([server]);
      const records = await dns.resolve(domain, type);
      const responseTime = Date.now() - startTime;

      return NextResponse.json({
        success: true,
        domain,
        type,
        server,
        resolved: true,
        records: Array.isArray(records) ? records : [records],
        responseTime,
        method: "Node DNS",
      });
    } catch (error) {
      // fallback if not found or error
      if (["ENOTFOUND", "NXDOMAIN"].includes(error.code)) {
        return NextResponse.json({
          success: true,
          domain,
          type,
          server,
          records: [],
          resolved: false,
          responseTime: Date.now() - startTime,
          message: "Domain not found via Node DNS",
        });
      }
    }
  }

  // Step 2: Use DNS-over-HTTPS fallback
  const dohResult = await resolveWithDoH(domain, type);
  dohResult.responseTime = Date.now() - startTime;

  return NextResponse.json({
    domain,
    type,
    server,
    ...dohResult,
  });
}
