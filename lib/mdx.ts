// Утилиты для работы с MDX-блогом — только для серверных компонентов (использует Node.js fs)
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  keywords: string[];
  readTime: number;
}

export interface BlogPost extends BlogPostMeta {
  htmlContent: string;
}

export function getAllPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const { data } = matter(raw);

      return {
        slug,
        title: data['title'] as string,
        date: data['date'] as string,
        description: data['description'] as string,
        keywords: (data['keywords'] as string[]) ?? [],
        readTime: (data['readTime'] as number) ?? 4,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  // Markdown → HTML через unified pipeline (нет зависимости от React-версий)
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data['title'] as string,
    date: data['date'] as string,
    description: data['description'] as string,
    keywords: (data['keywords'] as string[]) ?? [],
    readTime: (data['readTime'] as number) ?? 4,
    htmlContent: result.toString(),
  };
}
