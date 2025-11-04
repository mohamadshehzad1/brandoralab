// app/api/image-compressor/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type. Only JPEG, PNG, and WebP are supported." }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size too large (max 10MB)." }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    
    // TinyPNG API endpoint
    const response = await fetch('https://api.tinify.com/shrink', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${process.env.TINYPNG_API_KEY || 'Ccjkr5zJDdDwsW968KNnByFYQwJShgrf'}`).toString('base64')}`,
        'Content-Type': 'application/octet-stream',
      },
      body: buffer,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('TinyPNG API error:', error);
      
      if (response.status === 401) {
        return NextResponse.json({ error: "Invalid API key" }, { status: 500 });
      } else if (response.status === 429) {
        return NextResponse.json({ error: "API limit exceeded" }, { status: 500 });
      } else {
        return NextResponse.json({ 
          error: error.message || "Compression failed" 
        }, { status: 500 });
      }
    }

    const result = await response.json();
    
    // Download the compressed image
    const downloadResponse = await fetch(result.output.url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${process.env.TINYPNG_API_KEY || 'Ccjkr5zJDdDwsW968KNnByFYQwJShgrf'}`).toString('base64')}`,
      },
    });

    if (!downloadResponse.ok) {
      throw new Error('Failed to download compressed image');
    }

    // Convert compressed image to base64 for easy display
    const compressedBuffer = await downloadResponse.arrayBuffer();
    const base64Image = Buffer.from(compressedBuffer).toString('base64');
    const dataUrl = `data:${downloadResponse.headers.get('content-type')};base64,${base64Image}`;

    return NextResponse.json({
      originalSize: result.input.size,
      compressedSize: result.output.size,
      percent: Math.round((1 - result.output.size / result.input.size) * 100),
      optimizedImage: dataUrl, // Using base64 data URL instead of proxy
      fileName: file.name,
      fileType: downloadResponse.headers.get('content-type') || file.type,
      downloadUrl: result.output.url, // Keep the download URL for reference
    });

  } catch (err) {
    console.error("Image compression failed:", err);
    return NextResponse.json({ 
      error: "Compression service temporarily unavailable. Please try again." 
    }, { status: 500 });
  }
}