import Link from "next/link"
import Image from "next/image"

const BlogCard = ({ blog }) => {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      {/* Blog Image */}
      {blog.imageUrl && (
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      {/* Blog Title */}
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>

      {/* Author + Date */}
      <div className="flex items-center text-sm text-gray-500 mb-3">
        {blog.avatarUrl && (
          <Image
            src={blog.avatarUrl}
            alt={blog.author}
            width={30}
            height={30}
            className="rounded-full mr-2"
          />
        )}
        <span>{blog.author}</span>
        <span className="mx-2">•</span>
        <span>{blog.date}</span>
      </div>

      {/* Blog Description */}
      <p className="text-gray-600 flex-grow">{blog.description}</p>

      {/* Read More Link */}
      <Link
        href={`/blogs/${blog.slug}`}
        className="mt-4 inline-block text-blue-600 hover:underline font-medium"
      >
        Read More →
      </Link>
    </div>
  )
}

export default BlogCard
