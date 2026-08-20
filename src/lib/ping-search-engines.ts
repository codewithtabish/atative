export async function pingSearchEngines() {
  const sitemapUrl = encodeURIComponent("https://www.alentah.com/sitemap.xml");

  // Ping Google
  await fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`).catch(() => {});

  // Ping Bing (optional but recommended)
  await fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`).catch(() => {});
}
