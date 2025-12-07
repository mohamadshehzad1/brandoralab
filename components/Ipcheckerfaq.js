'use client';

import { 
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ArrowPathIcon,
  LockClosedIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const FAQ = () => {
  const [openSection, setOpenSection] = useState('faqs');
  const [openItems, setOpenItems] = useState(new Set(['faq-0']));

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = {
    faqs: {
      icon: <QuestionMarkCircleIcon className="h-6 w-6" />,
      title: "Frequently Asked Questions",
      subtitle: "Quick answers to common questions about IP addresses",
      items: [
        {
          question: "What is an IP address?",
          answer: "An IP (Internet Protocol) address is a unique numerical label assigned to every device connected to a computer network that uses the Internet Protocol for communication. It serves two main functions: network interface identification and location addressing."
        },
        {
          question: "How does BrandoraLab detect my IP address?",
          answer: "When you visit our IP checker tool, your browser automatically sends a request to our server. This request includes your public IP address, which we display to you. We use secure, encrypted connections (HTTPS) and never store or log your IP address data."
        },
        {
          question: "Is this service really free?",
          answer: "Yes, 100% free. BrandoraLab's IP checker is completely free with no hidden fees, no registration required, and no limitations. We believe in providing valuable tools to help users understand their digital footprint."
        },
        {
          question: "What's the difference between IPv4 and IPv6?",
          answer: "IPv4 uses 32-bit addresses (e.g., 192.168.1.1) allowing about 4.3 billion unique addresses. IPv6 uses 128-bit addresses (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334) providing essentially unlimited addresses. IPv6 also offers improved security and performance features."
        },
        {
          question: "Why does my IP location show a different city?",
          answer: "IP geolocation is based on ISP data and regional internet registry information, which might not always reflect your exact physical location. Factors like VPN use, mobile networks, or ISP routing can cause location discrepancies. The accuracy is typically within 5-50 kilometers."
        }
      ]
    },
    usage: {
      icon: <ArrowPathIcon className="h-6 w-6" />,
      title: "How to Use This Tool",
      subtitle: "Get the most out of our IP checker with these tips",
      items: [
        {
          question: "How do I check my IP address?",
          answer: "It's automatic! Just visit our IP checker page and your public IP address, location, and network details will be displayed instantly. No need to click any buttons or enter any information."
        },
        {
          question: "Can I check someone else's IP address?",
          answer: "No, you can only see your own public IP address when you visit our tool. For security and privacy reasons, we don't provide IP lookup services for other addresses. This tool is designed for personal use only."
        },
        {
          question: "How accurate is the geolocation data?",
          answer: "Our geolocation data is typically accurate to city level (within 5-50km). Accuracy depends on your ISP's registration data and network configuration. Mobile networks and VPNs can affect location accuracy."
        },
        {
          question: "Can I use this tool on mobile devices?",
          answer: "Yes! Our IP checker is fully optimized for mobile devices, tablets, and desktops. You'll get the same accurate results and detailed information on any device with a modern web browser."
        },
        {
          question: "How often should I check my IP address?",
          answer: "Most residential users don't need to check frequently as IP addresses typically remain stable. However, you should check if you suspect security issues, when traveling, after changing networks, or when troubleshooting connection problems."
        }
      ]
    },
    protection: {
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      title: "Why Protect Your IP Address",
      subtitle: "Understanding IP privacy and security importance",
      items: [
        {
          question: "Why should I care about my IP address?",
          answer: "Your IP address can reveal your approximate location, internet service provider, and potentially be used to track your online activities. While not personally identifiable by itself, it can be combined with other data to compromise your privacy."
        },
        {
          question: "What are the risks of exposing my IP?",
          answer: "Exposed IP addresses can be targeted for DDoS attacks, used for geoblocking, or combined with other data for profiling. However, simply knowing an IP address doesn't allow access to your device or personal information when proper security measures are in place."
        },
        {
          question: "How can I protect my IP address?",
          answer: "Use a reputable VPN service, connect through a proxy server, use the Tor browser for anonymity, or enable your router's built-in VPN. For most users, a quality VPN service provides the best balance of privacy, security, and performance."
        },
        {
          question: "Is my IP address private when using this tool?",
          answer: "Yes! We don't store, log, or share your IP address. The detection happens in real-time and the data is only displayed to you. We use HTTPS encryption and follow strict privacy policies to protect your information."
        },
        {
          question: "Should I hide my IP address always?",
          answer: "Not necessarily. For everyday browsing, your IP address is usually safe. Consider hiding it when using public WiFi, accessing sensitive information, traveling to countries with restrictive internet policies, or when privacy is a top concern."
        }
      ]
    },
    audience: {
      icon: <UserGroupIcon className="h-6 w-6" />,
      title: "Who Needs This Tool",
      subtitle: "Professional and personal use cases for IP checking",
      items: [
        {
          question: "Who should use an IP checker?",
          answer: "Anyone who wants to understand their online presence, troubleshoot network issues, verify VPN connections, check if their location is being accurately detected, or simply learn about how the internet identifies their device."
        },
        {
          question: "Is this tool useful for remote workers?",
          answer: "Absolutely! Remote workers can verify their VPN is working correctly, check if their location is being properly masked for security, troubleshoot connection issues, and ensure their network settings are correct for secure remote access."
        },
        {
          question: "Can businesses use this tool?",
          answer: "Yes, businesses can use it to verify public IP addresses for firewall configurations, check VPN endpoints, troubleshoot network connectivity, verify geolocation for compliance, and train employees about network security basics."
        },
        {
          question: "Is it helpful for gamers?",
          answer: "Definitely! Gamers can check their NAT type, verify their IP for port forwarding setups, troubleshoot connection issues with game servers, and ensure their location isn't causing region-based restrictions or high latency."
        },
        {
          question: "What about developers and IT professionals?",
          answer: "Developers can use it to test geolocation features, verify API endpoints, check IP-based restrictions, debug network applications, and ensure their applications are correctly detecting user locations for region-specific content."
        }
      ]
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="text-center mb-6">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <InformationCircleIcon className="h-4 w-4 mr-2" />
            Comprehensive Guide
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Everything You Need to Know About IP Addresses
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From basic concepts to professional applications, learn how IP addresses work and how to use them effectively
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {Object.entries(faqData).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setOpenSection(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                openSection === key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Current Section Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <div className="text-blue-600">
                {faqData[openSection].icon}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {faqData[openSection].title}
              </h3>
              <p className="text-gray-600 mt-1">
                {faqData[openSection].subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData[openSection].items.map((item, index) => {
            const itemId = `${openSection}-${index}`;
            const isOpen = openItems.has(itemId);

            return (
              <div
                key={itemId}
                className={`border rounded-xl transition-all duration-200 ${
                  isOpen
                    ? 'border-blue-200 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggleItem(itemId)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-4 ${
                      isOpen ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {isOpen ? (
                        <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                      ) : (
                        <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 text-left">
                      {item.question}
                    </div>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-4 pl-16">
                    <div className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Tips Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <ExclamationTriangleIcon className="h-6 w-6 mr-2 text-amber-500" />
            Quick IP Security Tips
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center mb-2">
                <LockClosedIcon className="h-5 w-5 text-blue-600 mr-2" />
                <div className="font-semibold text-blue-900">Use VPN</div>
              </div>
              <div className="text-sm text-blue-700">
                Always use a VPN on public WiFi to hide your IP and encrypt traffic
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-center mb-2">
                <GlobeAltIcon className="h-5 w-5 text-green-600 mr-2" />
                <div className="font-semibold text-green-900">Check Regularly</div>
              </div>
              <div className="text-sm text-green-700">
                Monitor your IP changes when traveling or using different networks
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <div className="flex items-center mb-2">
                <DevicePhoneMobileIcon className="h-5 w-5 text-purple-600 mr-2" />
                <div className="font-semibold text-purple-900">Mobile Safety</div>
              </div>
              <div className="text-sm text-purple-700">
                Mobile data IPs change frequently but still need protection
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <div className="flex items-center mb-2">
                <BuildingOfficeIcon className="h-5 w-5 text-amber-600 mr-2" />
                <div className="font-semibold text-amber-900">Business Use</div>
              </div>
              <div className="text-sm text-amber-700">
                Enterprises should use static IPs with proper firewall protection
              </div>
            </div>
          </div>
        </div>

        {/* Professional Use Cases */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="md:w-2/3 md:pr-8 mb-6 md:mb-0">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <AcademicCapIcon className="h-6 w-6 mr-2 text-indigo-600" />
                  Professional Applications
                </h4>
                <p className="text-gray-700 mb-4">
                  Our IP checker is used by professionals across various industries:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Network Administrators</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Cybersecurity Experts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Web Developers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Digital Marketers</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Available</div>
                    <div className="text-xs text-gray-500 mt-1">For all professionals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            <strong>Note:</strong> This tool is for educational and informational purposes only. 
            Always respect privacy laws and terms of service when working with IP addresses.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <div className="text-xs text-gray-500 flex items-center">
              <ShieldCheckIcon className="h-4 w-4 mr-1" />
              No data storage
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <LockClosedIcon className="h-4 w-4 mr-1" />
              HTTPS secured
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <UserGroupIcon className="h-4 w-4 mr-1" />
              100% Free
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;