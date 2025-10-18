import React from 'react';
import Head from "next/head";
import Script from "next/script";
import Card from '@/constant/Card';
import img01 from '@/public/Untitled-design-1024x1024.webp';
import img02 from '@/public/Untitled-design-2-1024x1024.webp';
import img03 from '@/public/Untitled-design-1-1024x1024.webp';
import img04 from '@/public/hostinger.webp';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

const Domain = () => {
  const cardsData = [
    { image: img01, text: "Save Big With Promo Code Given Below", buttonText: "Save15", link: 'https://domain.mno8.net/Nker32', alt: "Domain.com promo code" },
    { image: img02, text: "Save Big With Promo Code Given Below", buttonText: "Nameboy", link: 'https://namecheap.pxf.io/EKoANe', alt: "Namecheap promo code" },
    { image: img03, text: "Save Big With Promo Code Given Below", buttonText: "NEWCOM598", link: 'https://name.sjv.io/LX5Q3Y', alt: "Name.com promo code" },
    { image: img04, text: "Save Big With Promo Code Given Below", buttonText: "hostinger", link: 'https://hostinger.sjv.io/rnV05j', alt: "Hostinger domain offer" },
  ];

  return (
    <>
      {/* ✅ SEO Meta + Schema for SERP */}
      <Head>
        <title>Best Domain Registration Offers 2025 | Save Big with Promo Codes — BrandoraLab</title>
        <meta
          name="description"
          content="Get exclusive domain registration discounts with verified promo codes from Domain.com, Namecheap, Hostinger, and more. Register your dream domain affordably with BrandoraLab’s trusted partners."
        />
        <meta
          name="keywords"
          content="domain registration, buy domain name, Namecheap promo, Domain.com coupon, Hostinger domain offer, BrandoraLab domains"
        />
        <meta property="og:title" content="Best Domain Registration Offers 2025 | BrandoraLab" />
        <meta property="og:description" content="Compare and save on domain registrations from top providers — Domain.com, Namecheap, Hostinger & more. Verified promo codes included." />
        <meta property="og:image" content="https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/domain-registration-banner.webp" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://brandoralab.com/domain" />
      </Head>

      {/* ✅ Breadcrumb Schema */}
      <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://brandoralab.com" },
            { "@type": "ListItem", position: 2, name: "Domain Partners", item: "https://brandoralab.com/domain" },
          ],
        })}
      </Script>

      {/* ✅ Offer List Schema */}
      <Script id="offers-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Domain Registration Offers 2025",
          itemListElement: cardsData.map((card, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: card.buttonText,
            url: card.link,
            description: "Domain registration offer and promo code available via BrandoraLab’s partner links.",
          })),
        })}
      </Script>

      {/* ✅ Organization Schema */}
      <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BrandoraLab",
          url: "https://brandoralab.com",
          logo: "https://brandoralab.com/logo.png",
          sameAs: [
            "https://www.linkedin.com/company/brandoralab",
            "https://twitter.com/brandoralab",
          ],
        })}
      </Script>

      {/* ✅ Page Content (unchanged layout) */}
      <div>
        <div className="pt-10">
          <Header />
        </div>

        <main role="main">
          <div className="relative px-6 mt-10 mb-10 md:mt-20 mx-auto max-w-5xl text-center">
            <h1 className="block w-full text-black font-bold text-3xl sm:text-4xl">
              Best Domain Registration Deals — Save Big in 2025
            </h1>
            <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
              Find your perfect domain at unbeatable prices. Explore exclusive offers and promo codes from BrandoraLab’s trusted partners — Domain.com, Namecheap, Name.com, and Hostinger.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 p-4 mb-10">
            {cardsData.map((card, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                <Card link={card.link}>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    loading="lazy"
                    className="w-full h-full object-contain"
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                </Card>
                <div className="text-center mt-4">
                  <strong className="block mb-2">{card.text}</strong>
                  <Link
                    href={card.link}
                    target="_blank"
                    className="px-4 py-1 w-full bg-gradient-to-r from-indigo-400 to-pink-600 text-white font-bold rounded-full"
                    aria-label={`Get promo code ${card.buttonText} for domain offers`}
                  >
                    {card.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Domain;
