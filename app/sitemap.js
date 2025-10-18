import { blogData } from '@/content/blogs';

export default function sitemap() {
  const baseUrl = 'https://brandoralab.com';
  const currentDate = new Date().toISOString();

  // ✅ Static pages (core site)
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  // ✅ Free Tools (SEO topical strength)
  const tools = [
    {
      url: `${baseUrl}/free-tools/ipchecker`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-tools/ip-lookup`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-tools/dns-propagation`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/free-tools/whois-lookup`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ];

  // ✅ Dynamically generated blog posts
  const blogUrls =
    blogData?.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.date
        ? new Date(blog.date).toISOString()
        : currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })) || [];

  // ✅ Combine all routes
  const allRoutes = [...staticPages, ...tools, ...blogUrls];

  // ✅ Add language alternates (future multilingual SEO)
  return allRoutes.map((route) => ({
    ...route,
    alternates: {
      languages: {
        'en-US': route.url,
      },
    },
  }));
}
