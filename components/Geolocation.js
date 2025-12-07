'use client';

import { 
  MapPinIcon, // Changed from LocationMarkerIcon
  ShieldExclamationIcon,
  InformationCircleIcon,
  UserIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function GeolocationPrivacyMap({ data, loading }) {
  const [privacyLevel, setPrivacyLevel] = useState('moderate');
  const [showDetails, setShowDetails] = useState(false);

  const privacyLevels = {
    low: {
      title: "High Accuracy",
      description: "Your location is visible to websites and services",
      accuracy: "Within 100 meters",
      color: "bg-red-100 text-red-800",
      risks: ["Personal tracking", "Targeted ads", "Location profiling"]
    },
    moderate: {
      title: "City Level",
      description: "Only your city is visible to most services",
      accuracy: "Within 5-10 kilometers",
      color: "bg-yellow-100 text-yellow-800",
      risks: ["Regional tracking", "General profiling", "Geoblocking"]
    },
    high: {
      title: "Country Level",
      description: "Only your country is visible",
      accuracy: "Within 100+ kilometers",
      color: "bg-green-100 text-green-800",
      risks: ["Limited tracking", "Country-based services"]
    }
  };

  const currentLevel = privacyLevels[privacyLevel];

  // Extract coordinates from data
  const getCoordinates = () => {
    if (!data?.loc) return { latitude: null, longitude: null };
    const [latitude, longitude] = data.loc.split(',').map(coord => parseFloat(coord.trim()));
    return { latitude, longitude };
  };

  const coordinates = getCoordinates();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Geolocation Privacy Map</h3>
              <p className="text-gray-600 mt-2">Visualize how accurately your location can be determined</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Geolocation Privacy Map
            </h3>
            <p className="text-gray-600 mt-2">
              Visualize how accurately your location can be determined based on your IP: {data?.ip || 'Unknown IP'}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center"
            >
              <InformationCircleIcon className="h-4 w-4 mr-2" />
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Actual Location Display */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl p-6 border border-blue-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPinIcon className="h-5 w-5 mr-2 text-blue-600" />
            Your Actual Location from IP
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Location</div>
              <div className="font-medium text-gray-900">
                {data?.city && data?.country ? `${data.city}, ${data.country}` : 'Unknown'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Coordinates</div>
              <div className="font-medium text-gray-900 font-mono">
                {coordinates.latitude && coordinates.longitude 
                  ? `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`
                  : 'Not available'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Region</div>
              <div className="font-medium text-gray-900">{data?.region || 'Unknown'}</div>
            </div>
          </div>
          {data?.timezone && (
            <div className="text-sm text-gray-600 flex items-center">
              <ClockIcon className="h-4 w-4 mr-2" />
              Timezone: {data.timezone}
            </div>
          )}
        </div>

        {/* Privacy Level Selector */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Adjust Your Privacy Level</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(privacyLevels).map(([level, levelData]) => (
              <button
                key={level}
                onClick={() => setPrivacyLevel(level)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  privacyLevel === level
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-gray-900">{levelData.title}</div>
                  <div className={`px-2 py-1 rounded text-xs ${levelData.color}`}>
                    {level.toUpperCase()}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-3">{levelData.description}</div>
                <div className="text-xs text-gray-500">Accuracy: {levelData.accuracy}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Map Representation */}
        <div className="mb-8 relative">
          <div className="bg-gray-100 rounded-xl h-64 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="absolute left-0 right-0 h-px bg-gray-300" style={{ top: `${i * 10}%` }}></div>
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="absolute top-0 bottom-0 w-px bg-gray-300" style={{ left: `${i * 10}%` }}></div>
                ))}
              </div>
              
              {/* Privacy circles */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* High accuracy circle */}
                {privacyLevel === 'low' && (
                  <div className="absolute w-16 h-16 bg-red-500 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                )}
                
                {/* City level circle */}
                {(privacyLevel === 'low' || privacyLevel === 'moderate') && (
                  <div className="absolute w-32 h-32 bg-yellow-500 rounded-full opacity-15 -translate-x-1/2 -translate-y-1/2"></div>
                )}
                
                {/* Country level circle (always visible) */}
                <div className="absolute w-64 h-64 bg-green-500 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Center point */}
                <div className="relative">
                  <div className="w-6 h-6 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {data?.city || 'Your Location'}
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-sm font-medium text-gray-900 mb-2">Visible Area</div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2 opacity-20"></div>
                    <div className="text-xs text-gray-600">Exact Location</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 opacity-15"></div>
                    <div className="text-xs text-gray-600">City Area</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 opacity-10"></div>
                    <div className="text-xs text-gray-600">Country Area</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{currentLevel.accuracy}</div>
              <div className="text-sm text-gray-600">Visible Accuracy</div>
            </div>
          </div>
        </div>

        {/* Risks and Benefits */}
        {showDetails && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ShieldExclamationIcon className="h-5 w-5 mr-2 text-purple-500" />
              Privacy Implications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                <div className="flex items-center mb-4">
                  <UserIcon className="h-5 w-5 text-red-600 mr-2" />
                  <div className="font-semibold text-red-900">Potential Risks</div>
                </div>
                <ul className="space-y-2">
                  {currentLevel.risks.map((risk, index) => (
                    <li key={index} className="flex items-start text-sm text-red-700">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                <div className="flex items-center mb-4">
                  <BuildingOfficeIcon className="h-5 w-5 text-green-600 mr-2" />
                  <div className="font-semibold text-green-900">Common Uses</div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm text-green-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    Localized search results
                  </li>
                  <li className="flex items-start text-sm text-green-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    Weather information
                  </li>
                  <li className="flex items-start text-sm text-green-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    Language preferences
                  </li>
                  <li className="flex items-start text-sm text-green-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    Regional content access
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* How to Improve */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">How to Improve Location Privacy</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Use VPN</div>
                <div className="text-sm text-gray-600">Mask your IP location effectively</div>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Browser Settings</div>
                <div className="text-sm text-gray-600">Disable location access for websites</div>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Mobile Settings</div>
                <div className="text-sm text-gray-600">Limit app location permissions</div>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Privacy Browsers</div>
                <div className="text-sm text-gray-600">Use browsers with built-in protection</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-500 flex items-center">
          <GlobeAltIcon className="h-4 w-4 mr-2" />
          {data?.ip ? `Location accuracy based on IP: ${data.ip}` : 'Location accuracy varies by ISP, device, and connection type'}
        </div>
      </div>
    </div>
  );
}