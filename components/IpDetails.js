'use client';

import useIpDetails from '../hooks/useIpDetails';
import useBrowserDetails from '../hooks/useBrowserDetails';
import Loader from './Loader';
import { 
  ComputerDesktopIcon,
  MapPinIcon,
  GlobeAltIcon,
  WifiIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  BuildingLibraryIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  ViewfinderCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const IpDetails = () => {
  const { loading, error, data: ipData } = useIpDetails();
  const { browser, screenSize, cookiesEnabled } = useBrowserDetails();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyIP = () => {
    navigator.clipboard.writeText(ipData?.ip || '');
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <p className="text-red-600 text-lg">Error loading IP details: {error}</p>
        <p className="text-gray-600 mt-2">Please refresh the page or check your connection</p>
      </div>
    );
  }

  const loc = ipData?.loc;
  const [lat, lon] = loc ? loc.split(',') : [];

  const mapUrl = lat && lon
    ? `https://maps.google.com/maps?q=${lat},${lon}&z=10&output=embed`
    : "https://maps.google.com/maps?q=37.7749,-122.4194&z=10&output=embed";

  const networkDetails = [
    {
      title: "ISP Provider",
      value: ipData?.org?.split(' ').slice(1).join(' ') || "Unknown",
      icon: <WifiIcon className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Organization",
      value: ipData?.org?.split(' ')[0] || "N/A",
      icon: <BuildingLibraryIcon className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Timezone",
      value: ipData?.timezone || "Unknown",
      icon: <ClockIcon className="h-5 w-5" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Hostname",
      value: ipData?.hostname || "N/A",
      icon: <DocumentTextIcon className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Browser",
      value: browser,
      icon: <DevicePhoneMobileIcon className="h-5 w-5" />,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Screen Size",
      value: screenSize,
      icon: <ViewfinderCircleIcon className="h-5 w-5" />,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Postal Code",
      value: ipData?.postal || "N/A",
      icon: <EnvelopeIcon className="h-5 w-5" />,
      color: "bg-pink-100 text-pink-600"
    },
    {
      title: "Cookies",
      value: cookiesEnabled ? "Enabled" : "Disabled",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      color: "bg-teal-100 text-teal-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Location Map Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <MapPinIcon className="h-6 w-6 mr-2 text-blue-500" />
                Your Location Details
              </h3>
              <p className="text-gray-600 mt-1">
                Approximate location based on IP geolocation data
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Accuracy: 5-10 km radius
            </div>
          </div>
        </div>
        <div className="relative h-[400px]">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="absolute inset-0"
            title="IP Location Map"
          />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
            <div className="flex items-start">
              <MapPinIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm text-gray-500">Current Location</div>
                <div className="font-semibold text-gray-900">
                  {ipData?.city || "Unknown"}, {ipData?.region || "Unknown"}
                </div>
                <div className="text-sm text-gray-600">{ipData?.country || "Unknown"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Details Grid */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Complete Network Information</h3>
            <p className="text-gray-600 mt-1">Detailed connection and browser data</p>
          </div>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Real-time data
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {networkDetails.map((item, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:border-blue-200 bg-gray-50/50"
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-lg ${item.color.split(' ')[0]} mr-4`}>
                  <div className={item.color.split(' ')[1]}>
                    {item.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 font-medium mb-1">{item.title}</div>
                  <div className="text-lg font-semibold text-gray-900 truncate">
                    {item.value}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              Data updated: Just now • Last checked: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
            <button
              onClick={handleCopyIP}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy All Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IpDetails;