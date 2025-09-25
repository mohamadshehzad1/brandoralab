// components/ProsConsCard.js
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const ProsConsCard = ({ pros = [], cons = [], title = "Pros and Cons" }) => {
  return (
    <section className="w-full py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Cards Wrapper */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pros */}
          <div className="bg-white border border-green-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="text-green-600 w-6 h-6" />
              <h3 className="text-lg font-semibold text-green-700">Pros</h3>
            </div>
            <ul className="space-y-3">
              {pros.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 text-base"
                >
                  <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-white border border-red-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="text-red-600 w-6 h-6" />
              <h3 className="text-lg font-semibold text-red-700">Cons</h3>
            </div>
            <ul className="space-y-3">
              {cons.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 text-base"
                >
                  <XCircle className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProsConsCard;