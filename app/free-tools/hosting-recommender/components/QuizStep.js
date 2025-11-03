"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizStep({ step, question, total, onNext }) {
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center py-8">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header - Clean and Centered */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Step {step + 1} of {total}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span className="font-semibold text-blue-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Main Quiz Container - Single Clean Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          {/* Question Section */}
          <div className="p-8 md:p-10 border-b border-gray-100">
            <motion.div
              key={`question-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-blue-600">💡</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {question.question}
              </h2>
              
              <p className="text-gray-600 text-lg">
                Choose the option that best fits your requirements
              </p>
            </motion.div>
          </div>

          {/* Options Section */}
          <div className="p-6 md:p-8">
            <div className="max-w-2xl mx-auto space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.01,
                    backgroundColor: "rgb(249 250 251)"
                  }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => onNext(option)}
                  className="w-full bg-white border-2 border-gray-200 hover:border-blue-500 rounded-xl p-6 text-left transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center space-x-4">
                    {/* Option Indicator */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-sm font-semibold group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                      {String.fromCharCode(65 + index)}
                    </div>
                    
                    {/* Option Text */}
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium text-lg group-hover:text-gray-800">
                        {option}
                      </p>
                    </div>
                    
                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="flex-shrink-0 text-blue-500"
                    >
                      →
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Trust Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "AI-Powered", icon: "🤖" },
                  { label: "30+ Providers", icon: "🏢" },
                  { label: "Unbiased Results", icon: "⚖️" },
                  { label: "Secure & Private", icon: "🔒" }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-xl mb-1">{item.icon}</span>
                    <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Guidance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            Your responses help our AI find the perfect hosting match for your needs
          </p>
        </motion.div>
      </div>

      {/* AI Processing Overlay */}
      <AnimatePresence>
        {false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl"
            >
              <div className="relative inline-block mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Analyzing Your Needs
              </h3>
              <p className="text-gray-600 text-sm">
                Matching your requirements with optimal hosting solutions...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}