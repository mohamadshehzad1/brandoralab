"use client";
import { motion } from "framer-motion";

// Fallback icons in case Lucide React has issues
const FallbackIcon = ({ emoji = "⭐" }) => (
  <span className="text-2xl">{emoji}</span>
);

export default function QuizStep({ step, question, total, onNext }) {
  const progress = ((step + 1) / total) * 100;

  // Planet colors for different options
  const planetColors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500", 
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-600",
    "from-yellow-500 to-orange-500"
  ];

  // Space journey milestones
  const spaceMilestones = [
    "Launching...",
    "Orbiting Earth",
    "Passing Moon",
    "Exploring Mars",
    "Jupiter Approach", 
    "Saturn's Rings",
    "Deep Space",
    "New Galaxy!",
    "Destination Reached! 🎉"
  ];

  // Icon mapping with fallbacks
  const icons = {
    rocket: "🚀",
    star: "⭐",
    satellite: "🛰️",
    planet: "🪐",
    sparkles: "✨",
    chevron: "➡️"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-3xl border border-purple-500/30 shadow-2xl p-8 text-center overflow-hidden"
    >
      {/* Animated Space Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Spaceship Navigation */}
      <div className="relative mb-8">
        <div className="flex justify-between items-center mb-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-blue-300"
          >
            <span className="text-2xl">{icons.rocket}</span>
            <span className="text-sm font-semibold">Mission Control</span>
          </motion.div>
          
          <div className="text-right">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-yellow-300 text-sm font-bold mb-1"
            >
              {spaceMilestones[Math.min(step, spaceMilestones.length - 1)]}
            </motion.div>
            <div className="text-gray-400 text-xs">
              Sector {step + 1} of {total}
            </div>
          </div>
        </div>

        {/* Cosmic Progress Bar */}
        <div className="relative h-3 bg-gray-800 rounded-full mb-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 relative"
          >
            {/* Moving stars in progress bar */}
            <motion.div
              className="absolute top-0 w-2 h-3 bg-white rounded-full"
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
        
        {/* Planet Progress Dots */}
        <div className="flex justify-between px-2 mt-2">
          {Array.from({ length: total }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= step 
                  ? "bg-yellow-400 shadow-lg shadow-yellow-400/50" 
                  : "bg-gray-600"
              }`}
              animate={index <= step ? {
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0 0 rgba(255,255,255,0.4)",
                  "0 0 0 6px rgba(255,255,255,0)",
                  "0 0 0 0 rgba(255,255,255,0)"
                ]
              } : {}}
              transition={{ duration: 2, repeat: index === step ? Infinity : 0 }}
            />
          ))}
        </div>
      </div>

      {/* Central Question Planet */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative mb-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full shadow-lg shadow-purple-500/30 mb-4">
          <span className="text-3xl">{icons.planet}</span>
        </div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-white mb-2"
        >
          {question.question}
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-blue-300 text-sm flex items-center justify-center gap-2"
        >
          <span>{icons.sparkles}</span>
          Select your trajectory
          <span>{icons.sparkles}</span>
        </motion.div>
      </motion.div>

      {/* Planet Option Orbits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto relative"
      >
        {/* Orbital rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 border border-purple-400/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 border border-blue-400/20 rounded-full"
          />
        </div>

        {question.options.map((option, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 0.6, 
              delay: 0.7 + (idx * 0.1),
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNext(option)}
            className={`relative group bg-gradient-to-br ${planetColors[idx]} rounded-2xl p-6 text-white font-semibold shadow-2xl border border-white/20 backdrop-blur-sm min-h-[120px] flex items-center justify-center`}
          >
            {/* Planet Core */}
            <div className="relative z-10 text-center">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="text-lg font-bold drop-shadow-lg"
              >
                {option}
              </motion.div>
              
              {/* Orbiting moon */}
              <motion.div
                animate={{
                  rotate: 360,
                  x: [0, 20, 0],
                  y: [0, -15, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full opacity-80 shadow-lg flex items-center justify-center text-xs"
              >
                🌙
              </motion.div>
            </div>

            {/* Planet rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-24 h-1 bg-white/40 rounded-full -top-2"
            />
            
            {/* Selection indicator */}
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="absolute inset-0 border-2 border-yellow-400 rounded-2xl"
            />

            {/* Hover arrow */}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-xl"
            >
              {icons.chevron}
            </motion.span>
          </motion.button>
        ))}
      </motion.div>

      {/* Mission Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 flex justify-center gap-6 text-sm text-gray-400"
      >
        <div className="flex items-center gap-2">
          <span>{icons.star}</span>
          <span>Mission Progress: {Math.round(progress)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{icons.satellite}</span>
          <span>Systems: {step + 1}/{total}</span>
        </div>
      </motion.div>

      {/* Floating AI Assistant */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          x: [0, 5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="text-xl">🤖</span>
      </motion.div>
    </motion.div>
  );
}