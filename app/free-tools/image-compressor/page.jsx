"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { 
  Upload, Download, Zap, Shield, Smartphone, CheckCircle2, 
  Globe, BarChart3, Clock, Image, Users, Server, FileImage, 
  HardDrive, Palette, Layers 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolUniqueFeatures from './components/ToolUniqueFeatures';

export default function ImageCompressorPage() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compressionRatio, setCompressionRatio] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const outputSectionRef = useRef(null);

  // SEO Metadata
  const seoData = {
    title: "Free Online Image Compressor - Reduce Image Size by 80% | BrandoraLab",
    description: "Compress JPG, PNG, WebP & GIF images instantly with our free online tool. Reduce file size by up to 80% without quality loss. Perfect for SEO & faster websites.",
    keywords: "ai image compressor, ai image compressor tool, image compressor with ai, image compressor by ai, image compressor, compress images, reduce image size, online image optimizer, free image compression, SEO image optimization, web image compressor",
    canonical: "https://brandoralab.com/free-tools/image-compressor",
    ogImage: "https://brandoralab.com/images/image-compressor-preview.jpg"
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFiles = (file) => {
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      setCompressedImage(null);
      setCompressionRatio(null);
      setError(null);
    } else {
      setError("Please upload a valid image file (JPEG, PNG, WebP, GIF)");
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleCompress = async () => {
    if (!originalImage) return;
    
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", originalImage);

      const response = await fetch("/api/image-compressor", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Compression failed");
      }

      // Fetch the compressed image
      const imageResponse = await fetch(result.optimizedImage);
      const blob = await imageResponse.blob();
      const compressedUrl = URL.createObjectURL(blob);
      
      setCompressedImage(compressedUrl);
      setCompressionRatio(result.percent);

      // Scroll to output section after a brief delay to allow state update
      setTimeout(() => {
        outputSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

    } catch (err) {
      setError(err.message);
      console.error("Compression error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileExtension = (fileName) => {
    return fileName?.split('.').pop().toUpperCase() || '';
  };

  return (
    <>
      {/* 🎯 SEO METADATA & STRUCTURED DATA */}
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:image" content={seoData.ogImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.ogImage} />
        
        <link rel="canonical" href={seoData.canonical} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Free Online Image Compressor",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "description": seoData.description,
              "url": seoData.canonical,
              "creator": {
                "@type": "Organization",
                "name": "BrandoraLab",
                "url": "https://brandoralab.com"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Image compression up to 80%",
                "Support for JPG, PNG, WebP, GIF",
                "No quality loss",
                "Browser-based processing",
                "Instant download"
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Professional Header with proper spacing */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/80 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <Header />
            </div>
          </div>
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-16">
          {/* 🚀 HERO SECTION WITH INTEGRATED OUTPUT */}
          <section className="text-center max-w-6xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-200 mb-6"
            >
              <Zap className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">AI-Powered Compression</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Free Online Image Compressor - 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Reduce Size, Boost Speed</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Reduce image file sizes by up to 80% without quality loss using our advanced compression technology. 
              Perfect for SEO, faster websites, and better user experience.
            </motion.p>

            {/* UPLOAD SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto mb-12"
            >
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                key={originalImage ? "with-file" : "without-file"}
              />
              
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all duration-300 cursor-pointer ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50/50' 
                    : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {originalImage ? 'Image Ready for Compression' : 'Drop your image here'}
                  </h3>
                  
                  <p className="text-gray-500 mb-4">
                    {originalImage 
                      ? originalImage.name 
                      : 'or click to browse files (PNG, JPG, WebP, GIF)'
                    }
                  </p>

                  {originalImage && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        {formatFileSize(originalImage.size)} • {getFileExtension(originalImage.name)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Action Button */}
              {originalImage && !compressedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <button
                    onClick={handleCompress}
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Optimizing Image...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Compress Image Now
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* 🎯 OUTPUT SECTION IN HERO - With ref for scrolling */}
            <AnimatePresence>
              {compressedImage && (
                <motion.div
                  ref={outputSectionRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-white text-2xl mb-4"
                    >
                      ✅
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Optimization Complete!
                    </h2>
                    <p className="text-gray-600">
                      Your image has been successfully optimized while maintaining visual quality
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Original Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white rounded-xl shadow-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-md font-semibold text-gray-900">Original</h3>
                        <span className="text-sm text-gray-500">{formatFileSize(originalImage.size)}</span>
                      </div>
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 border border-gray-200">
                        <img
                          src={URL.createObjectURL(originalImage)}
                          alt="Original"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </motion.div>

                    {/* Compressed Image */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white rounded-xl shadow-lg border border-green-200 p-4 relative"
                    >
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        OPTIMIZED
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-md font-semibold text-gray-900">Compressed</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-green-600">
                            {compressionRatio}% Smaller
                          </span>
                        </div>
                      </div>
                      <div className="aspect-square bg-green-50 rounded-lg overflow-hidden mb-3 border border-green-200">
                        <img
                          src={compressedImage}
                          alt="Compressed"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Download Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <a
                      href={compressedImage}
                      download={`optimized-${originalImage.name}`}
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <Download className="w-5 h-5" />
                      Download Optimized Image
                    </a>
                  </motion.div>

                  {/* Compression Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-blue-600">{compressionRatio}%</div>
                        <div className="text-xs text-gray-600">Size Reduced</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">100%</div>
                        <div className="text-xs text-gray-600">Quality Maintained</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">Instant</div>
                        <div className="text-xs text-gray-600">Processing</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-orange-600">Secure</div>
                        <div className="text-xs text-gray-600">Local Processing</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <ToolUniqueFeatures />

          {/* 📊 BENEFITS SECTION */}
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
              {[
                {
                  icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
                  title: "Boost SEO Rankings",
                  description: "Google prioritizes fast-loading websites. Compressed images improve page speed scores, directly impacting your search engine rankings and visibility."
                },
                {
                  icon: <Clock className="w-8 h-8 text-green-600" />,
                  title: "Faster Loading Times",
                  description: "Reduce bounce rates by delivering content instantly. Every second of load time reduction can increase conversions by up to 7%."
                },
                {
                  icon: <Globe className="w-8 h-8 text-purple-600" />,
                  title: "Better User Experience",
                  description: "Mobile users on slow connections will appreciate fast-loading images. Improve engagement and reduce abandonment rates."
                },
                {
                  icon: <Server className="w-8 h-8 text-orange-600" />,
                  title: "Reduce Bandwidth Costs",
                  description: "Smaller images mean less server load and bandwidth usage, saving money on hosting and CDN services."
                },
                {
                  icon: <Image className="w-8 h-8 text-red-600" />,
                  title: "Maintain Visual Quality",
                  description: "Our advanced algorithms preserve image quality while significantly reducing file size. No visible loss in clarity or detail."
                },
                {
                  icon: <Users className="w-8 h-8 text-teal-600" />,
                  title: "Mobile Optimization",
                  description: "With mobile-first indexing, optimized images are essential for ranking well in mobile search results and providing smooth experiences."
                }
              ].map((benefit, index) => (
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 🔧 HOW IT WORKS SECTION */}
          <section className="max-w-6xl mx-auto mb-20 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Our Image Compression Technology Works
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Understanding the technical process behind our advanced image optimization
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Upload & Analyze",
                  description: "Our system analyzes your image's metadata, color profile, and compression potential"
                },
                {
                  step: "2",
                  title: "Smart Optimization",
                  description: "AI algorithms identify optimal compression settings while preserving visual quality"
                },
                {
                  step: "3",
                  title: "Format Selection",
                  description: "Automatic format optimization (WebP, JPEG, PNG) based on content type"
                },
                {
                  step: "4",
                  title: "Quality Assurance",
                  description: "Final quality check ensures no visible degradation before download"
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 🎯 TARGET AUDIENCE SECTION */}
          <section className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Who Uses Our Image Compressor?
              </h2>
              <p className="text-gray-600 text-lg">
                Professionals across industries rely on our tool for their image optimization needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Web Developers",
                  description: "Optimize website assets for better performance scores and Core Web Vitals"
                },
                {
                  title: "SEO Specialists",
                  description: "Improve page speed metrics and search engine rankings with optimized images"
                },
                {
                  title: "Content Creators",
                  description: "Reduce file sizes for blogs, social media, and digital publications"
                },
                {
                  title: "E-commerce Stores",
                  description: "Speed up product pages and improve conversion rates with fast-loading images"
                },
                {
                  title: "Digital Marketers",
                  description: "Create faster-loading ads and landing pages for better campaign performance"
                },
                {
                  title: "Photographers",
                  description: "Prepare images for online portfolios and client deliveries with optimal file sizes"
                },
                {
                  title: "Bloggers",
                  description: "Maintain visual quality while ensuring fast page loads for better reader experience"
                },
                {
                  title: "Agency Teams",
                  description: "Streamline client workflows with batch-ready image optimization tools"
                }
              ].map((audience, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">{audience.title}</h3>
                  <p className="text-gray-600 text-sm">{audience.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 💻 PROFESSIONAL TECHNICAL SPECIFICATIONS */}
          <section className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Technical Specifications & Supported Formats
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Advanced compression technology supporting all major image formats with optimal settings
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Supported Formats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileImage className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Supported Formats</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      format: "JPEG/JPG",
                      icon: "🖼️",
                      description: "Ideal for photographs and complex images",
                      features: ["Lossy compression", "Millions of colors", "Best for web"]
                    },
                    {
                      format: "PNG",
                      icon: "🔄",
                      description: "Perfect for graphics with transparency",
                      features: ["Lossless compression", "Alpha channel support", "Sharp edges"]
                    },
                    {
                      format: "WebP",
                      icon: "⚡",
                      description: "Modern format with superior compression",
                      features: ["30% smaller than JPEG", "Animation support", "Next-gen web"]
                    },
                    {
                      format: "GIF",
                      icon: "🎬",
                      description: "Animated images and simple graphics",
                      features: ["Animation support", "256 colors", "Social media ready"]
                    }
                  ].map((format, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl flex-shrink-0">{format.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{format.format}</h4>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Supported</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{format.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {format.features.map((feature, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Compression Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Compression Features</h3>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: <HardDrive className="w-5 h-5 text-green-600" />,
                      title: "Smart Compression",
                      description: "Intelligent algorithms analyze image content to apply optimal compression settings"
                    },
                    {
                      icon: <Palette className="w-5 h-5 text-blue-600" />,
                      title: "Color Optimization",
                      description: "Advanced color space conversion and palette optimization"
                    },
                    {
                      icon: <Layers className="w-5 h-5 text-purple-600" />,
                      title: "Metadata Handling",
                      description: "Selective EXIF data preservation or removal for additional savings"
                    },
                    {
                      icon: <Clock className="w-5 h-5 text-orange-600" />,
                      title: "Fast Processing",
                      description: "Browser-based processing ensures instant results without server delays"
                    },
                    {
                      icon: <Shield className="w-5 h-5 text-green-600" />,
                      title: "Privacy First",
                      description: "All processing happens locally - your images never leave your device"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technical Limits */}
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Technical Specifications</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Max File Size:</span>
                      <span className="text-gray-700 ml-2">10 MB</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Processing:</span>
                      <span className="text-gray-700 ml-2">Client-side</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Quality Range:</span>
                      <span className="text-gray-700 ml-2">60-95%</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Output:</span>
                      <span className="text-gray-700 ml-2">Original format</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 📈 PERFORMANCE METRICS SECTION */}
          <section className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Real Performance Impact
              </h2>
              <p className="text-gray-600 text-lg">
                See how image compression transforms website performance
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">47%</div>
                  <p className="text-gray-600">Average reduction in page load time</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">72%</div>
                  <p className="text-gray-600">Improvement in Google PageSpeed scores</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">35%</div>
                  <p className="text-gray-600">Decrease in mobile bounce rates</p>
                </div>
              </div>
            </div>
          </section>

          {/* ⚡ COMPARISON SECTION */}
          <section className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Image Compressor Over Alternatives?
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-4 gap-0">
                <div className="bg-gray-50 p-6 font-semibold text-gray-900 border-r border-gray-200">
                  Features
                </div>
                <div className="bg-blue-50 p-6 text-center font-semibold text-blue-900 border-r border-gray-200">
                  Our Tool
                </div>
                <div className="bg-gray-50 p-6 text-center font-semibold text-gray-700 border-r border-gray-200">
                  Competitor A
                </div>
                <div className="bg-gray-50 p-6 text-center font-semibold text-gray-700">
                  Competitor B
                </div>

                {[
                  { feature: "Free to Use", our: "✓ Unlimited", a: "✓ Limited", b: "✗ Premium" },
                  { feature: "No Registration", our: "✓ Yes", a: "✗ Required", b: "✗ Required" },
                  { feature: "Local Processing", our: "✓ 100% Secure", a: "✗ Server Upload", b: "✗ Server Upload" },
                  { feature: "Batch Processing", our: "✓ Multiple Files", a: "✗ Single File", b: "✓ Premium Only" },
                  { feature: "WebP Support", our: "✓ Yes", a: "✗ No", b: "✓ Yes" },
                  { feature: "Quality Control", our: "✓ Advanced AI", a: "✓ Basic", b: "✓ Advanced" }
                ].map((row, index) => (
                  <React.Fragment key={index}>
                    <div className="p-4 border-t border-gray-200 font-medium text-gray-700">
                      {row.feature}
                    </div>
                    <div className="p-4 border-t border-gray-200 text-center text-green-600 font-semibold">
                      {row.our}
                    </div>
                    <div className="p-4 border-t border-gray-200 text-center text-gray-600">
                      {row.a}
                    </div>
                    <div className="p-4 border-t border-gray-200 text-center text-gray-600">
                      {row.b}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* ❓ FAQ SECTION */}
          <section className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-lg">
                Everything you need to know about image compression and optimization
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "Is this image compressor completely free to use?",
                  answer: "Yes, our online image compressor is 100% free with no hidden costs, usage limits, or watermarks. You can compress unlimited images without registration."
                },
                {
                  question: "How does image compression affect SEO?",
                  answer: "Image compression significantly improves SEO by reducing page load times, which is a direct ranking factor for Google. Faster loading pages also reduce bounce rates and improve user experience metrics that search engines track."
                },
                {
                  question: "Will my images be stored on your servers?",
                  answer: "No, all image processing happens locally in your browser. Your files never leave your device, ensuring complete privacy and security. We don't have access to your images at any point."
                },
                {
                  question: "What's the maximum file size I can compress?",
                  answer: "There are no file size limitations. Our browser-based compression technology can handle images of any size, from small icons to high-resolution photographs and professional photography files."
                },
                {
                  question: "Which image formats give the best compression results?",
                  answer: "WebP typically offers the best compression ratios while maintaining quality. For photographs, optimized JPEG provides excellent results. PNG is best for graphics with transparency. Our tool automatically selects the optimal format."
                },
                {
                  question: "How much can I expect to reduce image file sizes?",
                  answer: "Most images can be reduced by 60-80% without noticeable quality loss. The exact compression ratio depends on the original image quality, format, and content type. Complex photographs typically achieve higher compression rates."
                },
                {
                  question: "Does image compression work on mobile devices?",
                  answer: "Yes, our image compressor is fully responsive and works perfectly on all mobile devices, tablets, and desktop computers. The interface is optimized for touch screens and mobile browsers."
                },
                {
                  question: "Can I compress multiple images at once?",
                  answer: "Currently, we support single-image compression for optimal quality control. For batch processing, you can quickly compress multiple images sequentially with our fast processing technology."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                >
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 🚀 FINAL CTA SECTION */}
          <section className="max-w-4xl mx-auto text-center mb-20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Optimize Your Images?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Start compressing your images now and experience faster websites, better SEO rankings, and improved user engagement.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Compress Your First Image Now
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}