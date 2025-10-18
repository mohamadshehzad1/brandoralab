import React from 'react';
import Head from "next/head";
import Script from "next/script";
import Image from 'next/image';
import Card from '@/constant/Card';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Content from '@/components/Content';

// ✅ Your existing imports remain the same
import img01 from '@/public/misshosting.webp';
import img02 from '@/public/Untitled-design-3-1024x1024.webp';
import img03 from '@/public/atsspace.webp';
import img04 from '@/public/chemi.webp';
import img05 from '@/public/shopifyy.webp';
import img06 from '@/public/Scala-Hosting-1024x1024.webp';
import img07 from '@/public/fastcome.webp';
import img08 from '@/public/interserver2000.webp';
import img09 from '@/public/hostinger.webp';
import img10 from '@/public/bluehost-logo-square.webp';

import contentImage01 from '@/public/scalahosting banner.webp';
import contentImage02 from '@/public/blue-host-1.webp';
import contentImage03 from '@/public/mhostingbanner.jpg';
import contentImage04 from '@/public/Hostinger-Banner-1140x570-2.webp';
import contentImage05 from '@/public/Top-Web-Hosting-Provider.webp';
import contentImage06 from '@/public/atsspacebanner.jpg';
import contentImage07 from '@/public/Migrating-Web-Hosting-To-Shopify-ColorWhistle.webp';
import contentImage08 from '@/public/interserver.webp';
import contentImage09 from '@/public/fastcomet.webp';
import contentImage10 from '@/public/chemicloud-review-2022.webp';


const Hosting = () => {
  // Your data arrays (unchanged)
  const dataOne = [
    { img: img06, link: 'https://www.scalahosting.com/#661e37f21eb85', description: 'High-performance and reliable services for your website. Experience unmatched uptime and security with our hosting solutions.' },
    { img: img10, link: 'https://bluehost.sjv.io/c/3675093/1376228/11352', description: 'Trusted by millions worldwide, Bluehost offers 24/7 support and a seamless hosting experience.' },
    { img: img04, link: 'https://chemicloud.com/#660526c05255d', description: 'Secure hosting with great uptime and excellent customer service. Perfect for businesses of all sizes.' },
  ];

  const dataTwo = [
    { img: img03, link: 'http://www.atspace.com?aid=MTkyNDE4MjYyNTI2MjE=', description: 'Fast servers and top-notch support for your business. Ensure your website runs smoothly with ATS Space web hosting.' },
    { img: img02, link: 'https://partners.inmotionhosting.com/nL1GPx', description: 'Affordable plans and excellent service. InMotion Hosting provides reliable hosting solutions for everyone.' },
    { img: img01, link: 'https://tracking.missaffiliate.com/SHga', description: 'Scalable solutions with free SSL and great performance. Misshosting is your go-to hosting provider.' },
  ];

  const dataThree = [
    { img: img05, link: 'https://shopify.pxf.io/ZQdaoK', description: 'E-commerce hosting made easy. Get your online store up and running with Shopify.' },
    { img: img07, link: 'https://affiliate.fastcomet.com/scripts/2wc9ym?a_aid=659e4ffcaedda', description: 'Global reach with secure infrastructure. FastComet ensures your website is always online.' },
    { img: img08, link: 'https://www.interserver.net/r/899620', description: 'Flexible plans with unlimited storage. InterServer provides everything you need for your website.' },
    { img: img09, link: 'https://hostinger.sjv.io/rnV05j', description: 'High-speed and user-friendly hosting solutions. Hostinger makes website management a breeze.' },
  ];

  const contentData = [
    {
      title: "Scala Hosting",
      imageUrl: contentImage01,
      content: "Scala Hosting offers a range of hosting solutions with excellent customer support and performance. Their unique SPanel simplifies server management, providing an alternative to cPanel. VPS plans are known for high speed and reliability, backed by strong security for business sites.",
      btnText: "Visit Scala Hosting",
      btnLink: "https://www.scalahosting.com/#661e37f21eb85"
    },
    {
      title: "Bluehost: Is it Worth It?",
      imageUrl: contentImage02,
      content: "Bluehost, recommended by WordPress, offers great performance, free domain, SSL, and reliable support. Ideal for beginners and small businesses looking for easy setup and strong uptime.",
      btnText: "Visit Bluehost",
      btnLink: "https://bluehost.sjv.io/c/3675093/1376228/11352"
    },
    {
      title: "Miss Hosting: A New Player in Hosting",
      imageUrl: contentImage03,
      content: "Miss Hosting is known for fast servers and excellent customer support. With daily backups, free migration, and free domain, it’s ideal for businesses seeking reliable hosting with great value.",
      btnText: "Visit Miss Hosting",
      btnLink: "https://tracking.missaffiliate.com/SHga"
    },
    {
      title: "Hostinger: Affordable and Reliable",
      imageUrl: contentImage04,
      content: "Hostinger delivers affordable, reliable, and fast hosting. Their interface is intuitive, support is excellent, and their uptime is impressive — perfect for beginners and pros alike.",
      btnText: "Visit Hostinger",
      btnLink: "https://hostinger.sjv.io/rnV05j"
    },
    {
      title: "Top Web Hosting Providers",
      imageUrl: contentImage05,
      content: "BrandoraLab compares the best web hosting providers — Bluehost, Hostinger, Scala Hosting, and more. Find balanced performance, security, and pricing for your website needs.",
      btnText: "Visit Inmotion",
      btnLink: "https://partners.inmotionhosting.com/nL1GPx"
    },
    {
      title: "What is ATS Space Hosting?",
      imageUrl: contentImage06,
      content: "ATS Space offers managed hosting with enterprise-grade reliability. Ideal for critical business websites requiring speed, scalability, and expert 24/7 support.",
      btnText: "Visit ATS Space Web Hosting",
      btnLink: "http://www.atspace.com?aid=MTkyNDE4MjYyNTI2MjE="
    },
    {
      title: "Migrating to Shopify",
      imageUrl: contentImage07,
      content: "Shopify powers millions of online stores with fast, secure hosting and powerful commerce tools. Easily migrate your business to Shopify’s ecosystem.",
      btnText: "Visit Shopify",
      btnLink: "https://shopify.pxf.io/ZQdaoK"
    },
    {
      title: "InterServer: Consistent and Affordable",
      imageUrl: contentImage08,
      content: "InterServer delivers dependable hosting at locked-in pricing. Great for long-term users looking for stability, free migration, and excellent support.",
      btnText: "Visit InterServer",
      btnLink: "https://www.interserver.net/r/899620"
    },
    {
      title: "FastComet: Speed and Reliability",
      imageUrl: contentImage09,
      content: "FastComet offers high-speed global hosting with SSD storage, free daily backups, and unmatched support — perfect for global businesses.",
      btnText: "Visit FastComet",
      btnLink: "https://affiliate.fastcomet.com/scripts/2wc9ym?a_aid=659e4ffcaedda"
    },
    {
      title: "ChemiCloud: Reliable and Fast Hosting",
      imageUrl: contentImage10,
      content: "ChemiCloud stands out with its ultra-fast, SSD-powered hosting and exceptional customer support, perfect for WordPress and business websites.",
      btnText: "Visit ChemiCloud",
      btnLink: "https://chemicloud.com/#660526c05255d"
    }
  ];

  return (
    <>
      {/* ✅ SEO + JSON-LD */}
      <Head>
        <title>Best Web Hosting Providers 2025 — Reviews & Comparison | BrandoraLab</title>
        <meta
          name="description"
          content="Compare top web hosting providers in 2025. Expert reviews of Bluehost, Hostinger, Scala Hosting, and more. Discover uptime, pricing, and deals to choose the best host for your website."
        />
        <meta
          name="keywords"
          content="best web hosting, web hosting reviews, Bluehost review, Hostinger, Scala Hosting, BrandoraLab"
        />
        <link rel="canonical" href="https://brandoralab.com/hosting" />
        <meta property="og:title" content="Best Web Hosting Providers 2025 — BrandoraLab" />
        <meta property="og:description" content="Find the best web hosting providers in 2025. BrandoraLab’s experts compare speed, uptime, support, and deals for top hosting companies." />
        <meta property="og:image" content="https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif" />
        <meta property="og:type" content="article" />
      </Head>

      <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://brandoralab.com" },
            { "@type": "ListItem", position: 2, name: "Web Hosting", item: "https://brandoralab.com/hosting" },
          ],
        })}
      </Script>

      <Script id="itemlist-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Top Web Hosting Providers 2025",
          itemListElement: dataOne.concat(dataTwo, dataThree).map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.description.split('.')[0],
            url: item.link,
          })),
        })}
      </Script>

      <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BrandoraLab",
          url: "https://brandoralab.com",
          logo: "https://brandoralab.com/logo.png",
          sameAs: [
            "https://twitter.com/brandoralab",
            "https://www.linkedin.com/company/brandoralab",
          ],
        })}
      </Script>

      {/* ✅ Actual Page UI (unchanged) */}
      <div className="pt-10">
        <Header />
      </div>

      <main role="main">
        <div className="relative px-6 mt-10 mb-10 md:mt-20 mx-auto max-w-5xl text-center">
          <h1 className="block w-full text-black font-bold text-3xl sm:text-4xl">
            Best Web Hosting Providers 2025 — Expert Reviews
          </h1>
          <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
            Compare leading hosting services with real-world tests by BrandoraLab experts. Choose the best fit for your website performance and budget.
          </p>
        </div>

        {[dataOne, dataTwo, dataThree].map((group, i) => (
          <div key={i} className="flex flex-wrap justify-center gap-4 p-4 mb-10">
            {group.map((item, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                <Card link={item.link}>
                  <Image
                    src={item.img}
                    alt={`${item.description.split('.')[0]} logo`}
                    fill
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </Card>
                <div className="p-4 text-center">
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}

        {contentData.map((item, index) => (
          <Content
            key={index}
            title={item.title}
            imageUrl={item.imageUrl}
            content={item.content}
            btnText={item.btnText}
            btnLink={item.btnLink}
          />
        ))}
      </main>

      <Footer />
    </>
  );
};

export default Hosting;
