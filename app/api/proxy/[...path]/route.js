// app/api/proxy/[...path]/route.js
import { NextResponse } from "next/server";

/**
 * Secure image proxy route to fix mixed-content & SSL issues
 * and avoid exposing reSmush.it or Cloudinary directly.
 */

const ALLOWED_HOSTS = new Set([
  "hel1.static.resmush.it",
  "hel2.static.resmush.it",
  "res.cloudinary.com",
  "api.resmush.it", // optional
]);

export async function GET(req, { params }) {
  try {
    const pathParts = params.path || [];

    if (!pathParts || pathParts.length < 2) {
      return NextResponse.json({ error: "Invalid proxy path" }, { status: 400 });
    }

    const [host, ...rest] = pathParts;

    if (!ALLOWED_HOSTS.has(host)) {
      console.warn("🚫 Proxy blocked unauthorized host:", host);
      return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
    }

    // 🧠 FIX: Normalize segments to avoid double-encoding like %2520
    const resourcePath = rest
      .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
      .join("/");

    // ✅ Always use HTTPS to prevent mixed-content issues
    const upstreamUrl = `https://${host}/${resourcePath}`;

    console.log("🔗 Proxy fetching:", upstreamUrl);

    const upstreamRes = await fetch(upstreamUrl, {
      method: "GET",
      headers: {
        Accept: "image/*,application/octet-stream,*/*",
      },
    });

    if (!upstreamRes.ok) {
      console.error(
        `❌ Upstream failed: ${upstreamRes.status} ${upstreamRes.statusText} -> ${upstreamUrl}`
      );
      return NextResponse.json(
        { error: "Upstream image not found", status: upstreamRes.status },
        { status: upstreamRes.status }
      );
    }

    const arrayBuffer = await upstreamRes.arrayBuffer();
    const contentType =
      upstreamRes.headers.get("content-type") || "application/octet-stream";

    const headers = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
    };

    return new NextResponse(arrayBuffer, { headers });
  } catch (err) {
    console.error("💥 Proxy error:", err);
    return NextResponse.json(
      { error: "Proxy fetch failed", details: err.message },
      { status: 500 }
    );
  }
}
