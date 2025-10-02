"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, BookOpen, Navigation } from "lucide-react";

export default function TableOfContents({ offset = 100 }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [desktopExpanded, setDesktopExpanded] = useState(false);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("h2, h3"));
    if (!nodes.length) return;

    const hs = nodes.map((node, index) => {
      let id = node.id;
      if (!id) {
        id = node.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        node.id = id;
      }
      return { 
        id, 
        text: node.textContent, 
        level: Number(node.tagName[1]),
        index 
      };
    });

    setHeadings(hs);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!headings.length) return null;

  const currentIndex = headings.findIndex(h => h.id === activeId);
  const progress = ((currentIndex + 1) / headings.length) * 100;
  
  // Show only first 3 items when collapsed on desktop
  const desktopHeadings = desktopExpanded ? headings : headings.slice(0, 3);

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="md:hidden mb-8">
        <button
          onClick={() => setMobileExpanded((s) => !s)}
          className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
          aria-expanded={mobileExpanded}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#6a5acd]/10 to-[#48d1cc]/10 rounded-lg">
              <BookOpen className="w-4 h-4 text-[#6a5acd]" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 text-sm">Table of Contents</div>
              <div className="text-xs text-gray-500">{headings.length} sections</div>
            </div>
          </div>
          <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileExpanded ? 'rotate-90' : ''}`} />
        </button>

        {mobileExpanded && (
          <nav className="mt-3 bg-white border border-gray-200 rounded-xl p-4 shadow-lg animate-in fade-in duration-200">
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
              <div 
                className="bg-gradient-to-r from-[#6a5acd] to-[#48d1cc] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Navigation Items */}
            <ul className="space-y-1">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? 'ml-3 pl-3 border-l border-gray-200' : ''}>
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(h.id);
                      setMobileExpanded(false);
                    }}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-150 group ${
                      activeId === h.id
                        ? "bg-gradient-to-r from-[#6a5acd]/10 to-[#48d1cc]/10 text-[#6a5acd] font-semibold border border-[#6a5acd]/20"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      activeId === h.id
                        ? "bg-[#6a5acd] text-white"
                        : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
                    }`}>
                      {h.index + 1}
                    </div>
                    <span className="text-sm font-medium flex-1 leading-tight">{h.text}</span>
                    <ChevronRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block mb-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#6a5acd]/5 to-[#48d1cc]/5 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-xs border border-gray-200">
                  <Navigation className="w-5 h-5 text-[#6a5acd]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Table of Contents</h3>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {headings.length} sections • {Math.round(progress)}% complete
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#6a5acd]">{headings.length}</div>
                <div className="text-xs text-gray-500">sections</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-3 bg-white border-b border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>Reading progress</span>
              <span>{currentIndex + 1} of {headings.length}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#6a5acd] to-[#48d1cc] h-2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {desktopHeadings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(h.id);
                  }}
                  className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${
                    activeId === h.id
                      ? "bg-gradient-to-r from-[#6a5acd]/10 to-[#48d1cc]/10 border-[#6a5acd]/30 shadow-xs"
                      : "border-gray-200 hover:border-[#6a5acd]/30 hover:shadow-xs"
                  }`}
                >
                  {/* Number Badge */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                    activeId === h.id
                      ? "bg-gradient-to-br from-[#6a5acd] to-[#48d1cc] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 group-hover:bg-[#6a5acd]/10 group-hover:text-[#6a5acd]"
                  }`}>
                    {h.index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium leading-snug transition-colors ${
                      activeId === h.id 
                        ? "text-[#6a5acd]" 
                        : "text-gray-900 group-hover:text-[#6a5acd]"
                    }`}>
                      {h.text}
                    </div>
                    <div className={`text-xs mt-1 transition-colors ${
                      activeId === h.id ? "text-[#6a5acd]" : "text-gray-500"
                    }`}>
                      {h.level === 2 ? "Main section" : "Subsection"}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-200 ${
                    activeId === h.id 
                      ? "bg-[#48d1cc] scale-125" 
                      : "bg-gray-300 group-hover:bg-gray-400"
                  }`} />
                </a>
              ))}
            </div>

            {/* Show More/Less Button */}
            {headings.length > 3 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setDesktopExpanded((s) => !s)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#6a5acd] hover:text-[#48d1cc] transition-colors duration-200 group"
                >
                  {desktopExpanded ? (
                    <>
                      <ChevronDown className="w-4 h-4 transform rotate-180 transition-transform" />
                      Show Less
                      <span className="text-xs text-gray-500 ml-1">
                        (Hide {headings.length - 3} sections)
                      </span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 transition-transform" />
                      Show More
                      <span className="text-xs text-gray-500 ml-1">
                        (+{headings.length - 3} more sections)
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Click any section to navigate</span>
              <span>Currently reading: {activeId ? headings.find(h => h.id === activeId)?.text : 'Start'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}