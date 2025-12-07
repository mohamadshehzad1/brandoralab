'use client';

import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  LockClosedIcon,
  EyeSlashIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

export default function PrivacyScore({ data, loading }) {
  const [score, setScore] = useState(85);
  const [riskFactors, setRiskFactors] = useState([]);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (!data && !loading) {
      setAnimation(true);
      return;
    }

    if (data) {
      setTimeout(() => {
        setAnimation(true);
        
        // Calculate score based on actual data
        let calculatedScore = 100;
        let factors = [];
        
        // Check for proxy, VPN, or Tor indicators in org/hostname
        const org = data.org || '';
        const hostname = data.hostname || '';
        
        // Common VPN/Tor/Proxy indicators
        const vpnIndicators = ['vpn', 'proxy', 'tor', 'anonymous', 'hide', 'privacy'];
        const hostingIndicators = ['google', 'aws', 'azure', 'cloud', 'digitalocean', 'linode', 'hetzner', 'ovh'];
        const ispIndicators = ['comcast', 'verizon', 'att', 'spectrum', 'cox', 'xfinity'];
        
        const orgLower = org.toLowerCase();
        const hostnameLower = hostname.toLowerCase();
        
        // Check for VPN/Proxy/Tor
        const isPrivacyService = vpnIndicators.some(indicator => 
          orgLower.includes(indicator) || hostnameLower.includes(indicator)
        );
        
        // Check for hosting/datacenter
        const isHosting = hostingIndicators.some(indicator => 
          orgLower.includes(indicator) || hostnameLower.includes(indicator)
        );
        
        // Check for regular ISP (higher privacy)
        const isRegularISP = ispIndicators.some(indicator => 
          orgLower.includes(indicator)
        );
        
        // Adjust score based on findings
        if (isPrivacyService) {
          calculatedScore -= 40;
          factors.push("Privacy Service Detected");
        }
        
        if (isHosting) {
          calculatedScore -= 30;
          factors.push("Datacenter/Hosting IP");
        } else if (!isRegularISP && org) {
          calculatedScore -= 15;
          factors.push("Unusual Network");
        }
        
        // Check for mobile network (often dynamic IP)
        if (orgLower.includes('mobile') || orgLower.includes('cellular')) {
          calculatedScore += 5; // Mobile networks often have dynamic IPs (better privacy)
        }
        
        // Ensure score stays within bounds
        calculatedScore = Math.max(20, Math.min(100, calculatedScore));
        
        setScore(calculatedScore);
        setRiskFactors(factors);
      }, 500);
    }
  }, [data, loading]);

  const getScoreColor = (s) => {
    if (s >= 85) return "text-green-600";
    if (s >= 70) return "text-yellow-600";
    if (s >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBgColor = (s) => {
    if (s >= 85) return "bg-green-100";
    if (s >= 70) return "bg-yellow-100";
    if (s >= 50) return "bg-orange-100";
    return "bg-red-100";
  };

  const getScoreLabel = (s) => {
    if (s >= 85) return "Excellent";
    if (s >= 70) return "Good";
    if (s >= 50) return "Fair";
    return "Poor";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-full">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="flex justify-center mb-6">
            <div className="w-40 h-40 bg-gray-200 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Privacy & Security</h3>
          <p className="text-gray-600 text-sm mt-1">Connection safety analysis</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(score)} ${getScoreColor(score)}`}>
          {getScoreLabel(score)}
        </div>
      </div>
      
      {/* Circular Score */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={score >= 85 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444"}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 283} 283`}
              className={`transition-all duration-1000 ${animation ? 'opacity-100' : 'opacity-0'}`}
              style={{ transition: 'stroke-dasharray 1s ease-out' }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-sm text-gray-500">out of 100</div>
          </div>
        </div>
      </div>
      
      {/* Security Status */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Security Status</div>
            <div className="flex items-center">
              {score >= 70 ? (
                <>
                  <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium text-green-700">Secure Connection</span>
                </>
              ) : (
                <>
                  <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-medium text-amber-700">Privacy Concerns</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-700">No data storage</span>
          </div>
          <div className="flex items-center text-sm">
            <EyeSlashIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-700">Anonymous lookup</span>
          </div>
          <div className="flex items-center text-sm">
            <LockClosedIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-700">HTTPS secured</span>
          </div>
        </div>
      </div>
      
      {/* IP Information */}
      <div className="mb-6 bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-500 mb-2">Your Connection</div>
        <div className="text-sm">
          {data?.ip && (
            <div className="flex items-center mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="font-mono text-gray-800">{data.ip}</span>
            </div>
          )}
          {data?.org && (
            <div className="text-gray-600 truncate">
              {data.org}
            </div>
          )}
        </div>
      </div>
      
      {/* Risk Factors */}
      {riskFactors.length > 0 && (
        <div className="pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500 mb-2">Detected Factors</div>
          <div className="space-y-2">
            {riskFactors.map((risk, index) => (
              <div
                key={index}
                className="flex items-center text-amber-700 bg-amber-50 px-3 py-2 rounded-lg text-sm"
              >
                <ExclamationTriangleIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                {risk}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Privacy score based on network analysis of IP: {data?.ip || 'Not detected'}
        </div>
      </div>
    </div>
  );
}