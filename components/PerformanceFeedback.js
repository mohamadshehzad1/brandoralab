import React from "react"
import Link from "next/link"

const PerformanceFeedback = ({ 
  hostingProvider = "Hosting Provider",
  globalSpeedData = [],
  performanceMetrics = [],
  customerTestimonials = [],
  trustRatings = [],
  caseStudy = {},
  technicalHighlights = [],
  comparisonLink = "",
  primaryColor = "blue",
  secondaryColor = "purple"
}) => {
  
  const colorClasses = {
    blue: {
      bg: 'from-blue-50 to-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      bgLight: 'bg-blue-50',
      borderLight: 'border-blue-400'
    },
    purple: {
      bg: 'from-purple-50 to-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      bgLight: 'bg-purple-50',
      borderLight: 'border-purple-400'
    },
    green: {
      bg: 'from-green-50 to-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      bgLight: 'bg-green-50',
      borderLight: 'border-green-400'
    },
    orange: {
      bg: 'from-orange-50 to-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      bgLight: 'bg-orange-50',
      borderLight: 'border-orange-400'
    }
  }

  const colors = colorClasses[primaryColor] || colorClasses.blue

  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-xl p-8 my-12 border ${colors.border}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 Real-World Performance & Customer Feedback</h2>
      
      <p className="text-gray-700 mb-8">
        While synthetic benchmarks provide useful data, real-world performance and customer experiences 
        tell the complete story. Here's what actual users are saying about {hostingProvider}:
      </p>

      {/* Global Speed Performance */}
      {globalSpeedData.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">🌍 Global Speed Performance</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {globalSpeedData.map((region, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${colors.text} mb-2`}>{region.loadTime}</div>
                <div className="text-sm font-semibold text-gray-800">{region.region}</div>
                <div className="text-xs text-gray-600">{region.dataCenter}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            * Load times measured from different global locations using GTmetrix
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Performance Metrics */}
        {performanceMetrics.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📊 Performance Metrics</h3>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">{metric.metric}</span>
                  <span className={`font-semibold ${metric.color || 'text-green-600'}`}>{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Testimonials */}
        {customerTestimonials.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">💬 Customer Voices</h3>
            <div className="space-y-4">
              {customerTestimonials.map((testimonial, index) => (
                <div key={index} className={`${colors.bgLight} p-4 rounded-lg border-l-4 ${colors.borderLight}`}>
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 ${colors.bgLight} rounded-full flex items-center justify-center mr-2`}>
                      <span className={`${colors.text} text-sm font-bold`}>⭐</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trust Ratings */}
      {trustRatings.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">⭐ Trust & Reliability Scores</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustRatings.map((rating, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.bgLight} rounded-full mb-3`}>
                  <span className="text-xl font-bold text-gray-700">{rating.rating}</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{rating.platform}</h4>
                <p className="text-sm text-gray-600">{rating.description}</p>
                {rating.reviewCount && (
                  <p className="text-xs text-gray-500 mt-1">{rating.reviewCount}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Case Study & Technical Highlights */}
      {(caseStudy.title || technicalHighlights.length > 0) && (
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Case Study */}
          {caseStudy.title && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3 text-lg">🚀 {caseStudy.title}</h4>
              <p className="text-sm text-gray-700 mb-3">{caseStudy.description}</p>
              <div className="space-y-2 text-sm">
                {caseStudy.before && (
                  <div className="flex justify-between">
                    <span>Before:</span>
                    <span className="font-semibold text-red-600">{caseStudy.before}</span>
                  </div>
                )}
                {caseStudy.after && (
                  <div className="flex justify-between">
                    <span>After:</span>
                    <span className="font-semibold text-green-600">{caseStudy.after}</span>
                  </div>
                )}
                {caseStudy.result && (
                  <div className="flex justify-between border-t border-yellow-200 pt-2 mt-2">
                    <span>Result:</span>
                    <span className="font-semibold text-blue-600">{caseStudy.result}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Technical Highlights */}
          {technicalHighlights.length > 0 && (
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3 text-lg">💡 Technical Highlights</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {technicalHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Comparison Link */}
      {comparisonLink && (
        <div className="text-center bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-700 mb-2">
            Want to see how {hostingProvider} compares to other hosting providers?
          </p>
          <Link 
            href={comparisonLink.href} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold underline transition-colors"
          >
            {comparisonLink.text}
            <span className="ml-1">→</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default PerformanceFeedback