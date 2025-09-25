import React from "react"

const KeyTakeaways = ({ points = [], title = "Key Takeaways" }) => {
  return (
    <section className="mt-12 px-4">
      <div className="relative rounded-xl p-[2px] max-w-4xl mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
        
        {/* Decorative Badge (now floats above border, bigger size) */}
        <div className="absolute -top-6 right-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 sm:p-4 rounded-full shadow-lg z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 sm:h-8 sm:w-8"  // increased icon size
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Inner Card with subtle background pattern */}
        <div className="relative bg-white rounded-xl p-6 sm:p-8 md:p-10 overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,black_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

          {/* Heading */}
          <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {title}
          </h2>

          {/* Bullet Points */}
          <ul className="relative z-10 space-y-4 text-gray-700 leading-relaxed text-base sm:text-lg">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-indigo-500 mr-2 sm:mr-3 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default KeyTakeaways
