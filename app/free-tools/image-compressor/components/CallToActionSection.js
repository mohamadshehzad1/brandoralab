"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

function CallToActionSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white rounded-3xl mx-auto max-w-6xl my-16 shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <div className="flex justify-center mb-4">
          <Rocket className="w-10 h-10 text-yellow-400" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Ready to Compress Smarter?</h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Instantly reduce your image size without losing quality — all inside your browser.
          No uploads. No tracking. No limits.
        </p>

        <Link
          href="/free-tools/image-compressor"
          className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
        >
          <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
          Start Compressing Now
        </Link>
      </motion.div>

      {/* Subtle background shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

export default CallToActionSection;
