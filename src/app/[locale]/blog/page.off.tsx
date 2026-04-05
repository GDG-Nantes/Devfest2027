import { CommonParams } from '@/types';
import { getTranslation } from '@/i18n/i18n';
import { Typography } from '@mui/material';
import { PrimarySection } from '@/components/commun/section/sectionType';
import { getAllBlogPosts } from '@/services/blog';
import { BlogList } from '@/components/blog/BlogList';

export async function generateMetadata({ params }: CommonParams) {
  const t = await getTranslation(params);
  return {
    title: t('pages.blog.name'),
    description: 'Articles de blog du DevFest Nantes 2027',
  };
}

export default async function BlogPage({ params }: CommonParams) {
  const t = await getTranslation(params);

  const posts = await getAllBlogPosts();
  return (
    <PrimarySection>
      <Typography variant='h2' color='primary' gutterBottom>
        {t('pages.blog.name')}
      </Typography>
      <BlogList posts={posts} />
    </PrimarySection>
  );
}
