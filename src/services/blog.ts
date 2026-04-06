import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPost, BlogPostWithContent } from '@/types/blog';

const blogDirectory = path.join(process.cwd(), 'data/blog');

function extractExcerpt(content: string): string {
  const cleanContent = content
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^#.*$/gm, '')
    .trim();

  const paragraphs = cleanContent
    .split('\n\n')
    .filter((p) => p.trim().length > 0);
  let excerpt = '';

  for (const paragraph of paragraphs) {
    if (excerpt.length + paragraph.length < 200) {
      excerpt += paragraph + '\n\n';
    } else {
      const remainingLength = 200 - excerpt.length;
      const words = paragraph.split(' ');
      let truncated = '';

      for (const word of words) {
        if (truncated.length + word.length + 1 < remainingLength) {
          truncated += (truncated ? ' ' : '') + word;
        } else {
          break;
        }
      }

      excerpt += truncated + '...';
      break;
    }
  }

  return excerpt.trim() || cleanContent.substring(0, 200) + '...';
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(blogDirectory);

  const posts = filenames
    .filter((name) => name.endsWith('.mdx') && !name.endsWith('-en.mdx'))
    .map((filename) => {
      const fullPath = path.join(blogDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const slug = filename.replace(/\.(mdx|md)$/, '');
      const excerpt = extractExcerpt(content);

      // Try to find mini image
      const imageBase = data.image || slug;
      const miniImagePath = `/images/blog/${imageBase}-mini.png`;
      const miniImageJpgPath = `/images/blog/${imageBase}-mini.jpg`;
      const publicMiniPng = path.join(process.cwd(), 'public', miniImagePath);
      const publicMiniJpg = path.join(
        process.cwd(),
        'public',
        miniImageJpgPath
      );

      let image: string | undefined;
      if (fs.existsSync(publicMiniPng)) {
        image = miniImagePath;
      } else if (fs.existsSync(publicMiniJpg)) {
        image = miniImageJpgPath;
      }

      return {
        title: data.title || '',
        key: data.key || slug,
        image,
        date: data.date || '',
        slug,
        content: excerpt,
      } as BlogPost;
    });

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getBlogPostBySlug(
  slug: string,
  locale: string
): BlogPostWithContent | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    const fullPathEn = path.join(blogDirectory, `${slug}-en.mdx`);

    const isEnglish =
      locale.toLowerCase().startsWith('en') && fs.existsSync(fullPathEn);
    const pathToUse = isEnglish ? fullPathEn : fullPath;

    const fileContents = fs.readFileSync(pathToUse, 'utf8');
    const { data, content } = matter(fileContents);

    // Try to find hero image
    const imageBase = data.image || slug;
    const heroImagePath = `/images/blog/${imageBase}-hero.png`;
    const heroImageJpgPath = `/images/blog/${imageBase}-hero.jpg`;
    const publicHeroPng = path.join(process.cwd(), 'public', heroImagePath);
    const publicHeroJpg = path.join(process.cwd(), 'public', heroImageJpgPath);

    let image: string | undefined;
    if (fs.existsSync(publicHeroPng)) {
      image = heroImagePath;
    } else if (fs.existsSync(publicHeroJpg)) {
      image = heroImageJpgPath;
    }

    return {
      title: data.title || '',
      key: data.key || slug,
      image,
      date: data.date || '',
      slug,
      content,
      hideTitle: data.hideTitle || false,
    } as BlogPostWithContent;
  } catch {
    return null;
  }
}
