// app/api/dns/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import dns from 'dns/promises';

const dnsServers = [
  { name: "Google DNS", ip: "8.8.8.8", flag: "🇺🇸", location: "Global" },
  { name: "Cloudflare", ip: "1.1.1.1", flag: "🇺🇸", location: "Global" },
  { name: "Quad9", ip: "9.9.9.9", flag: "🇨🇭", location: "Europe" },
  { name: "OpenDNS", ip: "208.67.222.222", flag: "🇺🇸", location: "Global" },
  { name: "Comodo", ip: "8.26.56.26", flag: "🇺🇸", location: "Global" },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");
  const type = searchParams.get("type") || "A";
  const serverIp = searchParams.get("server") || "8.8.8.8";

  if (!domain) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  // Validate domain format
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
  if (!domainRegex.test(domain)) {
    return NextResponse.json({ error: "Invalid domain format" }, { status: 400 });
  }

  try {
    // Set custom DNS server
    dns.setServers([serverIp]);

    const startTime = Date.now();
    const records = await dns.resolve(domain, type);
    const responseTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      domain,
      type,
      server: serverIp,
      records: Array.isArray(records) ? records : [records],
      responseTime,
      resolved: true
    });

  } catch (error) {
    // Check if it's a "not found" error or real error
    if (error.code === 'ENOTFOUND' || error.code === 'NXDOMAIN') {
      return NextResponse.json({
        success: true,
        domain,
        type,
        server: serverIp,
        records: [],
        responseTime: Date.now() - startTime,
        resolved: false,
        message: "Domain not found"
      });
    }

    return NextResponse.json({
      success: false,
      error: error.message,
      resolved: false
    }, { status: 500 });
  }
}