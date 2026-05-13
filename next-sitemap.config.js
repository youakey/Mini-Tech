/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // TODO: REPLACE — замените на реальный домен после настройки
  siteUrl: process.env.SITE_URL || 'https://example.by',
  generateRobotsTxt: false, // robots.txt создаём вручную в /public
  generateIndexSitemap: false,
  outDir: './out',
  exclude: ['/privacy', '/404', '/not-found'],
  transform: async (config, path) => {
    // Приоритеты страниц для поисковых роботов
    const priorities = {
      '/': 1.0,
      '/equipment/volvo-ec25': 0.9,
      '/equipment/cat-226b': 0.9,
      '/services/waste-removal': 0.8,
      '/services/demolition': 0.8,
      '/services/delivery': 0.8,
      '/contacts': 0.7,
      '/blog': 0.6,
      // Отдельные статьи блога — приоритет 0.5 (дефолт для всего, что не в списке выше)
    };

    return {
      loc: path,
      changefreq: path === '/' ? 'weekly' : 'monthly',
      priority: priorities[path] ?? 0.5,
      lastmod: new Date().toISOString(),
    };
  },
};
