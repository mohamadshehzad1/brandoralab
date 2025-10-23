"use client";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

export default function ResultsCard({ host, rank }) {
  const badges = ["🏆 Top Choice", "🔥 Great Value", "💡 Recommended"];
  const delay = 0.2 * rank;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{host.name}</h3>
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
            {badges[rank - 1]}
          </span>
        </div>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{host.description}</p>

        <ul className="text-gray-700 text-sm space-y-1 mb-6">
          <li className="flex items-center gap-1"><Star size={14} className="text-yellow-400" /> Rating: {host.rating}/5</li>
          <li>💰 ${host.price}/month</li>
          <li>⚡ {host.performance}</li>
          <li>🎧 {host.support}</li>
        </ul>
      </div>

      <a
        href={host.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Visit {host.name} <ExternalLink size={16} />
      </a>
    </motion.div>
  );
}
