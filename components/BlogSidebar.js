// components/BlogSidebar.js
'use client'

import React, { useState, useEffect } from 'react'
import SidebarReviewCard from './SidebarReviewCard'

const BlogSidebar = ({ blog }) => {
  const [isSticky, setIsSticky] = useState(false)
  const [sidebarTop, setSidebarTop] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.getElementById('blog-sidebar')
      if (!sidebar) return

      const rect = sidebar.getBoundingClientRect()
      const shouldBeSticky = rect.top <= 80
      
      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky)
      }
    }

    // Calculate initial position
    const sidebar = document.getElementById('blog-sidebar')
    if (sidebar) {
      const rect = sidebar.getBoundingClientRect()
      setSidebarTop(rect.top)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isSticky])

  // Determine blog-specific sidebar data
  const getSidebarData = () => {
    switch (blog.slug) {
      case 'bluehost-review':
        return {
          logoUrl: "https://www.bluehost.com/static/images/bluehost-logo.svg",
          brandName: "BlueHost",
          couponCount: 3,
          primaryButtonUrl: "https://bluehost.sjv.io/c/3600799/2147539/11352",
          secondaryButtonUrl: "#coupons",
          accentColor: "blue",
          primaryButtonText: "Visit BlueHost",
          secondaryButtonText: "Check Coupons",
          ratings: [
            { label: "Features", score: "3.5" },
            { label: "Ease of Use", score: "4.7" },
            { label: "Performance", score: "3.9" },
            { label: "Support", score: "4.7" },
            { label: "Pricing", score: "4.5" },
          ],
        }
      case 'hostinger-review':
        return {
          brandName: "Hostinger",
          couponCount: 5,
          primaryButtonUrl: "https://hostinger.sjv.io/brandoralab",
          secondaryButtonUrl: "#coupons",
          accentColor: "green",
          primaryButtonText: "Visit Hostinger",
          secondaryButtonText: "Check Coupons",
          ratings: [
            { label: "Features", score: "4.8" },
            { label: "Ease of Use", score: "4.5" },
            { label: "Performance", score: "4.9" },
            { label: "Support", score: "4.3" },
            { label: "Pricing", score: "4.7" },
          ],
        }
      default:
        return {
          brandName: blog.title.split(' ')[0] || "Review",
          couponCount: 2,
          primaryButtonUrl: "#",
          secondaryButtonUrl: "#coupons",
          accentColor: "orange",
          primaryButtonText: "Learn More",
          secondaryButtonText: "View Offers",
          ratings: [
            { label: "Overall", score: "4.5" },
            { label: "Value", score: "4.2" },
            { label: "Support", score: "4.0" },
            { label: "Performance", score: "4.3" },
          ],
        }
    }
  }

  const sidebarData = getSidebarData()

  return (
    <div 
      id="blog-sidebar"
      className={`
        transition-all duration-300
        ${isSticky ? 'fixed top-20 w-[calc(33.333%-2rem)]' : 'relative'}
      `}
      style={isSticky ? { maxWidth: '380px' } : {}}
    >
      <div className="space-y-6">
        {/* Fixed Review Card */}
        <div className={`${isSticky ? 'shadow-xl border-blue-300' : 'shadow-lg'}`}>
          <SidebarReviewCard
            {...sidebarData}
            className={`
              transition-all duration-300
              ${isSticky ? 'border-2 border-blue-200' : 'border'}
            `}
          />
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Quick Navigation
          </h3>
          <nav className="space-y-2">
            {['Overview', 'Pricing', 'Performance', 'Features', 'Alternatives', 'Verdict'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
              >
                <span className="w-2 h-2 bg-blue-200 rounded-full mr-3 group-hover:bg-blue-500"></span>
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Testing Methodology */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Testing Methodology
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span><strong>90 Days</strong> real testing</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span><strong>3 WordPress sites</strong> monitored</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span><strong>GTmetrix + PageSpeed</strong> analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span><strong>Support response</strong> testing</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span><strong>12 Competitors</strong> compared</span>
            </li>
          </ul>
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Trust & Verification
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">30</div>
              <div className="text-xs text-gray-600">Day Refund</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-xs text-gray-600">Support</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">99.9%</div>
              <div className="text-xs text-gray-600">Uptime</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">SSL</div>
              <div className="text-xs text-gray-600">Free</div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Related Articles
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Hostinger Review 2026', tag: '⚡ Performance' },
              { title: 'Best Web Hosting Comparison', tag: '🏆 Comparison' },
              { title: 'WordPress Hosting Guide', tag: '📚 Guide' },
              { title: 'Cloud Hosting Explained', tag: '☁️ Cloud' },
            ].map((post, idx) => (
              <a
                key={idx}
                href="#"
                className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                    {post.tag}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{post.title}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar