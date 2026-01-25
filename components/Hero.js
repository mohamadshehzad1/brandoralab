// app/components/HeroSection.js
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
      aria-label="Main Hero Section"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Trusted by 1,000+ Digital Businesses
          </div>

          {/* Main Heading with SEO keywords */}
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block mb-2">
              <span className="block text-gray-900">Web Hosting Reviews &</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Growth Strategies
              </span>
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mt-4">
              Find the Best Hosting Solutions
              <span className="relative ml-2">
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-pink-400"
                  fill="currentColor"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0,8 Q25,1 50,8 T100,8" />
                </svg>
                <span className="relative">That Boost Your SEO</span>
              </span>
            </span>
          </h1>

          {/* SEO-optimized description */}
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            Get expert web hosting reviews, performance comparisons, and proven 
            <strong className="text-gray-900"> SEO strategies </strong>
            to accelerate your website&apos;s growth. We test and analyze top hosting providers 
            so you can make informed decisions for your online success.
          </p>

          {/* Stats for credibility */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Hosting Providers Reviewed</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">10K+</div>
              <div className="text-sm text-gray-600">Performance Tests</div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600">Uptime Average</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/hosting-reviews"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              aria-label="Browse hosting reviews"
            >
              Browse Hosting Reviews
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/seo-guides"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-gray-700 bg-white border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 shadow-sm hover:shadow-md transition-all duration-200"
              aria-label="Learn SEO strategies"
            >
              Learn SEO Strategies
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4">Trusted and Recommended By</p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-70">
              <div className="text-gray-400 font-bold text-lg">TechCrunch</div>
              <div className="text-gray-400 font-bold text-lg">Forbes</div>
              <div className="text-gray-400 font-bold text-lg">Wired</div>
              <div className="text-gray-400 font-bold text-lg">Moz</div>
              <div className="text-gray-400 font-bold text-lg">Ahrefs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance score indicator */}
      <div className="absolute bottom-4 right-4 hidden lg:block">
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Real-time Performance Data</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;