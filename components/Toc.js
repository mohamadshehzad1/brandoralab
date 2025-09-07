"use client";

import React, { useEffect, useState } from "react";

export default function TableOfContents({ offset = 100 }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [startIndex, setStartIndex] = useState(0); // 👈 sliding window for desktop

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("article h2, article h3"));
    if (!nodes.length) return;

    const hs = nodes.map((node) => {
      let id = node.id;
      if (!id) {
        id = node.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        node.id = id;
      }
      return { id, text: node.textContent, level: Number(node.tagName[1]) };
    });

    setHeadings(hs);

    // Scrollspy + sliding window
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);

            // find index of active heading
            const idx = hs.findIndex((h) => h.id === entry.target.id);

            // if active heading moves past window → shift window
            if (!expanded) {
              if (idx < startIndex) {
                setStartIndex(idx);
              } else if (idx >= startIndex + 4) {
                setStartIndex(idx - 3); // keep active heading inside 4-item window
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [expanded, startIndex]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!headings.length) return null;

  const visibleHeadings = expanded
    ? headings
    : headings.slice(startIndex, startIndex + 4);

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setExpanded((s) => !s)}
          className="w-full px-4 py-2 text-left font-semibold bg-gradient-to-r from-[#6a5acd] to-[#48d1cc] text-white rounded-lg"
          aria-expanded={expanded}
        >
          📑 Table of Contents
        </button>

        {expanded && (
          <nav className="mt-3 bg-white border-gradient rounded-xl p-4 shadow">
            <ul className="space-y-2 text-sm">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(h.id);
                    }}
                    className={`block cursor-pointer ${
                      activeId === h.id
                        ? "text-[#6a5acd] font-semibold"
                        : "text-gray-700 hover:text-[#48d1cc]"
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block border-gradient rounded-xl bg-white p-4 shadow max-w-[300px]">
        <h3 className="text-lg font-semibold mb-3 text-[#6a5acd]">
          📑 Table of Contents
        </h3>
        <ul className="space-y-2 text-sm">
          {visibleHeadings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(h.id);
                }}
                className={`flex items-center gap-2 cursor-pointer ${
                  activeId === h.id
                    ? "text-[#6a5acd] font-semibold"
                    : "text-gray-700 hover:text-[#48d1cc]"
                }`}
                aria-current={activeId === h.id ? "true" : undefined}
              >
                <span
                  className={`inline-block w-1 h-4 rounded ${
                    activeId === h.id
                      ? "bg-gradient-to-b from-[#6a5acd] to-[#48d1cc]"
                      : "bg-transparent"
                  }`}
                />
                <span className="truncate">{h.text}</span>
              </a>
            </li>
          ))}
        </ul>

        {headings.length > 4 && (
          <button
            onClick={() => setExpanded((s) => !s)}
            className="mt-3 text-blue-600 font-medium text-sm hover:underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </>
  );
}
