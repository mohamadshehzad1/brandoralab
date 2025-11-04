// app/api/proxy/[...path]/route.js
import { NextResponse } from "next/server";

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

    // ✅ Build URL with original encoding (don't decode)
    const encodedPath = rest.join("/");
    const upstreamUrl = `https://${host}/${encodedPath}`;
    
    console.log("🔗 Fetching upstream:", upstreamUrl);

    const upstreamRes = await fetch(upstreamUrl, {
      method: "GET",
      headers: { 
        "Accept": "image/*,application/octet-stream,*/*",
        "User-Agent": "Mozilla/5.0 (compatible; BrandoraBot/1.0)"
      },
    });

    if (!upstreamRes.ok) {
      console.error(
        `❌ Upstream failed: ${upstreamRes.status} ${upstreamRes.statusText}`,
        `URL: ${upstreamUrl}`
      );
      
      // Try to get error details from upstream
      let errorDetails = "";
      try {
        const errorText = await upstreamRes.text();
        errorDetails = errorText.substring(0, 200); // Limit length
      } catch (e) {
        errorDetails = "Could not read error response";
      }
      
      return NextResponse.json(
        { 
          error: "Upstream image not found", 
          status: upstreamRes.status,
          details: errorDetails,
          url: upstreamUrl 
        },
        { status: upstreamRes.status }
      );
    }

    // Get the content type and buffer
    const contentType = upstreamRes.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await upstreamRes.arrayBuffer();

    // Return the image
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable", // Cache for longer
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