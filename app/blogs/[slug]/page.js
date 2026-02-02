import { blogData } from '@/content/blogs'
import sidebarData from '@/content/blogs/blog-sidebars.json'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import HostCard from '@/components/HostCard'

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
      url: `https://yourdomain.com/blogs/${blog.slug}`,
      images: [blog.coverImage],
      type: "article",
    },
    alternates: {
      canonical: `https://yourdomain.com/blogs/${blog.slug}`,
    },
  }
}

// Default data if blog slug is not found
const defaultSidebarData = {
  logoUrl: '/brands/default-logo.svg',
  brandName: 'Recommended',
  couponCount: 5,
  primaryButtonUrl: '/reviews',
  secondaryButtonUrl: '/coupons',
  ratings: [
    { label: 'Quality', score: 4.8 },
    { label: 'Value', score: 4.5 },
    { label: 'Support', score: 4.7 },
    { label: 'Features', score: 4.6 },
  ],
  primaryButtonText: 'Explore Reviews',
  secondaryButtonText: 'View Coupons',
  accentColor: 'blue',
  overviewTitle: 'Top Picks'
}

// Simple Sidebar Component
const BlogSidebar = ({ slug }) => {
  // Get data for this specific blog
  const data = sidebarData[slug] || defaultSidebarData
  
  return (
    <aside className="h-full">
      <div className="sticky top-24 h-fit">
        <HostCard {...data} />
      </div>
    </aside>
  )
}

const BlogPage = ({ params }) => {
  const blog = blogData.find((b) => b.slug === params.slug)

  if (!blog) {
    return notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link>
            <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 truncate max-w-[200px] md:max-w-md">{blog.title}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Main Blog Content */}
            <article className="lg:col-span-8">
              <header className="mb-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.categories?.map((category, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-50 text-blue-700">
                      {category}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                  {blog.title}
                </h1>
                
                {blog.excerpt && (
                  <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-light mb-8">
                    {blog.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between border-y border-gray-100 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      {blog.authorAvatar ? (
                        <Image
                          src={blog.authorAvatar}
                          alt={blog.author}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                          {blog.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm md:text-base">By {blog.author}</div>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <span>{blog.date}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{blog.readingTime || '5 min read'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              {blog.coverImage && (
                <div className="mb-12 rounded-2xl overflow-hidden shadow-lg bg-gray-100 relative aspect-video">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="prose prose-lg md:prose-xl prose-slate max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 
                prose-a:text-blue-600 prose-a:no-underline prose-a:border-b-2 prose-a:border-blue-100 hover:prose-a:border-blue-600 hover:prose-a:transition-colors
              ">
                {blog.content ? (
                  <blog.content />
                ) : (
                  blog.sections?.map((section, index) => {
                    if (section.type === 'heading') return <h2 key={index}>{section.content}</h2>
                    if (section.type === 'paragraph') return <p key={index}>{section.content}</p>
                    if (section.type === 'image') {
                      return (
                        <figure key={index}>
                          <Image src={typeof section.content === 'string' ? section.content : section.content.src} 
                                 alt={section.caption || "Blog image"} 
                                 width={800} height={500} 
                                 className="w-full h-auto" />
                          {section.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{section.caption}</figcaption>}
                        </figure>
                      )
                    }
                    return null
                  })
                )}
              </div>
            </article>

            {/* Sidebar with Custom HostCard */}
            <div className="lg:col-span-4 relative">
              <BlogSidebar slug={blog.slug} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BlogPage