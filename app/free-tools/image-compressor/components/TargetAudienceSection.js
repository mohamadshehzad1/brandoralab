"use client";
import React from "react";
import { motion } from "framer-motion";
import { Camera, ShoppingBag, Code2, Globe, FileImage, Layers } from "lucide-react";

function TargetAudienceSection() {
  const audiences = [
    {
      icon: <Camera className="w-8 h-8 text-pink-600" />,
      title: "Photographers",
      description:
        "Easily share high-resolution photos online without compromising quality. Compress large portfolios in seconds."
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-blue-600" />,
      title: "E-Commerce Stores",
      description:
        "Faster-loading product images increase conversions and improve your Shopify, WooCommerce, or Etsy SEO performance."
    },
    {
      icon: <Code2 className="w-8 h-8 text-green-600" />,
      title: "Developers & Agencies",
      description:
        "Optimize client websites, blogs, and landing pages with compressed images to boost Core Web Vitals scores."
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      title: "Bloggers & Creators",
      description:
        "Keep your WordPress or Ghost blog running lightning-fast with smaller, high-quality visuals that load instantly."
    },
    {
      icon: <FileImage className="w-8 h-8 text-orange-600" />,
      title: "Designers",
      description:
        "Deliver final mockups and UI assets with web-ready file sizes while preserving crisp detail and color accuracy."
    },
    {
      icon: <Layers className="w-8 h-8 text-purple-600" />,
      title: "Marketing Teams",
      description:
        "Speed up campaign pages and landing experiences — smaller image payloads mean lower ad spend and higher engagement."
    }
  ];

  return (
    <section className="max-w-6xl mx-auto mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Who Benefits From Our Image Compressor?
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Whether you’re a developer, marketer, or creator — optimized images make your projects faster, leaner, and more professional.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {audiences.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TargetAudienceSection;
