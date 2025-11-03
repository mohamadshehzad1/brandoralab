"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  FileCode,
  Layers,
  Zap,
  Database,
  Shield,
  Server,
  Gauge,
} from "lucide-react";

function TechnicalSpecificationsSection() {
  const specs = [
    {
      icon: <Cpu className="w-8 h-8 text-blue-600" />,
      title: "Smart Compression Engine",
      description:
        "Utilizes advanced WebAssembly (WASM) modules powered by modern algorithms like MozJPEG, WebP, and AVIF for optimal performance and quality retention.",
    },
    {
      icon: <FileCode className="w-8 h-8 text-green-600" />,
      title: "Format Support",
      description:
        "Supports all major formats including PNG, JPG, JPEG, WEBP, and AVIF — with automatic detection and conversion for maximum compatibility.",
    },
    {
      icon: <Gauge className="w-8 h-8 text-indigo-600" />,
      title: "Performance Optimized",
      description:
        "Client-side processing ensures lightning-fast compression with zero server dependency — your data never leaves your browser.",
    },
    {
      icon: <Database className="w-8 h-8 text-orange-600" />,
      title: "Lossless & Lossy Modes",
      description:
        "Select between visually lossless or high-ratio lossy compression depending on your project’s requirements and bandwidth goals.",
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Privacy by Design",
      description:
        "No image uploads to any external server. 100% local compression ensures your content remains private and secure.",
    },
    {
      icon: <Server className="w-8 h-8 text-pink-600" />,
      title: "Progressive Encoding",
      description:
        "Creates progressively rendered images that load in stages — improving perceived speed and UX across all devices.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Instant Preview Engine",
      description:
        "Real-time side-by-side preview lets you compare original and compressed outputs with detailed compression stats.",
    },
    {
      icon: <Layers className="w-8 h-8 text-red-500" />,
      title: "Batch Processing Ready",
      description:
        "Upload and compress multiple images simultaneously, maintaining consistent output quality and size ratios.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Professional Technical Specifications
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Built for performance, security, and precision — the Image Compressor
          leverages cutting-edge technologies for developers, designers, and
          enterprises alike.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {specs.map((spec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
              {spec.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {spec.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {spec.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TechnicalSpecificationsSection;
