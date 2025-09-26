import React from "react";

const RatingBreakdown = ({ ratings = [] }) => {
  return (
    <section className="w-full py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
          Rating Breakdown
        </h2>

        <div className="space-y-6">
          {ratings.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-4">
              {/* Category Name */}
              <div className="w-40 font-medium text-gray-700">{item.category}</div>

              {/* Progress Bar */}
              <div className="flex-1 w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-4 bg-indigo-500 rounded-full"
                  style={{ width: `${(item.score / 5) * 100}%` }}
                />
              </div>

              {/* Score */}
              <div className="w-12 text-sm font-semibold text-gray-800 text-right">
                {item.score.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RatingBreakdown;