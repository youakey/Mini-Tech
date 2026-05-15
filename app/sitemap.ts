import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export const dynamic = 'force-static';
import { EQUIPMENT_DATA } from '@/data/equipment';
import { SERVICES_DATA } from '@/data/services';
import { getAllPosts } from '@/lib/mdx';

const base = SITE.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/contacts/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/privacy/`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ];

  const equipmentRoutes: MetadataRoute.Sitemap = EQUIPMENT_DATA.map((e) => ({
    url: `${base}/equipment/${e.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((s) => ({
    url: `${base}/services/${s.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const posts = getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...equipmentRoutes, ...serviceRoutes, ...blogRoutes];
}
