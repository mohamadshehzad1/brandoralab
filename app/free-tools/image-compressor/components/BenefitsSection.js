"use client";
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Clock, Globe, Server, Image, Users } from "lucide-react";

function BenefitsSection() {
  const benefits = [
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Boost SEO Rankings",
      description:
        "Google prioritizes fast-loading websites. Compressed images improve page speed scores, directly impacting your search engine rankings and visibility."
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Faster Loading Times",
      description:
        "Reduce bounce rates by delivering content instantly. Every second of load time reduction can increase conversions by up to 7%."
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Better User Experience",
      description:
        "Mobile users on slow connections will appreciate fast-loading images. Improve engagement and reduce abandonment rates."
    },
    {
      icon: <Server className="w-8 h-8 text-orange-600" />,
      title: "Reduce Bandwidth Costs",
      description:
        "Smaller images mean less server load and bandwidth usage, saving money on hosting and CDN services."
    },
    {
      icon: <Image className="w-8 h-8 text-red-600" />,
      title: "Maintain Visual Quality",
      description:
        "Our advanced algorithms preserve image quality while significantly reducing file size. No visible loss in clarity or detail."
    },
    {
      icon: <Users className="w-8 h-8 text-teal-600" />,
      title: "Mobile Optimization",
      description:
        "With mobile-first indexing, optimized images are essential for ranking well in mobile search results and providing smooth experiences."
    }
  ];

  return (
    <section className="max-w-6xl mx-auto mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Why Image Compression is Essential for Your Website
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Optimized images are crucial for SEO, user experience, and website performance. 
          Here's how our image compressor helps you achieve better results:
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {benefit.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BenefitsSection;
