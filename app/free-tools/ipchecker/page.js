import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import IpDetails from "@/components/IpDetails";
import IPLocation from "@/components/IPLocation";
import ProtectIP from "@/components/ProtectIP";
import Link from "next/link";

export default function IPCheckerPage() {
  // JSON-LD: Tool schema
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IP Checker Tool",
    operatingSystem: "All",
    applicationCategory: "UtilityApplication",
    description:
      "Check your public IP address instantly and get detailed network information including ISP, city, region, and more with BrandoraLab’s free IP Checker tool.",
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
          text: "Your IP address is a unique identifier assigned to your device when you connect to the internet. Use BrandoraLab’s IP Checker to see it instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Is BrandoraLab’s IP Checker free?",
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
        name: "IP Checker",
        item: "https://brandoralab.com/free-tools/ipchecker",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Free IP Checker Tool | What Is My IP Address | BrandoraLab</title>
        <meta
          name="description"
          content="Instantly check your public IP address and get detailed network data including location, ISP, and more. 100% free IP Checker by BrandoraLab."
        />
        <meta
          name="keywords"
          content="IP checker, what is my IP, check IP address, IP lookup tool, find IP online, free IP checker"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://brandoralab.com/free-tools/ipchecker/"
        />

        {/* Open Graph / Twitter */}
        <meta property="og:title" content="Free IP Checker Tool | BrandoraLab" />
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(toolSchema),
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

      {/* Header */}
      <div className="pt-10">
        <Header />
      </div>

      {/* Breadcrumbs */}
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
      {/* Tool Components */}
      <IpDetails />
            <section className="max-w-3xl mx-auto text-center px-6 mt-10 mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Free IP Checker Tool — Instantly Find Your IP Address
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Use BrandoraLab’s IP Checker to instantly view your public IP address,
          geolocation, ISP, and network details. Fast, accurate, and completely
          private.
        </p>
      </section>
      <ProtectIP />
      <IPLocation />
      <FAQ />

      {/* E-E-A-T / Author Section */}
      <section className="max-w-3xl mx-auto my-16 px-6 text-center border-t border-gray-200 pt-8">
        <p className="text-gray-700 text-base leading-relaxed">
          Built by{" "}
          <span className="font-semibold text-blue-600">BrandoraLab Experts</span>,
          specialists in web hosting, SEO, and server performance testing. Every
          BrandoraLab tool is designed to be accurate, transparent, and privacy-first.
        </p>
      </section>

      <Footer />
    </>
  );
}
