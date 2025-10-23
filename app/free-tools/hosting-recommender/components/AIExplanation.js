"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AIExplanation({ analysis }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl p-10 text-center flex flex-col items-center justify-center shadow-lg border border-white/30"
    >
      {/* 🌈 Animated Gradient Background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 opacity-95 bg-[length:200%_200%]"
      />

      {/* Glass Blur Layer for Premium Depth */}
      <div className="absolute inset-0 backdrop-blur-md" />

      {/* Foreground Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 justify-center text-blue-700 mb-4">
          <Sparkles className="animate-pulse" size={20} />
          <h3 className="text-lg font-semibold tracking-wide">
            AI Analysis Summary
          </h3>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          {analysis}
        </motion.p>
      </div>
    </motion.div>
  );
}
