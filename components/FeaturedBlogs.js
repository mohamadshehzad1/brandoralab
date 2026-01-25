// app/components/FeaturedBlogs.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Blog data structure - You can easily update this array
const BLOG_POSTS = [
  {
    id: 1,
    title: "Best Web Hosting Providers of 2024 - Performance Tested",
    excerpt: "Comprehensive comparison of top hosting companies with real performance data, uptime statistics, and SEO impact analysis.",
    category: "Hosting Reviews",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop",
    slug: "/blog/best-web-hosting-2024",
    performance: "98.5% Uptime",
    seoScore: "95/100"
  },
  {
    id: 2,
    title: "How Website Speed Affects SEO Ranking",
    excerpt: "Latest Google algorithm updates and how your hosting choice impacts Core Web Vitals and search rankings.",
    category: "SEO Guide",
    date: "Jan 24, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w-600&auto=format&fit=crop",
    slug: "/blog/website-speed-seo-2024",
    performance: "LCP: 1.2s",
    seoScore: "Essential"
  },
  {
    id: 3,
    title: "WordPress Hosting: Managed vs Shared - What's Better?",
    excerpt: "Detailed analysis of managed WordPress hosting benefits, costs, and when shared hosting makes sense.",
    category: "WordPress",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop",
    slug: "/blog/wordpress-hosting-managed-vs-shared",
    performance: "99.9% Uptime",
    seoScore: "WordPress Optimized"
  }
];

const FeaturedBlogs = ({ blogPosts = BLOG_POSTS }) => {
  const [posts, setPosts] = useState(blogPosts);

  // Function to update blog posts - you can call this from admin panel
  const updateBlogPost = (id, updates) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ));
  };

  // Function to add new blog post
  const addNewBlogPost = (newPost) => {
    setPosts(prev => [newPost, ...prev.slice(0, 2)]); // Keep only 3 posts
  };

  // You can also fetch from an API
  const fetchBlogPosts = async () => {
    try {
      // Example: Fetch from your CMS or API
      // const response = await fetch('/api/featured-blogs');
      // const data = await response.json();
      // setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            Featured Blog Posts
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest Hosting Insights & SEO Guides
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert analysis and performance-based reviews to help you choose the best hosting for your needs
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/blogs"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-200"
          >
            View All Blog Posts
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Blog Card Component (Reusable)
const BlogCard = ({ post }) => (
  <article className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 overflow-hidden">
    {/* Outer Border Effect */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
    
    <div className="relative bg-white rounded-xl p-1">
      <div className="relative">
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            post.category === 'Hosting Reviews' 
              ? 'bg-blue-100 text-blue-800 border border-blue-200' 
              : post.category === 'SEO Guide'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-purple-100 text-purple-800 border border-purple-200'
          }`}>
            {post.category}
          </span>
        </div>

        {/* Performance Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
            {post.performance}
          </span>
        </div>

        {/* Featured Image */}
        <div className="relative h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={post.id === 1} // Prioritize first image
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {post.date}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {post.readTime}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            <Link href={post.slug} className="hover:no-underline">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* SEO Score */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4 border border-gray-100">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">SEO Score</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              post.seoScore.includes('/100') 
                ? 'bg-green-100 text-green-800'
                : post.seoScore === 'Essential'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-purple-100 text-purple-800'
            }`}>
              {post.seoScore}
            </span>
          </div>

          {/* Read More Button */}
          <div className="flex items-center justify-between">
            <Link 
              href={post.slug}
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 group-hover:translate-x-1 transition-transform duration-200"
              aria-label={`Read more about ${post.title}`}
            >
              Read Full Review
              <svg className="w-4 h-4 ml-1 group-hover:ml-2 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            {/* Social Proof */}
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              4.8
            </div>
          </div>
        </div>

        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  </article>
);

export default FeaturedBlogs;