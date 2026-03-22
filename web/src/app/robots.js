export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://smart-healthcare-ai.vercel.app/sitemap.xml',
  }
}
