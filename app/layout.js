import { Inter } from "next/font/google";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup"; // ← ADD THIS IMPORT

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brandora Lab",
  description: "Brandora Lab is a digital agency offering services like web development, SEO, digital marketing, and video editing.",
  keywords: "digital agency, web development, SEO, digital marketing, video editing, blogs, Hosting, Domain, hosting tutorial, Domain tutorial,",
  author: "Brandora Lab",
  robots: "index, follow",
  icons: {
    icon: ['/favicon.png?v=4'],
    apple: ['/favicon.png?v=4'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />

        {/* Preload Keen Slider CSS */}
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.css" async as="style" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.css" async media="print" />
        
        {/* Bing search verification */}
        <meta name="msvalidate.01" content="AA411660E6AE8993F02C8D8121B70546" />
        {/* Google search verification */}
        <meta name="google-site-verification" content="mZSMz06ltjtJcV2zHs99bK21oUWsCvUA9_pJYstYYsQ" />

        {/* 🚀 ADD SCHEMA MARKUP HERE */}
        <SchemaMarkup />

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}