"use client";
import React from "react";
import { motion } from "framer-motion";
import { Upload, Zap, Download, FileImage } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-blue-600" />,
      title: "1. Upload Your Image",
      description:
        "Drag & drop or browse to upload any PNG, JPG, or WebP file. No account or signup required."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "2. AI Compression",
      description:
        "Our intelligent algorithm analyzes your image, removes unnecessary data, and preserves key visual details."
    },
    {
      icon: <Download className="w-8 h-8 text-green-600" />,
      title: "3. Download Instantly",
      description:
        "In seconds, your optimized image is ready for download — smaller in size but stunning in quality."
    },
    {
      icon: <FileImage className="w-8 h-8 text-purple-600" />,
      title: "4. Use Anywhere",
      description:
        "Upload directly to your website, store, or blog for faster load times and better SEO."
    }
  ];

  return (
    <section className="max-w-5xl mx-auto text-center mb-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        How Our Image Compression Technology Works
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Our system uses advanced image analysis, adaptive scaling, and color mapping 
        to reduce file size while maintaining pixel-perfect quality.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md"
          >
            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
