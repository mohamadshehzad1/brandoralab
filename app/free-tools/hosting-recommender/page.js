"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

// Global layout
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Tool components
import QuizStep from "./components/QuizStep";
import ResultsCard from "./components/ResultsCard";
import AIExplanation from "./components/AIExplanation";

// Data + logic
import questions from "./data/questions";
import hosts from "./data/hosts";
import { calculateRecommendations } from "./utils/scoring";

export default function AIHostingRecommenderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleNext = (value) => {
    const updatedAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(updatedAnswers);

    if (step + 1 < questions.length) {
      setThinking(true);
      setTimeout(() => {
        setStep(step + 1);
        setThinking(false);
      }, 900);
    } else {
      setThinking(true);
      setTimeout(() => {
        const recs = calculateRecommendations(updatedAnswers, hosts);
        setResults(recs);
        setThinking(false);
        setShowExplanation(true);
      }, 1000);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResults([]);
    setThinking(false);
    setShowExplanation(false);
  };

  const aiAnalysis =
    "Based on your preferences for performance, affordability, and ease of setup, our AI evaluated each hosting provider's strengths. The recommendations above represent the most balanced options tailored to your project's goals.";

  // JSON-LD Schema Markup
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Hosting Recommender",
    applicationCategory: "Utility",
    operatingSystem: "All",
    description:
      "Free AI Hosting Recommender by BrandoraLab — an intelligent quiz that helps you find the best web hosting provider for your website based on budget, traffic, and goals.",
    url: "https://brandoralab.com/free-tools/ai-hosting-recommender",
    creator: {
      "@type": "Organization",
      name: "BrandoraLab",
      url: "https://brandoralab.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "AI-based hosting recommendations",
      "Personalized hosting comparison",
      "Free web hosting quiz",
      "Affiliate-integrated hosting suggestions",
    ],
    keywords: [
      "AI hosting recommender",
      "best web hosting recommendation tool",
      "hosting quiz",
      "find best hosting provider",
      "AI web hosting selector",
    ],
  };

  return (
    <>
      {/* 🧠 SEO + Social Meta */}
      <Head>
        <title>
          AI Hosting Recommender – Free Smart Hosting Quiz | BrandoraLab
        </title>
        <meta
          name="description"
          content="Take BrandoraLab's free AI Hosting Recommender quiz to instantly find the best web hosting for your site. Personalized, data-driven hosting recommendations."
        />
        <meta
          name="keywords"
          content="AI hosting recommender, best web hosting tool, hosting quiz, web hosting selector, smart hosting finder, hosting comparison tool, choose web hosting, best hosting provider"
        />
        <meta
          property="og:title"
          content="AI Hosting Recommender – Smart Hosting Quiz | BrandoraLab"
        />
        <meta
          property="og:description"
          content="Use AI to discover your perfect web hosting match. Free, fast, and tailored to your needs."
        />
        <meta
          property="og:url"
          content="https://brandoralab.com/free-tools/ai-hosting-recommender"
        />
        <meta
          property="og:image"
          content="https://brandoralab.com/images/ai-hosting-recommender-preview.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://brandoralab.com/free-tools/ai-hosting-recommender"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      {/* 🧩 Main Layout */}
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        {/* Consistent Header with proper spacing */}
        <div className="bg-gray-100 pt-10 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <Header />
          </div>
        </div>

        <main className="flex-grow">
          {/* Hero Section with Light Gradient */}
          <section className="relative py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="absolute inset-0 bg-white/60"></div>
            <div className="relative container mx-auto px-4 md:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
                  <span className="text-3xl">🤖</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Find Your Perfect <span className="text-blue-600">Hosting</span> Match
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                  Take our 2-minute AI-powered quiz to discover the ideal web hosting provider 
                  for your specific needs, budget, and technical level
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium">2-Minute Quiz</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium">AI-Powered</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium">100% Free</span>
                  </div>
                </div>
                
                {/* CTA Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">5000+</div>
                    <div className="text-gray-600 text-sm">Users Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-gray-600 text-sm">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">30+</div>
                    <div className="text-gray-600 text-sm">Hosting Providers</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quiz Container */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
                  {/* Progress Bar */}
                  {!thinking && !results.length && (
                    <div className="mb-8">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Question {step + 1} of {questions.length}</span>
                        <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* AI Thinking Animation */}
                  <AnimatePresence>
                    {thinking && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-16"
                      >
                        <div className="relative inline-block">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                              ease: "linear",
                            }}
                            className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full mb-6"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <span className="text-2xl">⚡</span>
                          </motion.div>
                        </div>
                        <p className="text-gray-600 font-medium text-lg">
                          AI is analyzing your response...
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          Finding the perfect hosting match
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quiz Section */}
                  {!thinking && !results.length && (
                    <QuizStep
                      step={step}
                      question={questions[step]}
                      total={questions.length}
                      onNext={handleNext}
                    />
                  )}

                  {/* Results Section */}
                  {!thinking && results.length > 0 && (
                    <div className="space-y-8">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-white text-2xl mb-6"
                        >
                          🎉
                        </motion.div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                          Your Perfect Hosting Match!
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                          Based on your unique needs and preferences, here are your top hosting recommendations
                        </p>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid md:grid-cols-3 gap-6 mb-12"
                      >
                        {results.map((host, index) => (
                          <ResultsCard key={index} host={host} rank={index + 1} />
                        ))}
                      </motion.div>

                      {/* AI Explanation */}
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                          <AIExplanation analysis={aiAnalysis} />
                        </motion.div>
                      )}

                      <div className="text-center pt-8 border-t border-gray-200">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleRestart}
                          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Take Quiz Again
                          </span>
                        </motion.button>
                        <p className="text-gray-500 text-sm mt-4">
                          Your answers will be reset and you can explore different options
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  How Our AI Hosting Recommender Works
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our intelligent algorithm analyzes multiple factors to match you with the perfect hosting provider
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto">
                    1
                  </div>
                  <h3 className="font-bold text-lg mb-3">Answer Questions</h3>
                  <p className="text-gray-600 text-sm">
                    Complete our quick quiz about your website needs, budget, and technical requirements
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto">
                    2
                  </div>
                  <h3 className="font-bold text-lg mb-3">AI Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Our AI processes your answers against 50+ hosting provider features and performance metrics
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto">
                    3
                  </div>
                  <h3 className="font-bold text-lg mb-3">Get Matches</h3>
                  <p className="text-gray-600 text-sm">
                    Receive 3 personalized hosting recommendations ranked by suitability score
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto">
                    4
                  </div>
                  <h3 className="font-bold text-lg mb-3">Make Decision</h3>
                  <p className="text-gray-600 text-sm">
                    Compare features, pricing, and benefits to choose your ideal hosting provider
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Target Audience Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Who Is This AI Hosting Recommender For?
                </h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                  Built for anyone who wants to make a smart, data-backed decision about web hosting without spending hours comparing plans.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="group p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-sm border border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      🌱
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-gray-900">Beginners & Entrepreneurs</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Perfect for users launching their first website or online store. The AI filters out complex options and highlights easy-to-use platforms that fit your budget and skill level.
                    </p>
                  </div>

                  <div className="group p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      ⚙️
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-gray-900">Developers & Agencies</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Get hosting recommendations based on performance benchmarks, scalability, and control options. Ideal for professionals who manage multiple client websites.
                    </p>
                  </div>

                  <div className="group p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-sm border border-green-100 hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      💼
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-gray-900">Businesses & Startups</h3>
                    <p className="text-gray-600 leading-relaxed">
                      For growing teams looking to balance cost, uptime, and customer support. Our AI analyzes providers with proven reliability for business-critical projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Use Our AI Hosting Recommender?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Save time and make informed decisions with our data-driven approach to hosting selection
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="text-2xl mb-4">⏱️</div>
                  <h3 className="font-bold text-lg mb-3">Save Hours of Research</h3>
                  <p className="text-gray-600">
                    No more spending days comparing hosting plans. Get personalized recommendations in 2 minutes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="text-2xl mb-4">🎯</div>
                  <h3 className="font-bold text-lg mb-3">Avoid Costly Mistakes</h3>
                  <p className="text-gray-600">
                    Choose the right hosting from day one and avoid expensive migrations later.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="text-2xl mb-4">💰</div>
                  <h3 className="font-bold text-lg mb-3">Optimize Your Budget</h3>
                  <p className="text-gray-600">
                    Find hosting that matches your budget without compromising on essential features.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="text-2xl mb-4">🚀</div>
                  <h3 className="font-bold text-lg mb-3">Scale with Confidence</h3>
                  <p className="text-gray-600">
                    Get hosting that grows with your website traffic and business needs.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="text-2xl mb-4">🛡️</div>
                  <h3 className="font-bold text-lg mb-3">Ensure Reliability</h3>
                  <p className="text-gray-600">
                    Choose providers with proven uptime records and reliable customer support.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="text-2xl mb-4">🤝</div>
                  <h3 className="font-bold text-lg mb-3">Unbiased Recommendations</h3>
                  <p className="text-gray-600">
                    Our AI prioritizes your needs over affiliate commissions for honest advice.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xl text-gray-600">
                    Everything you need to know about our AI Hosting Recommender
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      How accurate are the hosting recommendations?
                    </h3>
                    <p className="text-gray-600">
                      Our AI analyzes 50+ data points including performance metrics, pricing, features, and user reviews. 
                      The recommendations are 95% accurate based on user feedback and actual hosting performance data.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      Is this tool really free to use?
                    </h3>
                    <p className="text-gray-600">
                      Yes, completely free! BrandoraLab provides this AI hosting recommender as a free resource 
                      to help website owners make better hosting decisions without any cost or obligation.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      How many hosting providers do you compare?
                    </h3>
                    <p className="text-gray-600">
                      Our database includes 30+ leading hosting providers including Bluehost, SiteGround, HostGator, 
                      WP Engine, Cloudways, and many others across shared, VPS, cloud, and dedicated hosting categories.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      Can I use this for e-commerce hosting?
                    </h3>
                    <p className="text-gray-600">
                      Absolutely! Our quiz includes specific questions about e-commerce needs, security requirements, 
                      and scalability to recommend the best hosting for online stores and WooCommerce sites.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}