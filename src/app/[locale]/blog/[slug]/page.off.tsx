import { getAllBlogPosts, getBlogPostBySlug } from '@/services/blog';
import { notFound } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { PrimarySection } from '@/components/commun/section/sectionType';
import Image from 'next/image';
import { Markdown } from '@/components/commun/markdown';
import { getTranslation } from '@/i18n/i18n';
import styles from './blog-post.module.css';

interface BlogPostPageParams {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const locales = ['fr', 'en'];

  return locales.flatMap((locale) =>
    posts.map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: BlogPostPageParams) {
  const { slug, locale } = await params;
  const post = await getBlogPostBySlug(slug, locale);
  const t = await getTranslation(params, 'pages.blog.post');

  if (!post) {
    return {
      title: t('not-found'),
    };
  }

  return {
    title: `${post.title} - ${t('meta.title')}`,
    description: `${t('meta.description')}: ${post.title}`,
    openGraph: {
      title: post.title,
      description: `${t('meta.description')}: ${post.title}`,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageParams) {
  const { slug, locale } = await params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Section Hero avec image et titre */}
      <Box className={styles.heroSection}>
        {/* Image de fond */}
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes='100vw'
            className={styles.heroImage}
            priority
          />
        )}

        {/* Overlay pour améliorer la lisibilité */}
        <Box className={styles.heroOverlay} />

        {/* Contenu du hero */}
        {!post.hideTitle && (
          <Box className={styles.heroContent}>
            <Typography
              variant='h1'
              component='h1'
              className={`no-leaf ${styles.heroTitle}`}
            >
              {post.title}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Contenu de l'article */}
      <PrimarySection padding='small' className={styles.contentSection}>
        <Markdown content={post.content} />
      </PrimarySection>
    </>
  );
}
