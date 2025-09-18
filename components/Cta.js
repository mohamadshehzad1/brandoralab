"use client";
import React from "react";
import Link from "next/link";

const DealBanner = ({
  heading = "START YOUR BUSINESS WITH MISSHOSTING!",
  offer = "🔥 60% OFF on all plans",
  buttonText = "Get Started Now",
  buttonLink = "#",
  badge = "⚡ Limited Time Offer",
}) => {
  return (
    <div className="flex justify-center items-center py-16 px-6">
      {/* Outer Gradient Border */}
      <Link
        href={buttonLink}
        target="_blank"
        className="no-underline decoration-none bg-gradient-to-r from-blue-500 to-pink-500 p-[2px] rounded-2xl shadow-lg max-w-2xl w-full block transition hover:scale-105 hover:shadow-2xl"
      >
        {/* Inner Card with Light Gradient + Glow */}
        <div className="no-underline decoration-none bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-2xl text-center px-10 py-14 shadow-[0_0_25px_rgba(59,130,246,0.12)] hover:shadow-[0_0_40px_rgba(236,72,153,0.18)] transition">
          
          {/* Badge */}
          <div className="no-underline decoration-none inline-block bg-gradient-to-r from-yellow-300 to-pink-300 text-sm md:text-base font-bold text-black px-6 py-2 rounded-full mb-6 shadow-md animate-pulse">
            {badge}
          </div>

          {/* Heading */}
          <h3 className="no-underline decoration-none text-xl md:text-2xl font-semibold text-gray-700 uppercase tracking-wider mb-4">
            {heading}
          </h3>

          {/* Offer */}
          <p className="no-underline decoration-none text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent mb-8">
            {offer}
          </p>

          {/* CTA Button */}
          <div>
            <span className="no-underline decoration-none inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg md:text-xl px-10 py-4 rounded-full shadow-md hover:scale-110 hover:shadow-2xl transition">
              {buttonText}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DealBanner;
