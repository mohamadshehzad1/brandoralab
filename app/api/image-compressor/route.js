// app/api/image-compressor/route.js
import { NextResponse } from "next/server";

const ALLOWED_UPSTREAM_HOSTS = new Set([
  "hel1.static.resmush.it",
  "hel2.static.resmush.it",
  "res.cloudinary.com",
]);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size too large (<10MB)." }, { status: 400 });
    }

    // Convert to Buffer, then construct a proper File for FormData (server env)
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadForm = new FormData();
    uploadForm.append("files", new File([buffer], file.name, { type: file.type }));

    // Send to reSmush.it via HTTPS
    const response = await fetch("https://api.resmush.it/?qlty=80", {
      method: "POST",
      body: uploadForm,
    });

    if (!response.ok) {
      throw new Error(`Compression API responded with status: ${response.status}`);
    }

    const result = await response.json();
    if (result.error) {
      return NextResponse.json({ error: result.error_long || result.error || "Compression failed" }, { status: 400 });
    }

    // Determine optimized image URL and convert to a proxied URL if upstream host is allowed
    let optimizedImage = result.dest; // upstream URL, possibly http or https

    // Normalize to https if upstream returns http
    if (optimizedImage && optimizedImage.startsWith("http://")) {
      optimizedImage = optimizedImage.replace(/^http:\/\//i, "https://");
    }

    // If upstream host is one we expect, transform into a proxied path on our domain:
    const match = optimizedImage && optimizedImage.match(/^https?:\/\/([^/]+)\/(.*)$/i);
    if (match) {
      const upstreamHost = match[1];
      const upstreamPath = match[2];

      if (ALLOWED_UPSTREAM_HOSTS.has(upstreamHost)) {
        // Build proxied URL using your public site origin (NEXT_PUBLIC_SITE_URL)
        const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://brandoralab.com";
        // Ensure we do NOT double-encode. We'll encode path segments.
        const encodedPath = upstreamPath.split("/").map(encodeURIComponent).join("/");
        optimizedImage = `${origin.replace(/\/$/,'')}/api/proxy/${upstreamHost}/${encodedPath}`;
      } else {
        // If not allowed, keep original but convert to https (best-effort)
        optimizedImage = optimizedImage;
      }
    }

    return NextResponse.json({
      originalSize: result.src_size,
      compressedSize: result.dest_size,
      percent: result.percent,
      optimizedImage,
      fileName: file.name,
      fileType: file.type,
    });
  } catch (err) {
    console.error("Image compression failed:", err);
    return NextResponse.json({ error: "Compression service temporarily unavailable." }, { status: 500 });
  }
}
