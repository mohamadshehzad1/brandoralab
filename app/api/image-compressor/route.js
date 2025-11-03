// app/api/image-compressor/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: "Unsupported file type. Please upload JPEG, PNG, WebP, or GIF images." 
      }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: "File size too large. Please upload images smaller than 10MB." 
      }, { status: 400 });
    }

    // Convert the uploaded file into a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create FormData for sending to reSmush.it
    const uploadForm = new FormData();
    uploadForm.append("files", new Blob([buffer]), file.name);

    // Make POST request to reSmush.it API
    const response = await fetch("https://api.resmush.it/?qlty=80", {
      method: "POST",
      body: uploadForm,
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const result = await response.json();

    // Handle reSmush.it errors
    if (result.error) {
      return NextResponse.json({ 
        error: result.error_long || result.error || "Compression failed" 
      }, { status: 400 });
    }

    return NextResponse.json({
      originalSize: result.src_size,
      compressedSize: result.dest_size,
      percent: result.percent,
      optimizedImage: result.dest,
      fileName: file.name,
      fileType: file.type
    });
  } catch (err) {
    console.error("Image compression failed:", err);
    return NextResponse.json(
      { error: "Compression service temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}