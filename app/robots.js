export default function robots() {
    const baseUrl = 'https://brandoralab.com';
  
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }
  