import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SchemaMarkup from "../components/SchemaMarkup";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brandora Lab",
  description:
    "Brandora Lab is a digital agency offering services like web development, SEO, digital marketing, and video editing.",
  keywords:
    "digital agency, web development, SEO, digital marketing, video editing, blogs, hosting, domain",
  authors: [{ name: "Brandora Lab" }],
  robots: "index, follow",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "mZSMz06ltjtJcV2zHs99bK21oUWsCvUA9_pJYstYYsQ",
    other: {
      "msvalidate.01": "AA411660E6AE8993F02C8D8121B70546",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ---------- EZOIC PRIVACY SCRIPTS ---------- */}
        <Script
          src="https://cmp.gatekeeperconsent.com/min.js"
          strategy="beforeInteractive"
          data-cfasync="false"
        />
        <Script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          strategy="beforeInteractive"
          data-cfasync="false"
       />
       {/* ---------- EZOIC Verification ---------- */}
       <meta name="ezoic-site-verification" content="r0QMAE8flXLoIDq6TJMUjaMfBddMYB" />
        {/* ---------- EZOIC HEADER SCRIPT ---------- */}
        <Script
          src="//www.ezojs.com/ezoic/sa.min.js"
          strategy="beforeInteractive"
        />
        <Script id="ezoic-init" strategy="beforeInteractive">
          {`
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `}
        </Script>

        {/* ---------- ADSENSE ACCOUNT VERIFICATION ---------- */}
        <meta
          name="google-adsense-account"
          content="ca-pub-9280103042501049"
        />

        {/* ---------- SCHEMA MARKUP ---------- */}
        <SchemaMarkup />

        {/* ---------- EXTERNAL CSS ---------- */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.css"
        />
      </head>

      <body className={inter.className}>
        {children}

        {/* ---------- EZOIC AD PLACEMENTS EXAMPLE ---------- */}
        {/* 
          Example placeholders can be added in your pages individually. 
          For instance, on a page you can do:

          <div id="ezoic-pub-ad-placeholder-115"></div>
          <div id="ezoic-pub-ad-placeholder-114"></div>
          <div id="ezoic-pub-ad-placeholder-113"></div>
          <div id="ezoic-pub-ad-placeholder-111"></div>
          <div id="ezoic-pub-ad-placeholder-110"></div>

          <script dangerouslySetInnerHTML={{
            __html: \`
              if(window.ezstandalone) {
                ezstandalone.cmd.push(function() {
                  ezstandalone.showAds(115,114,113,111,110);
                });
              }
            \`
          }}></script>
        */}
      </body>
    </html>
  );
}
