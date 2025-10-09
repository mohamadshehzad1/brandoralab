// app/free-tools/dns-propogation/page.js
"use client";
import React, { useState } from 'react';

export default function DNSPropagationPage() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const dnsServers = [
    { name: "Google DNS", ip: "8.8.8.8", flag: "🇺🇸", location: "Global" },
    { name: "Cloudflare", ip: "1.1.1.1", flag: "🇺🇸", location: "Global" },
    { name: "Quad9", ip: "9.9.9.9", flag: "🇨🇭", location: "Europe" },
    { name: "OpenDNS", ip: "208.67.222.222", flag: "🇺🇸", location: "Global" },
    { name: "Comodo", ip: "8.26.56.26", flag: "🇺🇸", location: "Global" },
    { name: "Verisign", ip: "64.6.64.6", flag: "🇺🇸", location: "Global" },
    { name: "Yandex", ip: "77.88.8.8", flag: "🇷🇺", location: "Russia" },
    { name: "AliDNS", ip: "223.5.5.5", flag: "🇨🇳", location: "China" },
  ];

  // Method 1: Use our own API
  const checkWithOurAPI = async (server, domain, type) => {
    try {
      const response = await fetch(`/api/dns?domain=${encodeURIComponent(domain)}&type=${type}&server=${server.ip}`);
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          resolved: data.resolved,
          records: data.records || [],
          responseTime: data.responseTime,
          message: data.message || "Checked via our API"
        };
      } else {
        throw new Error(data.error || "API check failed");
      }
    } catch (error) {
      throw new Error(`Our API: ${error.message}`);
    }
  };

  // Method 2: Use public DNS-over-HTTPS
  const checkWithDoH = async (provider, domain, type) => {
    const dohProviders = [
      {
        name: "Google DoH",
        url: `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`,
      },
      {
        name: "Cloudflare DoH", 
        url: `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
      },
      {
        name: "Quad9 DoH",
        url: `https://dns.quad9.net/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
      }
    ];

    for (let doh of dohProviders) {
      try {
        const response = await fetch(doh.url, {
          headers: { 'Accept': 'application/dns-json' }
        });
        
        if (response.ok) {
          const data = await response.json();
          return {
            success: true,
            resolved: data.Status === 0 && data.Answer && data.Answer.length > 0,
            records: data.Answer || [],
            responseTime: 0, // DoH doesn't give us response time easily
            message: `Checked via ${doh.name}`
          };
        }
      } catch (error) {
        continue; // Try next DoH provider
      }
    }
    
    throw new Error("All DoH providers failed");
  };

  // Method 3: Fallback to external API (rares.eu)
  const checkWithExternalAPI = async (server, domain, type) => {
    try {
      // Map server names to the format expected by rares.eu API
      const serverMap = {
        "Google DNS": "google",
        "Cloudflare": "cloudflare", 
        "Quad9": "quad9",
        "OpenDNS": "opendns",
        "Comodo": "comodo",
        "Verisign": "verisign",
        "Yandex": "yandex", 
        "AliDNS": "alidns"
      };

      const apiServer = serverMap[server.name] || "google";
      const url = `https://projects.rares.eu/dns/${type.toLowerCase()}/${encodeURIComponent(domain)}?dns=${apiServer}`;
      
      const response = await fetch(url);
      const data = await response.json();

      const answers = data?.Answer || data?.answer || data?.Answers || [];
      const resolved = Array.isArray(answers) && answers.length > 0;

      return {
        success: true,
        resolved,
        records: answers,
        responseTime: 0,
        message: "Checked via external API"
      };
    } catch (error) {
      throw new Error(`External API: ${error.message}`);
    }
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      setError("Please enter a domain name");
      return;
    }

    // Basic domain validation
    const cleanDomain = domain.trim().replace(/^https?:\/\//, '').split('/')[0];
    if (!cleanDomain.includes('.') || cleanDomain.length < 4) {
      setError("Please enter a valid domain name");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setProgress(0);

    try {
      const results = [];
      const totalServers = dnsServers.length;

      for (let i = 0; i < dnsServers.length; i++) {
        const server = dnsServers[i];
        const startTime = performance.now();
        
        let result;
        
        // Try methods in order of preference
        try {
          // Method 1: Our own API
          result = await checkWithOurAPI(server, cleanDomain, type);
        } catch (error1) {
          console.log(`Our API failed for ${server.name}, trying DoH...`);
          
          try {
            // Method 2: DNS-over-HTTPS
            result = await checkWithDoH(server, cleanDomain, type);
          } catch (error2) {
            console.log(`DoH failed for ${server.name}, trying external API...`);
            
            try {
              // Method 3: External API (fallback)
              result = await checkWithExternalAPI(server, cleanDomain, type);
            } catch (error3) {
              result = {
                success: false,
                resolved: false,
                records: [],
                error: `All methods failed: ${error3.message}`
              };
            }
          }
        }

        const responseTime = Math.round(performance.now() - startTime);
        
        results.push({
          ...server,
          status: result.success ? (result.resolved ? "resolved" : "not_resolved") : "error",
          records: result.records || [],
          responseTime: result.responseTime || responseTime,
          error: result.error,
          message: result.message
        });

        // Update progress
        setProgress(Math.round(((i + 1) / totalServers) * 100));
        
        // Delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      setResults(results);
    } catch (err) {
      console.error('Main error:', err);
      setError("Failed to check DNS propagation. Please try again.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved": return "border-green-500 bg-green-50";
      case "not_resolved": return "border-yellow-500 bg-yellow-50";
      case "error": return "border-red-500 bg-red-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "resolved": return "✅ Resolved";
      case "not_resolved": return "❌ Not Resolved";
      case "error": return "⚠️ Error";
      default: return "⏳ Checking";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            DNS Propagation Checker
          </h1>
          <p className="text-gray-600">
            Check DNS record propagation across global DNS servers
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleCheck} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter domain (example.com)"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
              
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="p-3 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="A">A Record</option>
                <option value="AAAA">AAAA Record</option>
                <option value="CNAME">CNAME Record</option>
                <option value="MX">MX Record</option>
                <option value="TXT">TXT Record</option>
                <option value="NS">NS Record</option>
              </select>

              <button
                type="submit"
                disabled={loading || !domain.trim()}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[140px]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Checking...
                  </div>
                ) : (
                  "Check DNS"
                )}
              </button>
            </div>
          </form>

          {loading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Checking DNS servers...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Results for {domain} ({type} Record)
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-green-600">
                  {results.filter(r => r.status === 'resolved').length}
                </div>
                <div className="text-sm text-green-600">Resolved</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-yellow-600">
                  {results.filter(r => r.status === 'not_resolved').length}
                </div>
                <div className="text-sm text-yellow-600">Not Resolved</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-red-600">
                  {results.filter(r => r.status === 'error').length}
                </div>
                <div className="text-sm text-red-600">Errors</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-blue-600">
                  {results.length}
                </div>
                <div className="text-sm text-blue-600">Total</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-4 ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">{result.flag}</div>
                      <div>
                        <h3 className="font-semibold">{result.name}</h3>
                        <p className="text-sm text-gray-600">{result.location}</p>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${getStatusColor(result.status)}`}>
                      {getStatusText(result.status)}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-2">IP: {result.ip}</p>
                  
                  {result.responseTime && (
                    <p className="text-sm text-gray-600">Time: {result.responseTime}ms</p>
                  )}
                  
                  {result.message && (
                    <p className="text-xs text-gray-500 mt-1">{result.message}</p>
                  )}
                  
                  {result.error && (
                    <p className="text-xs text-red-600 mt-1">Error: {result.error}</p>
                  )}
                  
                  {result.records && result.records.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-1">Records:</p>
                      {result.records.slice(0, 2).map((record, idx) => (
                        <div key={idx} className="text-xs font-mono bg-gray-100 p-1 rounded mb-1">
                          {record.data || record.address || JSON.stringify(record)}
                        </div>
                      ))}
                      {result.records.length > 2 && (
                        <p className="text-xs text-gray-500">+{result.records.length - 2} more</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}