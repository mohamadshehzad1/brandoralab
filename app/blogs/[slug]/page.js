import { blogData } from '@/content/blogs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export async function generateStaticParams() {
  return blogData.map((blog) => ({
    slug: blog.slug,
  }))
}

const BlogPage = ({ params }) => {
  const blog = blogData.find((b) => b.slug === params.slug)

  if (!blog) {
    return <div className="p-10 text-red-500">Blog not found</div>
  }

  return (
    <div>
      {/* ✅ Wrapped Header in same padding container as Domain page */}
      <div className="pt-10">
        <Header />
      </div>

      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-500 mb-6">
          By {blog.author} – {blog.date}
        </p>

        {/* ✅ If blog uses a React component */}
        {blog.content ? (
          <blog.content />
        ) : (
          blog.sections?.map((section, index) => {
            if (section.type === 'heading') {
              return (
                <h2 key={index} className="text-2xl font-semibold mt-6">
                  {section.content}
                </h2>
              )
            }
            if (section.type === 'paragraph') {
              return (
                <p key={index} className="mt-2 text-lg">
                  {section.content}
                </p>
              )
            }
            if (section.type === 'image') {
              return (
                <Image
                  key={index}
                  src={
                    typeof section.content === 'string'
                      ? section.content
                      : section.content.src
                  }
                  alt=""
                  width={800}
                  height={500}
                  className="my-4 rounded"
                />
              )
            }
            return null
          })
        )}
      </div>

      <Footer />
    </div>
  )
}

export default BlogPage
