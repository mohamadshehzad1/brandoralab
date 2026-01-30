import { blogData } from '@/content/blogs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import SidebarReviewCard from '@/components/SidebarReviewCard'

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

// Helper function to get brand-specific review card data
const getReviewCardData = (blogSlug) => {
  const reviewCardMapping = {
    'shopify-review-2024': {
      logoUrl: '/brands/shopify-logo.svg',
      brandName: 'Shopify',
      couponCount: 12,
      primaryButtonUrl: 'https://shopify.com',
      secondaryButtonUrl: '/coupons/shopify',
      ratings: [
        { label: 'Ease of Use', score: 4.8 },
        { label: 'Features', score: 4.5 },
        { label: 'Value for Money', score: 4.2 },
        { label: 'Customer Support', score: 4.0 },
      ],
      accentColor: 'green',
      overviewTitle: 'Shopify Ratings'
    },
    'woocommerce-guide': {
      logoUrl: '/brands/woocommerce-logo.svg',
      brandName: 'WooCommerce',
      couponCount: 8,
      primaryButtonUrl: 'https://woocommerce.com',
      secondaryButtonUrl: '/coupons/woocommerce',
      ratings: [
        { label: 'Customization', score: 4.9 },
        { label: 'Cost Efficiency', score: 4.7 },
        { label: 'Scalability', score: 4.3 },
        { label: 'Technical', score: 3.8 },
      ],
      accentColor: 'blue',
      overviewTitle: 'WooCommerce Analysis'
    },
    'squarespace-review': {
      logoUrl: '/brands/squarespace-logo.svg',
      brandName: 'Squarespace',
      couponCount: 5,
      primaryButtonUrl: 'https://squarespace.com',
      secondaryButtonUrl: '/coupons/squarespace',
      ratings: [
        { label: 'Templates', score: 4.9 },
        { label: 'Ease of Use', score: 4.7 },
        { label: 'Pricing', score: 3.9 },
        { label: 'SEO', score: 4.2 },
      ],
      accentColor: 'orange',
      overviewTitle: 'Squarespace Overview'
    }
  }

  return reviewCardMapping[blogSlug] || {
    logoUrl: '/brands/default-logo.svg',
    brandName: 'Recommended',
    couponCount: 3,
    primaryButtonUrl: '/reviews',
    secondaryButtonUrl: '/coupons',
    ratings: [
      { label: 'Quality', score: 4.5 },
      { label: 'Value', score: 4.2 },
      { label: 'Support', score: 4.0 },
      { label: 'Features', score: 4.3 },
    ],
    accentColor: 'blue',
    overviewTitle: 'Expert Review'
  }
}

// ✅ Updated Sidebar: Only showing the Review Card & Sticky Logic
const BlogSidebar = ({ currentSlug }) => {
  const reviewCardData = getReviewCardData(currentSlug)
  
  return (
    <aside className="h-full">
      {/* sticky top-24: Sticks to the viewport 24px from top.
         h-fit: Ensures the container doesn't stretch, allowing stickiness to work.
      */}
      <div className="sticky top-24 h-fit space-y-8">
        <SidebarReviewCard
          {...reviewCardData}
          className="shadow-xl"
        />
        
        {/* Optional: Small text below sidebar to balance whitespace */}
        <div className="text-center px-4">
           <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
             Trusted by 10k+ readers
           </p>
        </div>
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
        {/* ✅ Clean Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link>
            <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-gray-900 truncate max-w-[200px] md:max-w-md">{blog.title}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* ✅ Main Content Area (8 Columns) */}
            <article className="lg:col-span-8">
              {/* Blog Header */}
              <header className="mb-10">
                {/* Categories */}
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

                {/* Author Block - Expert Style */}
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
                  
                  {/* Share Icons */}
                  <div className="hidden sm:flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                      <span className="sr-only">Share</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                    </button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
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

              {/* ✅ Expert Typography Content */}
              <div className="prose prose-lg md:prose-xl prose-slate max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 
                prose-a:text-blue-600 prose-a:no-underline prose-a:border-b-2 prose-a:border-blue-100 hover:prose-a:border-blue-600 hover:prose-a:transition-colors
                prose-img:rounded-xl prose-img:shadow-md
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
              ">
                {blog.content ? (
                  <blog.content />
                ) : (
                  blog.sections?.map((section, index) => {
                    if (section.type === 'heading') {
                      return <h2 key={index} id={`section-${index}`} className="scroll-mt-32">{section.content}</h2>
                    }
                    if (section.type === 'paragraph') {
                      return <p key={index}>{section.content}</p>
                    }
                    if (section.type === 'image') {
                      const imgSrc = typeof section.content === 'string' ? section.content : section.content.src;
                      return (
                        <figure key={index}>
                          <Image
                            src={imgSrc}
                            alt={section.caption || "Blog image"}
                            width={800}
                            height={500}
                            className="w-full h-auto"
                          />
                          {section.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{section.caption}</figcaption>}
                        </figure>
                      )
                    }
                    return null
                  })
                )}

                {/* FAQ Section */}
                {blog.faq && (
                  <div className="mt-16 pt-10 border-t border-gray-200">
                    <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
                    <div className="not-prose space-y-4">
                      {blog.faq.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all border border-gray-100">
                          <h4 className="font-bold text-lg text-gray-900 mb-2">{item.q}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* ✅ Sidebar (4 Columns) - Review Card Only */}
            <div className="lg:col-span-4 relative">
              <BlogSidebar currentSlug={blog.slug} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BlogPage