// app/api/image-compressor/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ✅ Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: "Unsupported file type. Please upload JPEG, PNG, WebP, or GIF images." 
      }, { status: 400 });
    }

    // ✅ Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: "File size too large. Please upload images smaller than 10MB." 
      }, { status: 400 });
    }

    // ✅ Convert uploaded file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // ✅ Create proper FormData for reSmush.it
    const uploadForm = new FormData();
    uploadForm.append("files", new File([buffer], file.name, { type: file.type }));

    // ✅ Send to reSmush.it (secure HTTPS)
    const response = await fetch("https://api.resmush.it/?qlty=80", {
      method: "POST",
      body: uploadForm,
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const result = await response.json();

    if (result.error) {
      return NextResponse.json({ 
        error: result.error_long || result.error || "Compression failed" 
      }, { status: 400 });
    }

    // ✅ Force HTTPS for image URLs to avoid Mixed Content
    let optimizedImage = result.dest;
    if (optimizedImage && optimizedImage.startsWith("http://")) {
      optimizedImage = optimizedImage.replace("http://", "https://");
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
    return NextResponse.json(
      { error: "Compression service temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
