import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Globe,
  Search,
  Network,
  Rocket,
  Sparkles
} from "lucide-react"; // Lucide icons

const ToolsPage = () => {
  const cardsData = [
    {
      icon: <Rocket className="w-8 h-8 text-white" />,
      title: "AI Hosting Recommender",
      description:
        "Find your perfect web hosting match with our AI-powered quiz. Get personalized recommendations based on your needs, budget, and technical level.",
      url: "https://brandoralab.com/free-tools/hosting-recommender/",
      bg: "from-purple-500 to-pink-500",
      featured: true
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "IP Checker",
      description:
        "Quickly identify your public IP address and view essential network details — ideal for diagnostics and security checks.",
      url: "https://brandoralab.com/free-tools/ipchecker/",
      bg: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "IP Lookup",
      description:
        "Discover detailed information about any IP address, including geolocation, timezone, and ISP data.",
      url: "https://brandoralab.com/free-tools/iplookup/",
      bg: "from-green-500 to-teal-500",
    },
    {
      icon: <Network className="w-8 h-8 text-white" />,
      title: "DNS Propagation Checker",
      description:
        "Check DNS propagation globally to verify if your domain's DNS updates are live and consistent worldwide.",
      url: "https://brandoralab.com/free-tools/dns-propagation/",
      bg: "from-orange-500 to-red-500",
    },
  ];

  // JSON-LD Schemas
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Online Tools by BrandoraLab",
    description:
      "Access free online tools including AI Hosting Recommender, IP Checker, IP Lookup, and DNS Propagation Checker to analyze and troubleshoot web infrastructure.",
    url: "https://brandoralab.com/free-tools",
    itemListElement: cardsData.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: card.title,
      url: card.url,
      description: card.description,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are BrandoraLab tools free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all BrandoraLab tools are 100% free with no registration required.",
        },
      },
      {
        "@type": "Question",
        name: "Do these tools work on all devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, every tool is mobile-friendly and optimized for performance across all browsers.",
        },
      },
      {
        "@type": "Question",
        name: "Can I share these tools on my website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Of course! Feel free to share or link to our free tools — attribution is appreciated.",
        },
      },
      {
        "@type": "Question",
        name: "What is the AI Hosting Recommender?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI Hosting Recommender is an intelligent quiz that analyzes your website needs, budget, and technical requirements to recommend the perfect hosting provider from 30+ options.",
        },
      },
    ],
  };

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
    ],
  };

  return (
    <>
      <Head>
        <title>Free Online Tools - AI Hosting Recommender, IP & DNS Tools | BrandoraLab</title>
        <meta
          name="description"
          content="Use BrandoraLab's free online tools — AI Hosting Recommender, IP Checker, IP Lookup, and DNS Propagation Checker. Trusted by developers, SEO experts, and network admins worldwide."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Free Online Tools - AI Hosting Recommender, IP & DNS Tools | BrandoraLab" />
        <meta
          property="og:description"
          content="Free online tools from BrandoraLab: AI Hosting Recommender, IP Checker, IP Lookup, and DNS Propagation Checker for fast and accurate diagnostics."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brandoralab.com/free-tools" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif"
        />
        <link rel="canonical" href="https://brandoralab.com/free-tools" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>

       <div className="pt-10">
        <Header />
      </div>

      {/* Breadcrumb */}
      <nav className="text-center text-xs text-gray-500 mt-4 mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-2">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/free-tools" className="hover:text-blue-600">Free Tools</Link></li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-6 mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          New: AI Hosting Recommender
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Free Online Tools by BrandoraLab
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          Discover professional-grade tools designed for speed, accuracy, and reliability. 
          Built by hosting and SEO experts to simplify your daily web operations.
        </p>
      </section>

      {/* Featured Tool Banner */}
      <section className="max-w-6xl mx-auto px-6 mb-8">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            🚀 Try Our New AI Hosting Recommender
          </h2>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
            Take our 2-minute AI-powered quiz to find your perfect hosting match from 30+ providers. 
            Get personalized recommendations based on your specific needs.
          </p>
          <Link
            href="https://brandoralab.com/free-tools/hosting-recommender/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            <Rocket className="w-5 h-5" />
            Start AI Quiz
          </Link>
        </div>
      </section>

      {/* Tools Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 px-6 mb-20">
        {cardsData.map((card, index) => (
          <Link
            key={index}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group border border-gray-200 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 ${
              card.featured ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
            }`}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div
                className={`w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r ${card.bg} ${
                  card.featured ? 'ring-2 ring-white ring-opacity-50' : ''
                }`}
              >
                {card.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600">
                {card.title}
                {card.featured && (
                  <span className="inline-block ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                {card.description}
              </p>
              <div className="mt-4 text-blue-600 font-medium text-sm group-hover:underline">
                Use Tool →
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Tools Categories */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI & Hosting Tools</h3>
              <p className="text-gray-600 text-sm">Smart tools for hosting selection and optimization</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Network Tools</h3>
              <p className="text-gray-600 text-sm">IP analysis and network diagnostics</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Network className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">DNS Tools</h3>
              <p className="text-gray-600 text-sm">Domain and DNS management utilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Author / Trust Section */}
      <section className="max-w-3xl mx-auto mb-16 px-6 text-center border-t border-gray-200 pt-8">
        <p className="text-gray-700 text-base">
          Developed and maintained by{" "}
          <span className="font-semibold text-blue-600">
            BrandoraLab Experts
          </span>{" "}
          — combining real-world hosting, SEO, and performance testing experience 
          to deliver tools you can trust.
        </p>
      </section>

      <Footer />
    </>
  );
};

export default ToolsPage;