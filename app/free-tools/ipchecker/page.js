'use client';

import { useState } from 'react';
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IPcheckerfaq from "@/components/ipcheckerfaq";
import IpDetails from "@/components/IpDetails";
import PrivacyScore from "@/components/PrivacyScore";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import GeolocationPrivacyMap from "@/components/Geolocation";
import IPv4IPv6Guide from "@/components/IPv4vsIPv6";
import useIpDetails from "@/hooks/useIpDetails";
import Link from "next/link";
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  LockClosedIcon, 
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function IPCheckerPage() {
  const { loading, error, data } = useIpDetails();
  const [copyStatus, setCopyStatus] = useState('Copy IP');

  // JSON-LD: Tool schema (Upgraded to WebApplication)
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "What Is My IP Address Tool",
    operatingSystem: "Any",
    applicationCategory: "NetworkApplication",
    browserRequirements: "Requires JavaScript. Compatible with all major browsers.",
    description: "Check your public IP address instantly and get detailed network information including ISP, city, region, and more with BrandoraLab's free IP Checker tool.",
    url: "https://brandoralab.com/free-tools/ipchecker/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "BrandoraLab",
      url: "https://brandoralab.com",
      logo: {
        "@type": "ImageObject",
        url: "https://brandoralab.com/logo.png",
      },
    },
    featureList: "Public IP detection, ISP Lookup, Geolocation finding, IPv4/IPv6 check",
  };

  // JSON-LD: FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is my IP address?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your IP address is a unique identifier assigned to your device when you connect to the internet. Use BrandoraLab's IP Checker to see it instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Is BrandoraLab's IP Checker free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The IP Checker is 100% free to use — no sign-up or installation required.",
        },
      },
      {
        "@type": "Question",
        name: "Is my IP data stored or tracked?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, BrandoraLab does not store or track IPs. All lookups are performed anonymously and securely.",
        },
      },
    ],
  };

  // JSON-LD: Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://brandoralab.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Free Tools",
        item: "https://brandoralab.com/free-tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "What Is My IP",
        item: "https://brandoralab.com/free-tools/ipchecker",
      },
    ],
  };

  const handleCopyIP = () => {
    if (data?.ip) {
      navigator.clipboard.writeText(data.ip);
      setCopyStatus('Copied!');
      setTimeout(() => {
        setCopyStatus('Copy IP');
      }, 2000);
    }
  };

  return (
    <>
      <Head>
        <title>What Is My IP Address? (Free Instant Check) - BrandoraLab</title>
        <meta
          name="description"
          content="Instantly check your public IP address (IPv4 & IPv6). Get detailed geolocation, ISP, and network data. 100% free and private IP Lookup by BrandoraLab."
        />
        <meta
          name="keywords"
          content="what is my ip, ip address checker, my ip location, check public ip, ipv4 lookup, free ip tool, isp lookup, ip geolocation, my ip info, ip address details, find my ip, find my ip address, ip address lookup tool, post my ip, identify my ip, ip address finder"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://brandoralab.com/free-tools/ipchecker/"
        />

        {/* Open Graph / Twitter */}
        <meta property="og:title" content="What Is My IP Address? - Free Checker Tool" />
        <meta
          property="og:description"
          content="Find your public IP address instantly and view full connection details. Trusted free IP lookup tool by BrandoraLab."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brandoralab.com/free-tools/ipchecker/" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      {/* Header */}
      <div className="pt-10">
        <Header />
      </div>

      {/* Hero Section with Breadcrumbs */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/free-tools" className="hover:text-blue-600 transition-colors duration-200">
                  Free Tools
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-blue-600 font-medium">What Is My IP</li>
            </ol>
          </nav>

          {/* Main Heading */}
          <div className="text-center max-w-4xl mx-auto mb-6">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              100% Free & No Sign-up Required
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              What Is My <span className="text-blue-600">IP Address</span>?
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto">
              Instantly discover your public IP address, location, and network details. 
              Your privacy is protected - we don't store or track your data.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <LockClosedIcon className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">No Data Storage</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <GlobeAltIcon className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">Real-time Detection</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <DevicePhoneMobileIcon className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">Mobile Optimized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Combined IP Display and Privacy Score Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main IP Card (2/3 width) */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Your Public IP Address</h2>
                      <p className="text-blue-100 opacity-90">This is how websites identify you online</p>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <UserGroupIcon className="h-5 w-5 mr-2" />
                      <span>Detecting...</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                      <div>
                        <div className="text-sm text-blue-200 mb-2">IPv4 Address</div>
                        <div className="text-4xl font-bold font-mono tracking-wider break-all">
                          <div className="animate-pulse bg-white/20 h-10 w-64 rounded"></div>
                        </div>
                      </div>
                      <button 
                        disabled
                        className="mt-4 lg:mt-0 px-6 py-3 bg-white/50 text-blue-600 font-semibold rounded-lg transition-colors duration-200 flex items-center shadow-md opacity-50 cursor-not-allowed"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Loading...
                      </button>
                    </div>
                  </div>

                  {/* Loading state for location */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <div className="p-2 bg-white/20 rounded-lg mr-3">
                            <div className="animate-pulse bg-white/30 h-6 w-6 rounded"></div>
                          </div>
                          <div>
                            <div className="text-sm text-blue-200 mb-1">
                              <div className="animate-pulse bg-white/20 h-4 w-16 rounded"></div>
                            </div>
                            <div className="text-xl font-bold">
                              <div className="animate-pulse bg-white/20 h-6 w-24 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-gradient-to-br from-red-600 to-pink-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Error Loading IP Address</h2>
                      <p className="text-red-100 opacity-90">Failed to fetch IP details</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="text-center py-8">
                      <p className="text-xl mb-4">Unable to retrieve IP information.</p>
                      <p className="text-sm text-white/70">Error: {error}</p>
                      <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center shadow-md mx-auto"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Your Public IP Address</h2>
                      <p className="text-blue-100 opacity-90">This is how websites identify you online</p>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <UserGroupIcon className="h-5 w-5 mr-2" />
                      <span>Live Detection</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                      <div>
                        <div className="text-sm text-blue-200 mb-2">IPv4 Address</div>
                        <div className="text-4xl font-bold font-mono tracking-wider break-all">
                          {data?.ip || 'Not available'}
                        </div>
                      </div>
                      <button 
                        onClick={handleCopyIP}
                        className="mt-4 lg:mt-0 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center shadow-md"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {copyStatus}
                      </button>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-white/20 rounded-lg mr-3">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-blue-200">City</div>
                          <div className="text-xl font-bold">{data?.city || 'Unknown'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-white/20 rounded-lg mr-3">
                          <GlobeAltIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-sm text-blue-200">Country</div>
                          <div className="text-xl font-bold">{data?.country || 'Unknown'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-white/20 rounded-lg mr-3">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-blue-200">Region</div>
                          <div className="text-xl font-bold">{data?.region || 'Unknown'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Score Sidebar (1/3 width) */}
          <div className="lg:col-span-1">
            <PrivacyScore data={data} loading={loading} />
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div className="mb-12">
          <IpDetails data={data} loading={loading} />
        </div>

        {/* Network Technical Specifications */}
        <div className="mb-16">
          <TechnicalSpecs data={data} loading={loading} />
        </div>
        {/* Geo Location Map */}
        <div className="mb-16">
          <GeolocationPrivacyMap data={data} loading={loading} />
        </div>

        {/* Ip4 & IP6 Map */}
        <div className="mb-16">
          <IPv4IPv6Guide />
        </div>


        {/* Trust & Statistics Section - Creative Design */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Trusted by Thousands Worldwide
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Users Choose Our IP Checker
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who rely on our accurate, private, and instant IP detection tool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-500">Monthly Active Users</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Trusted by individuals and professionals worldwide for accurate IP detection.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <ChartBarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-gray-500">Accuracy Rate</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Industry-leading precision in IP geolocation and network data detection.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <ClockIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">&lt;1s</div>
                  <div className="text-sm text-gray-500">Instant Results</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Get your IP information instantly with our optimized detection system.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-amber-100 rounded-lg mr-4">
                  <ShieldCheckIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">100%</div>
                  <div className="text-sm text-gray-500">Privacy Focused</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                No data storage or tracking. Your privacy is our priority.
              </p>
            </div>
          </div>


        {/* FAQ Section */}
        <div className="mb-16">
          <IPcheckerfaq />
        </div>




          {/* Expert Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-2/3 lg:pr-8 mb-6 lg:mb-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Built by BrandoraLab Experts
                </h3>
                <p className="text-gray-700 mb-4">
                  Our team of web hosting specialists, network engineers, and cybersecurity experts ensure every tool is:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Accurate & Reliable</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Transparent & Trustworthy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Privacy-First Design</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Continuously Updated</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 text-center lg:text-right">
                <div className="inline-block bg-white px-6 py-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Tool Availability</div>
                  <div className="text-xs text-gray-500 mt-1">Always accessible</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}