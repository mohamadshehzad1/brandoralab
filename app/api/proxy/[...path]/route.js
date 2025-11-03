// app/api/proxy/[...path]/route.js
import { NextResponse } from "next/server";

/**
 * Proxy route to fetch images from a small, whitelisted set of hosts and return them
 * via your domain (avoids mixed-content / bad cert problems).
 
 * .
 */

const ALLOWED_HOSTS = new Set([
  "hel1.static.resmush.it",
  "hel2.static.resmush.it",
  "res.cloudinary.com",
  // Add other hosts you trust (but don't add arbitrary hosts -> SSRF risk)
]);

export async function GET(req, { params }) {
  try {
    const pathParts = params.path || [];
    if (!pathParts || pathParts.length < 2) {
      return NextResponse.json({ error: "Invalid proxy path" }, { status: 400 });
    }

    const [host, ...rest] = pathParts;
    if (!ALLOWED_HOSTS.has(host)) {
      return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
    }

    // Rebuild resource path and ensure proper URL-encoding of segments
    const resourcePath = rest.map(encodeURIComponent).join("/");

    // Build the HTTPS URL (always use https)
    const upstreamUrl = `https://${host}/${resourcePath}`;

    // Forward a minimal accept header
    const upstreamRes = await fetch(upstreamUrl, {
      method: "GET",
      headers: {
        Accept: "image/*, application/octet-stream, */*",
      },
    });

    if (!upstreamRes.ok) {
      // Log and return the upstream status
      console.error("Upstream fetch failed:", upstreamRes.status, upstreamUrl);
      return NextResponse.json({ error: "Upstream image not found" }, { status: upstreamRes.status });
    }

    // Read payload as ArrayBuffer
    const arrayBuffer = await upstreamRes.arrayBuffer();
    const contentType = upstreamRes.headers.get("content-type") || "application/octet-stream";

    // Set caching headers so Vercel and CDNs can cache images
    // s-maxage controls CDN caching; adjust as needed.
    const headers = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
    };

    return new NextResponse(arrayBuffer, { headers });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Proxy fetch failed" }, { status: 500 });
  }
}
