import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Globe,
  Search,
  Network,
} from "lucide-react"; // Lucide icons

const ToolsPage = () => {
  const cardsData = [
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
      bg: "from-purple-500 to-pink-500",
    },
    {
      icon: <Network className="w-8 h-8 text-white" />,
      title: "DNS Propagation Checker",
      description:
        "Check DNS propagation globally to verify if your domain’s DNS updates are live and consistent worldwide.",
      url: "https://brandoralab.com/free-tools/dns-propagation/",
      bg: "from-teal-500 to-cyan-500",
    },
  ];

  // JSON-LD Schemas
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Online Tools by BrandoraLab",
    description:
      "Access free online tools including IP Checker, IP Lookup, and DNS Propagation Checker to analyze and troubleshoot web infrastructure.",
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
        <title>Free Online IP & DNS Tools | BrandoraLab</title>
        <meta
          name="description"
          content="Use BrandoraLab’s free online tools — IP Checker, IP Lookup, and DNS Propagation Checker. Trusted by developers, SEO experts, and network admins worldwide."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Free Online IP & DNS Tools | BrandoraLab" />
        <meta
          property="og:description"
          content="Free online tools from BrandoraLab: IP Checker, IP Lookup, and DNS Propagation Checker for fast and accurate diagnostics."
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

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-6 mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Free Online IP & DNS Tools by BrandoraLab
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Discover professional-grade tools designed for speed, accuracy, and reliability. 
          Built by hosting and SEO experts to simplify your daily web operations.
        </p>
      </section>

      {/* Tools Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mb-20">
        {cardsData.map((card, index) => (
          <Link
            key={index}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-gray-200 rounded-2xl bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r ${card.bg}`}
              >
                {card.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
                {card.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
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
