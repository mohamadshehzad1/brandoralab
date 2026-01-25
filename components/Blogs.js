// app/components/Blogs.js
import { blogData } from '@/content/blogs';
import BlogCard from './BlogCard';
import Link from 'next/link';

const Blogs = () => {
  return (
    <section className="pt-14" id="blogs">
      <div className="text-center mb-12">
        <h2 className="block w-full text-center font-bold text-3xl sm:text-4xl text-gray-700 mb-4">
          Latest Blog Highlights
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Expert analysis and performance-based reviews to help you choose the best hosting for your needs
        </p>
      </div>

      <div className="max-w-7xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        {/* ✅ Grid with outer border cards - 3 columns on desktop, 6 blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.slice(0, 6).map((blog, index) => (
            <BlogCard blog={blog} key={index} />
          ))}
        </div>

        {/* ✅ Show More Button (only if there are more than 6 blogs) */}
        {blogData.length > 6 && (
          <div className="mt-12 text-center">
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
        )}
      </div>
    </section>
  );
};

export default Blogs;