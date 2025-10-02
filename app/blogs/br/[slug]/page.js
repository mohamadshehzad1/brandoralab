import { blogData } from '@/content/blogs/br'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return blogData.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }) {
  const blog = blogData.find((b) => b.slug === params.slug)
  if (!blog) return {}

  return {
    title: `${blog.title} | BrandoraLab`,
    description: blog.excerpt || blog.sections?.[0]?.content?.slice(0, 150),
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://brandoralab.com/blogs/br/${blog.slug}`,
      images: [blog.coverImage],
      type: "article",
    },
    alternates: {
      canonical: `https://brandoralab.com/blogs/br/${blog.slug}`,
    },
  }
}


const BlogPage = ({ params }) => {
  const blog = blogData.find((b) => b.slug === params.slug)

  if (!blog) {
    return notFound()
  }

  return (
    <div>
      {/* ✅ Global Header */}
      <div className="pt-10">
        <Header />
      </div>

      {/* ✅ Breadcrumb Bar */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <nav className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-md mb-6">
          <Link href="/" className="hover:underline">Home</Link> /{" "}
          <Link href="/blogs" className="hover:underline">Blogs</Link> /{" "}
          <span className="text-gray-800 font-medium">{blog.title}</span>
        </nav>
      </div>

      {/* ✅ Blog Header */}
      <header className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
          {blog.title}
        </h1>

        {blog.excerpt && (
          <p className="text-lg text-gray-700 mb-4">{blog.excerpt}</p>
        )}

        <p className="text-gray-500 text-sm">
          By <span className="font-medium">{blog.author}</span> • {blog.date}
        </p>
      </header>

      {/* ✅ Blog Body */}
      <main className="max-w-3xl mx-auto py-10 px-4 prose prose-lg prose-gray">
        {blog.content ? (
          <blog.content />
        ) : (
          blog.sections?.map((section, index) => {
            if (section.type === 'heading') {
              return (
                <h2 key={index} className="mt-10 mb-4 text-2xl font-semibold">
                  {section.content}
                </h2>
              )
            }
            if (section.type === 'paragraph') {
              return (
                <p key={index} className="mb-4 leading-relaxed">
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
                  className="my-6 rounded-md border"
                />
              )
            }
            return null
          })
        )}

        {/* ✅ FAQ Section (GitHub Discussion-like) */}
        {blog.faq && (
          <section className="mt-12 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            <div className="space-y-6">
              {blog.faq.map((item, idx) => (
                <div key={idx} className="border-b pb-4">
                  <h3 className="font-medium text-lg">{item.q}</h3>
                  <p className="mt-1 text-gray-700">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default BlogPage
