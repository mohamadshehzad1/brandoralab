// components/SidebarReviewCard.js
'use client'

import React from 'react'
import Link from 'next/link'

const SidebarReviewCard = ({
  logoUrl,
  brandName = "Brand Name",
  couponCount = 0,
  primaryButtonUrl = "#",
  secondaryButtonUrl = "#",
  ratings = [],
  primaryButtonText = "Visit Site",
  secondaryButtonText = "Check Coupons",
  accentColor = "orange",
  className = "",
  overviewTitle = "Overview",
  showStars = true,
}) => {
  
  // Refined color palettes for a premium feel
  const colorClasses = {
    orange: {
      primary: 'bg-orange-600 hover:bg-orange-700 border-orange-600 text-white shadow-orange-200',
      secondary: 'border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300',
      badge: 'bg-orange-600 text-white',
      star: 'text-orange-500',
      bg: 'bg-orange-50/50',
      border: 'border-orange-100',
      ring: 'focus:ring-orange-500',
    },
    red: {
      primary: 'bg-red-600 hover:bg-red-700 border-red-600 text-white shadow-red-200',
      secondary: 'border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300',
      badge: 'bg-red-600 text-white',
      star: 'text-red-500',
      bg: 'bg-red-50/50',
      border: 'border-red-100',
      ring: 'focus:ring-red-500',
    },
    blue: {
      primary: 'bg-blue-600 hover:bg-blue-700 border-blue-600 text-white shadow-blue-200',
      secondary: 'border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300',
      badge: 'bg-blue-600 text-white',
      star: 'text-blue-500',
      bg: 'bg-blue-50/50',
      border: 'border-blue-100',
      ring: 'focus:ring-blue-500',
    },
    green: {
      primary: 'bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white shadow-emerald-200',
      secondary: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300',
      badge: 'bg-emerald-600 text-white',
      star: 'text-emerald-500',
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-100',
      ring: 'focus:ring-emerald-500',
    },
  };

  const colors = colorClasses[accentColor] || colorClasses.orange;

  // Calculate Overall Score
  const overallScore = ratings.length > 0 
    ? (ratings.reduce((sum, r) => sum + parseFloat(r.score), 0) / ratings.length).toFixed(1)
    : '4.5';

  return (
    <div className={`
      relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-6
      transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
      ${className}
    `}>
      {/* Trust Badge / Header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gray-900 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-md">
           Editor's Choice
        </div>
      </div>

      {/* Header with Logo */}
      <div className="mt-2 mb-6 text-center">
        {logoUrl ? (
          <div className="flex justify-center mb-3 h-16 items-center">
            <img 
              src={logoUrl} 
              alt={`${brandName} logo`}
              className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        ) : (
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{brandName}</div>
          </div>
        )}
        
        {/* Quick Star Summary */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="flex text-yellow-400">
             {[...Array(5)].map((_, i) => (
               <svg key={i} className={`w-5 h-5 ${i < Math.round(overallScore) ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20" fill="currentColor">
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
               </svg>
             ))}
          </div>
          <span className="font-bold text-gray-900">{overallScore}/5</span>
        </div>
      </div>

      {/* Overview Section */}
      <div className={`rounded-xl p-5 mb-6 ${colors.bg} border ${colors.border}`}>
        <div className="space-y-3">
          {ratings.slice(0, 4).map((rating, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">{rating.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white rounded-full overflow-hidden border border-gray-100">
                  <div 
                    className={`h-full rounded-full opacity-80 ${colors.badge}`} 
                    style={{ width: `${(rating.score / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="font-bold text-gray-900 w-6 text-right">{rating.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="space-y-3">
        {/* Primary Button */}
        <Link 
          href={primaryButtonUrl}
          className={`
            group flex items-center justify-center w-full text-center font-bold text-lg
            py-3.5 px-4 rounded-xl transition-all duration-200
            shadow-lg hover:-translate-y-0.5
            ${colors.primary}
          `}
        >
          {primaryButtonText}
          <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

        {/* Secondary Button with Badge */}
        <Link 
          href={secondaryButtonUrl}
          className={`
            relative flex items-center justify-center w-full px-4 py-3 
            border-2 rounded-xl transition-all duration-200 font-semibold text-sm
            ${colors.secondary}
          `}
        >
          {secondaryButtonText}
          {couponCount > 0 && (
            <span className={`
              ml-2 text-[10px] px-2 py-0.5 rounded-full
              font-bold ${colors.badge}
            `}>
              {couponCount} DEALS
            </span>
          )}
        </Link>
      </div>

      {/* Footer / Disclaimer */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-[11px] text-gray-400">
          Terms apply. We may earn a commission.
        </p>
      </div>
    </div>
  )
}

export default SidebarReviewCard