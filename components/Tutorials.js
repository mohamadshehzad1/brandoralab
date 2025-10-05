import { blogData } from "@/content/blogs"  // 👈 import all blogs
import BlogCard from "./BlogCard"
import Link from "next/link"

const Tutorials = () => {
  // Filter only tutorial-type blogs
  const tutorialBlogs = blogData.filter((blog) => blog.type === "tutorial")

  return (
    <section className="pt-14" id="tutorials">
      <h2 className="block w-full text-center font-bold text-3xl sm:text-4xl text-gray-700">
        Latest Tutorials & Guides
      </h2>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {tutorialBlogs.slice(0, 6).map((blog, index) => (
            <BlogCard blog={blog} key={index} />
          ))}
        </div>

        {/* Show More Button */}
        {tutorialBlogs.length > 6 && (
          <div className="mt-12 text-center">
            <Link
              href="/tutorials"
              rel="noopener noreferrer"
              className="inline-block px-10 py-1 text-md font-semibold border-2 rounded-full bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600 transition-transform transform hover:scale-105 hover:border-indigo-400 hover:border-2"
            >
              See All Tutorials
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Tutorials
