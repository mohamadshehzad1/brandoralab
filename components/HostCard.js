import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HostCard = ({ 
  logoUrl, 
  brandName = "HostArmada", 
  couponCount = 0, 
  primaryButtonUrl = "#", 
  secondaryButtonUrl = "#",
  ratings = [
    { label: 'Features', score: 4.8 },
    { label: 'Ease of Use', score: 4.9 },
    { label: 'Performance', score: 4.7 },
    { label: 'Support', score: 4.9 },
    { label: 'Pricing', score: 4.8 },
  ],
  primaryButtonText = "Visit Site",
  secondaryButtonText = "Check Coupons",
  accentColor = "orange",
  overviewTitle = "Overview"
}) => {
  
  // Color mapping based on accentColor
  const colorMap = {
    orange: {
      primary: 'bg-orange-600 hover:bg-orange-700',
      secondary: 'border-orange-600 text-orange-600 hover:bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-600',
      bg: 'bg-orange-50'
    },
    blue: {
      primary: 'bg-blue-600 hover:bg-blue-700',
      secondary: 'border-blue-600 text-blue-600 hover:bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-600',
      bg: 'bg-blue-50'
    },
    green: {
      primary: 'bg-green-600 hover:bg-green-700',
      secondary: 'border-green-600 text-green-600 hover:bg-green-50',
      text: 'text-green-600',
      border: 'border-green-600',
      bg: 'bg-green-50'
    },
    purple: {
      primary: 'bg-purple-600 hover:bg-purple-700',
      secondary: 'border-purple-600 text-purple-600 hover:bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-600',
      bg: 'bg-purple-50'
    }
  };

  const colors = colorMap[accentColor] || colorMap.orange;

  return (
    <div className="max-w-[350px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden font-sans sticky top-24">
      {/* Top Section */}
      <div className="p-8 flex flex-col items-center space-y-6">
        {/* Brand Logo */}
        <div className="relative w-full h-16 flex items-center justify-center">
          <div className="relative w-48 h-full">
            {logoUrl ? (
              <Image 
                src={logoUrl} 
                alt={`${brandName} logo`}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-xl font-bold text-gray-700">{brandName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          {/* Secondary Button (Check Coupons) */}
          <Link 
            href={secondaryButtonUrl}
            className={`w-full py-3 px-4 border-2 ${colors.secondary} font-bold rounded-lg flex justify-center items-center gap-2 transition-colors`}
          >
            {secondaryButtonText}
            {couponCount > 0 && (
              <span className={`${colors.primary} text-white text-xs w-5 h-5 flex items-center justify-center rounded-full`}>
                {couponCount}
              </span>
            )}
          </Link>

          {/* Primary Button (Visit Site) */}
          <a 
            href={primaryButtonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full py-3 px-4 ${colors.primary} text-white text-center font-bold rounded-lg transition-colors`}
          >
            {primaryButtonText}
          </a>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-gray-50 p-6">
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3 mb-4">{overviewTitle}</h3>
          
          <div className="space-y-4">
            {ratings.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600 text-sm font-medium">{item.label}</span>
                <div className="flex items-center gap-2">
                  {/* Star SVG */}
                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-900 font-bold">{item.score.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">
            Trusted by 10k+ readers
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostCard;