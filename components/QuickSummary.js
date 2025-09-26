// components/QuickSummary.js
import React from "react";
import { CheckCircle, Zap, Star, Info } from "lucide-react";

const QuickSummary = ({ intro, points = [] }) => {
  return (
    <section className="w-full py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Quick Summary
        </h2>

        {/* Intro Paragraph */}
        {intro && (
          <p className="text-center text-gray-700 mb-8 text-lg max-w-3xl mx-auto">
            {intro}
          </p>
        )}

        {/* Bullet Highlights */}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="mb-3 text-indigo-600">
                {point.icon || <Info className="w-7 h-7" />}
              </div>
              <p className="text-gray-700 text-base font-medium">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickSummary;