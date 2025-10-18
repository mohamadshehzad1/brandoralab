'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from '@/components/FAQ';
import Concern from '@/components/Concern';
import Content from '@/components/Content';
import VPNBenifits from '@/components/VPNBenifits';
import Loader from '@/components/Loader';
import Link from 'next/link';

// Fetch IP details from API
const fetchIpDetails = async (ip) => {
  const res = await fetch(`https://ipinfo.io/${ip}?token=ff54dabd6117c7`);
  const data = await res.json();
  return data;
};

export default function IpLookup() {
  const [ipAddress, setIpAddress] = useState('');
  const [ipDetails, setIpDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ipAddress) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchIpDetails(ipAddress);
      if (data.error) setError(data.error.message);
      else setIpDetails(data);
    } catch {
      setError('An error occurred while fetching data.');
    }
    setLoading(false);
  };

  // JSON-LD Schemas
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free IP Lookup Tool",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    description:
      "Find detailed information about any IP address including ISP, location, timezone, and more with BrandoraLab’s free IP Lookup Tool.",
    url: "https://brandoralab.com/free-tools/iplookup/",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "BrandoraLab",
      url: "https://brandoralab.com",
      logo: { "@type": "ImageObject", url: "https://brandoralab.com/logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://brandoralab.com/" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://brandoralab.com/free-tools" },
      { "@type": "ListItem", position: 3, name: "IP Lookup", item: "https://brandoralab.com/free-tools/iplookup" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does the IP Lookup Tool do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The IP Lookup Tool by BrandoraLab allows you to find the ISP, city, region, and timezone of any IP address instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Is the IP Lookup Tool free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our IP Lookup Tool is completely free and doesn’t require registration or installation.",
        },
      },
      {
        "@type": "Question",
        name: "Does BrandoraLab track or store my IP searches?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, BrandoraLab respects your privacy. We never store or track any IP lookups performed using this tool.",
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Free IP Lookup Tool | Instantly Find IP Address Info | BrandoraLab</title>
        <meta
          name="description"
          content="Use BrandoraLab’s free IP Lookup Tool to find detailed IP address information — including location, ISP, and timezone. Fast, accurate, and completely private."
        />
        <meta
          name="keywords"
          content="IP lookup, IP address lookup, IP info tool, find IP, IP finder, IP location tool"
        />
        <link rel="canonical" href="https://brandoralab.com/free-tools/iplookup/" />
        <meta property="og:title" content="Free IP Lookup Tool | BrandoraLab" />
        <meta
          property="og:description"
          content="Find IP address details including ISP, country, region, and timezone instantly with BrandoraLab’s free IP Lookup Tool."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <div className="pt-10">
        <Header />
      </div>

      {/* Centered Breadcrumb */}
      <nav className="text-center text-xs text-gray-500 mt-4 mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-2">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/free-tools" className="hover:text-blue-600">Free Tools</Link></li>
          <li>/</li>
          <li className="text-gray-700 font-medium">IP Lookup</li>
        </ol>
      </nav>

      {/* Original Tool UI — unchanged */}
      <div className={`relative ${ipDetails ? 'mb-32' : 'mb-5'} bg-gray-100`}>
        <div className="absolute inset-x-0 bottom-0">
          <svg viewBox="0 0 224 12" fill="currentColor" className="w-full -mb-1 text-white" preserveAspectRatio="none">
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>

        <div className="px-4 pb-16 pt-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-5">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <h2 className="mb-6 font-sans text-4xl text-center font-bold tracking-tight text-black sm:text-4xl sm:leading-none">
              Find Details <br className="hidden md:block" /> Quickly and{' '}
              <span className="relative inline-block px-2">
                <div className="absolute inset-0 transform -skew-x-12 bg-blue-500" />
                <span className="relative text-white">Accurately</span>
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-center text-gray-500 sm:mt-5 md:my-5">
              Enter an IP address or domain name to get detailed information including location, timezone, and more.
            </p>

            <form className={`flex flex-col w-full my-10 ${loading ? 'md:mb-16' : 'md:mb-36'} md:flex-row md:px-16`} onSubmit={handleSearch}>
              <div className='w-full'>
                <input
                  placeholder="Enter IP address or domain"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  required
                  type="text"
                  className="flex-grow w-full h-12 px-4 mb-3 text-black border-2 border-gray-200 rounded focus:border-blue-500 focus:outline-none"
                />
                {error && <p className="text-red-500 text-start hidden md:block mt-2">{error}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:shadow-lg transition"
                >
                  Search
                </button>
                {error && <p className="text-red-500 text-start block md:hidden mt-2">{error}</p>}
              </div>
            </form>

            {loading && <Loader />}

            {ipDetails && !loading && !error && (
              <div className="absolute left-1/2 transform -translate-x-1/2 md:-translate-y-24 rounded-3xl bg-gradient-to-r from-purple-400 to-blue-500 w-full px-10 py-7 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['ip', 'city', 'region', 'country', 'postal', 'timezone'].map((key) => (
                    <div key={key} className="p-3 border rounded-2xl border-opacity-30 border-white">
                      <h2 className="font-bold text-white capitalize">{key}</h2>
                      <p className="text-white">{ipDetails?.[key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contextual SEO Section */}
<section className="relative max-w-5xl mx-auto px-6 py-16 mt-10 text-center bg-gradient-to-b from-gray-50 to-white border border-gray-100 rounded-3xl shadow-sm">
  {/* Decorative background glow */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-60 blur-3xl rounded-3xl"></div>

  {/* Title */}
  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
    Free IP Lookup Tool — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Instantly Find Your IP Address</span>
  </h2>

  {/* Description */}
  <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
    Use <span className="font-semibold text-gray-800">BrandoraLab’s IP Lookup</span> to instantly view your public IP address, 
    geolocation, ISP, and network details. Our tool delivers accurate, real-time insights with complete privacy — 
    built for professionals and everyday users.
  </p>

  {/* Divider */}
  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>

  {/* CTA Buttons */}
  <div className="flex flex-col sm:flex-row justify-center gap-5">
    <Link
      href="/free-tools/ipchecker"
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform duration-200"
    >
      <span className="text-lg">🔍</span> Try Our Free IP Checker
    </Link>

    <Link
      href="/free-tools/dns-propagation"
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-blue-600 border border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all duration-200"
    >
      <span className="text-lg">🌐</span> Check DNS Propagation
    </Link>
  </div>

  {/* Small trust note */}
  <p className="text-gray-500 text-sm mt-8">
    🔒 100% Private • No Tracking • Instant Results
  </p>
</section>


      <Concern ipDetails={ipDetails} />
      <Content />
      <VPNBenifits />
      <FAQ />

      <section className="max-w-3xl mx-auto my-16 px-6 text-center border-t border-gray-200 pt-8">
        <p className="text-gray-700 text-base leading-relaxed">
          Built by <span className="font-semibold text-blue-600">BrandoraLab Experts</span> — 
          specialists in SEO, hosting, and server optimization. Every BrandoraLab tool is designed for speed,
          accuracy, and user privacy.
        </p>
      </section>

      <Footer />
    </>
  );
}
