"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Is my data or image uploaded to a server?",
    a: "No. All image compression is handled entirely in your browser using WebAssembly. Your images never leave your device — ensuring 100% privacy.",
  },
  {
    q: "What formats does this tool support?",
    a: "You can compress JPG, JPEG, PNG, and WEBP files. The tool automatically detects format and uses the best algorithm for each type.",
  },
  {
    q: "Does compression affect image quality?",
    a: "Our compressor uses intelligent algorithms that preserve visual quality while drastically reducing file size. You can choose between lossless or high-ratio lossy modes.",
  },
  {
    q: "Is it free to use?",
    a: "Yes! The Image Compressor is completely free to use with no sign-ups or usage limits.",
  },
  {
    q: "Can I compress multiple images at once?",
    a: "Absolutely. The batch compression mode allows you to drag and drop multiple files and compress them simultaneously.",
  },
  {
    q: "Will this work on mobile devices?",
    a: "Yes. It’s optimized for both desktop and mobile browsers using modern JavaScript and responsive layout techniques.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto mb-24">
      <div className="text-center mb-12">
        <HelpCircle className="w-10 h-10 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Got questions? We’ve got answers. Everything you need to know about our image compression tool.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-2xl p-4 shadow-sm bg-white"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <h3 className="text-lg font-semibold text-gray-800">{faq.q}</h3>
              <ChevronDown
                className={`w-6 h-6 text-gray-500 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-600 text-sm leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
