// app/components/Tutorials.js
import { blogData } from "@/content/blogs"  // 👈 import all blogs
import BlogCard from "./BlogCard"
import Link from "next/link"

const Tutorials = () => {
  // Filter only tutorial-type blogs
  const tutorialBlogs = blogData.filter((blog) => blog.type === "tutorial")

  return (
    <section className="pt-14 bg-gradient-to-b from-gray-50 to-white" id="tutorials">
      <div className="text-center mb-12">
        <h2 className="block w-full text-center font-bold text-3xl sm:text-4xl text-gray-700 mb-4">
          Latest Tutorials & Guides
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Step-by-step guides and tutorials to help you master web hosting, SEO, and digital marketing
        </p>
      </div>

      <div className="max-w-7xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        {/* Grid with outer border cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorialBlogs.slice(0, 6).map((blog, index) => (
            <BlogCard blog={blog} key={index} />
          ))}
        </div>

        {/* Show More Button */}
        {tutorialBlogs.length > 6 && (
          <div className="mt-12 text-center">
            <Link
              href="/tutorials"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-200"
            >
              View All Tutorials
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Tutorials