import { blogData } from '@/content/blogs'
import BlogCard from '@/components/BlogCard'

const AllBlogsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default AllBlogsPage
