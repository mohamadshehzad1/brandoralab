// app/api/proxy/[...path]/route.js
import { NextResponse } from "next/server";

/**
 * Secure proxy to load external images (avoids mixed-content & SSL issues)
 * Handles over-encoded paths like %2520 gracefully.
 */

const ALLOWED_HOSTS = new Set([
  "hel1.static.resmush.it",
  "hel2.static.resmush.it",
  "res.cloudinary.com",
  "api.resmush.it",
]);

export async function GET(req, { params }) {
  try {
    const pathParts = params.path || [];
    if (pathParts.length < 2) {
      return NextResponse.json({ error: "Invalid proxy path" }, { status: 400 });
    }

    const [host, ...rest] = pathParts;

    if (!ALLOWED_HOSTS.has(host)) {
      return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
    }

    // ✅ Decode fully once — fix %2520 -> %20 — and do NOT re-encode.
    const decodedPath = rest
      .map((p) => {
        try {
          return decodeURIComponent(p);
        } catch {
          return p;
        }
      })
      .join("/");

    // ✅ Build final URL using decoded path
    const upstreamUrl = `https://${host}/${decodedPath}`;
    console.log("🔗 Fetching upstream:", upstreamUrl);

    const upstreamRes = await fetch(upstreamUrl, {
      method: "GET",
      headers: { Accept: "image/*,application/octet-stream,*/*" },
    });

    if (!upstreamRes.ok) {
      console.error(
        `❌ Upstream failed: ${upstreamRes.status} ${upstreamRes.statusText} (${upstreamUrl})`
      );
      return NextResponse.json(
        { error: "Upstream image not found", status: upstreamRes.status },
        { status: upstreamRes.status }
      );
    }

    const arrayBuffer = await upstreamRes.arrayBuffer();
    const contentType = upstreamRes.headers.get("content-type") || "image/jpeg";

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("💥 Proxy error:", err);
    return NextResponse.json(
      { error: "Proxy fetch failed", details: err.message },
      { status: 500 }
    );
  }
}
