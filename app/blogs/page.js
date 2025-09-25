import { blogData } from '@/content/blogs'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BlogsPage = () => {
  return (
    <>
    <div className="pt-10">
      <Header />
      </div>
      
      <main className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-5xl font-bold mb-6 text-center">Our Blogs</h1>

        <div className="grid gap-3 md:grid-cols-3">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="p-5 border rounded-lg shadow hover:shadow-lg transition"
            >
              {/* ✅ Next.js Image handles both imported images & URLs */}
              {blog.imageUrl && (
                <Image
                  src={typeof blog.imageUrl === 'string' ? blog.imageUrl : blog.imageUrl.src}
                  alt={blog.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover rounded"
                />
              )}

              <h2 className="text-2xl font-semibold mt-4">{blog.title}</h2>
              <p className="text-gray-500 text-sm">
                By {blog.author} – {blog.date}
              </p>
              <p className="mt-2">{blog.description}</p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="text-blue-600 mt-3 inline-block hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default BlogsPage
