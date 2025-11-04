// app/api/proxy/[...path]/route.js
import { NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "hel1.static.resmush.it",
  "hel2.static.resmush.it", 
  "fal1.static.resmush.it", // Add this
  "fal2.static.resmush.it", // And any others
  "res.cloudinary.com",
  "api.resmush.it",
]);

// Also allow any subdomain of static.resmush.it as a fallback
const RESMUSH_STATIC_REGEX = /^[a-z0-9]+\.static\.resmush\.it$/;

export async function GET(req, { params }) {
  try {
    const pathParts = params.path || [];
    if (pathParts.length < 2) {
      return NextResponse.json({ error: "Invalid proxy path" }, { status: 400 });
    }

    const [host, ...rest] = pathParts;

    // Check if host is allowed
    const isAllowed = ALLOWED_HOSTS.has(host) || RESMUSH_STATIC_REGEX.test(host);
    
    if (!isAllowed) {
      return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
    }

    // Build URL with original encoding
    const encodedPath = rest.join("/");
    const upstreamUrl = `https://${host}/${encodedPath}`;
    
    console.log("🔗 Fetching upstream:", upstreamUrl);

    // Add more options to handle SSL issues
    const upstreamRes = await fetch(upstreamUrl, {
      method: "GET",
      headers: { 
        "Accept": "image/*,application/octet-stream,*/*",
        "User-Agent": "Mozilla/5.0 (compatible; BrandoraBot/1.0)"
      },
      // These might help with problematic SSL certificates
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!upstreamRes.ok) {
      console.error(
        `❌ Upstream failed: ${upstreamRes.status} ${upstreamRes.statusText}`,
        `URL: ${upstreamUrl}`
      );
      
      return NextResponse.json(
        { 
          error: "Upstream image not found", 
          status: upstreamRes.status,
          url: upstreamUrl 
        },
        { status: upstreamRes.status }
      );
    }

    const contentType = upstreamRes.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await upstreamRes.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
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