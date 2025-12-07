'use client';

import { 
  ServerIcon,
  CpuChipIcon,
  WifiIcon,
  ClockIcon,
  GlobeAltIcon,
  HashtagIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function TechnicalSpecs({ data, loading }) {
  // Process API data
  const processData = () => {
    if (!data) return null;

    // Extract ASN from org field (e.g., "AS15169 Google LLC")
    const extractASN = (org) => {
      if (!org) return 'Unknown';
      const asnMatch = org.match(/AS\d+/);
      return asnMatch ? asnMatch[0] : 'Unknown';
    };

    // Extract organization name
    const extractOrg = (org) => {
      if (!org) return 'Unknown';
      return org.replace(/AS\d+\s*/, '');
    };

    // Determine IP version
    const getIPVersion = (ip) => {
      if (!ip) return 'Unknown';
      return ip.includes(':') ? 'IPv6' : 'IPv4';
    };

    // Parse coordinates
    const parseCoordinates = (loc) => {
      if (!loc) return { lat: null, lng: null };
      const [lat, lng] = loc.split(',').map(coord => parseFloat(coord.trim()));
      return { lat, lng };
    };

    const coordinates = parseCoordinates(data.loc);
    const asn = extractASN(data.org);
    const orgName = extractOrg(data.org);

    return {
      hostname: data.hostname || 'Not available',
      asn: asn,
      org: orgName,
      connection: data.org ? 'ISP Connection' : 'Unknown',
      timezone: data.timezone || 'Unknown',
      utc_offset: data.timezone ? 'Based on timezone' : 'Unknown',
      ip_version: getIPVersion(data.ip),
      isp: orgName,
      latitude: coordinates.lat ? coordinates.lat.toFixed(4) : 'Unknown',
      longitude: coordinates.lng ? coordinates.lng.toFixed(4) : 'Unknown',
      accuracy_radius: 'Approximate',
      reverse_dns: data.hostname ? 'Available' : 'Not available',
      network_type: 'ISP Network',
      ip: data.ip,
      city: data.city,
      country: data.country,
      region: data.region
    };
  };

  const technicalData = processData();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3].map((category) => (
              <div key={category}>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border border-gray-100 rounded-xl p-5">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const specifications = [
    {
      category: "Network Identification",
      items: [
        {
          icon: <ServerIcon className="h-5 w-5" />,
          label: "IP Address",
          value: technicalData?.ip || 'Not detected',
          description: "Public Internet Protocol address"
        },
        {
          icon: <CpuChipIcon className="h-5 w-5" />,
          label: "AS Number",
          value: technicalData?.asn || 'Unknown',
          description: "Autonomous System Number"
        },
        {
          icon: <BuildingLibraryIcon className="h-5 w-5" />,
          label: "ISP / Organization",
          value: technicalData?.org || 'Unknown',
          description: "Internet Service Provider"
        }
      ]
    },
    {
      category: "Location & Connection",
      items: [
        {
          icon: <GlobeAltIcon className="h-5 w-5" />,
          label: "IP Version",
          value: technicalData?.ip_version || 'Unknown',
          description: "Internet Protocol version"
        },
        {
          icon: <WifiIcon className="h-5 w-5" />,
          label: "Connection Type",
          value: technicalData?.connection || 'Unknown',
          description: "Network infrastructure"
        },
        {
          icon: <ClockIcon className="h-5 w-5" />,
          label: "Timezone",
          value: technicalData?.timezone || 'Unknown',
          description: "Geolocation timezone"
        }
      ]
    },
    {
      category: "Geolocation Data",
      items: [
        {
          icon: <MapPinIcon className="h-5 w-5" />,
          label: "Location",
          value: technicalData?.city && technicalData?.country 
            ? `${technicalData.city}, ${technicalData.country}`
            : 'Unknown',
          description: "City and country"
        },
        {
          icon: <HashtagIcon className="h-5 w-5" />,
          label: "Coordinates",
          value: technicalData?.latitude && technicalData?.longitude
            ? `${technicalData.latitude}, ${technicalData.longitude}`
            : 'Not available',
          description: "Geographic coordinates"
        },
        {
          icon: <ShieldCheckIcon className="h-5 w-5" />,
          label: "Network Type",
          value: technicalData?.network_type || 'Unknown',
          description: "IP classification"
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Technical Specifications
            </h3>
            <p className="text-gray-600 mt-2">
              Advanced network routing and registry information for technical users
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
              <CpuChipIcon className="h-4 w-4 mr-2" />
              Live Network Data
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {specifications.map((category, categoryIndex) => (
          <div key={categoryIndex} className={`${categoryIndex > 0 ? 'mt-8' : ''}`}>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {category.category}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="border border-gray-100 rounded-xl p-5 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg mr-4">
                      <div className="text-gray-600">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          Live
                        </div>
                      </div>
                      <div className="font-mono text-lg text-gray-800 break-all mt-2">
                        {item.value}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 pl-12">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 mb-4 sm:mb-0">
            <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Technical data provided by IPinfo.io API</span>
          </div>
          <div className="text-xs text-gray-400">
            Detected IP: {technicalData?.ip || 'Not available'}
          </div>
        </div>
      </div>
    </div>
  );
}