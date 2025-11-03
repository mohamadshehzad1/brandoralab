// components/ToolUniqueFeatures.jsx
"use client";
import { motion } from "framer-motion";
import { 
  Search, Zap, Shield, Cpu, Globe, TrendingUp, 
  Lock, Clock, Sparkles, BarChart3, Server, Users 
} from "lucide-react";

const ToolUniqueFeatures = () => {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO-Optimized Processing",
      description: "Our compression algorithms are designed to maximize Google Core Web Vitals scores by reducing LCP (Largest Contentful Paint) and improving overall page speed metrics.",
      benefits: [
        "Better Google PageSpeed Scores",
        "Improved Core Web Vitals",
        "Higher Search Rankings",
        "Reduced Bounce Rates"
      ],
      color: "blue"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning-Fast Performance",
      description: "Browser-based processing ensures instant compression without server delays. Experience up to 5x faster processing compared to traditional cloud-based tools.",
      benefits: [
        "Instant Compression",
        "No Server Queues",
        "Real-time Preview",
        "Batch Processing Ready"
      ],
      color: "green"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Military-Grade Security",
      description: "100% local processing means your images never leave your device. No cloud storage, no third-party access, complete privacy protection.",
      benefits: [
        "Local Browser Processing",
        "No Data Transmission",
        "GDPR Compliant",
        "Enterprise Security"
      ],
      color: "purple"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "AI-Powered Optimization",
      description: "Advanced machine learning algorithms analyze each image's unique characteristics to apply optimal compression settings while preserving visual quality.",
      benefits: [
        "Smart Quality Detection",
        "Adaptive Compression",
        "Format Optimization",
        "Quality Preservation"
      ],
      color: "orange"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Industry-Leading Compression",
      description: "Achieve up to 80% size reduction without noticeable quality loss. Superior compression ratios compared to standard tools.",
      benefits: [
        "Up to 80% Size Reduction",
        "Quality Maintained",
        "Multiple Format Support",
        "Advanced Algorithms"
      ],
      color: "red"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Comprehensive performance metrics and visual comparisons help you understand the exact impact of optimization on your website performance.",
      benefits: [
        "Visual Comparisons",
        "Performance Metrics",
        "SEO Impact Analysis",
        "Download Reports"
      ],
      color: "teal"
    }
  ];

  const stats = [
    { value: "80%", label: "Average Size Reduction", icon: "📉" },
    { value: "47%", label: "Faster Load Times", icon: "⚡" },
    { value: "72%", label: "SEO Score Improvement", icon: "📈" },
    { value: "100%", label: "Client-Side Security", icon: "🔒" }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      red: "from-red-500 to-red-600",
      teal: "from-teal-500 to-teal-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Industry Leading Technology</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Our Tool <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Outperforms</span> The Competition
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built with cutting-edge technology and user-centric design, our image compressor delivers 
            unparalleled performance, security, and results that drive real business value.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group"
            >
              {/* Feature Header */}
              <div className={`bg-gradient-to-r ${getColorClasses(feature.color)} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </div>
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <motion.div
                      key={benefitIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.1) + (benefitIndex * 0.05) }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${feature.color}-500`} />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Feature Indicator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className={`h-1 bg-gradient-to-r ${getColorClasses(feature.color)} mt-6 rounded-full transform origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Experience the Difference
            </h3>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who trust our tool for their image optimization needs. 
              See the impact on your website performance and SEO rankings.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ Happy Users</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>98% Satisfaction Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolUniqueFeatures;