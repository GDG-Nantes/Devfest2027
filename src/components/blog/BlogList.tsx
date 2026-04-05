import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { MyLink } from '@/components/commun/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';

// Fonction pour supprimer le formatage Markdown
const stripMarkdown = (text: string): string => {
  return text
    .replace(/<.+?>/g, '') // Supprimer les balises HTML
    .replace(/\*\*(.*?)\*\*/g, '$1') // **bold** -> bold
    .replace(/\*(.*?)\*/g, '$1') // *italic* -> italic
    .replace(/__(.*?)__/g, '$1') // __bold__ -> bold
    .replace(/_(.*?)_/g, '$1') // _italic_ -> italic
    .replace(/`(.*?)`/g, '$1') // `code` -> code
    .replace(/~~(.*?)~~/g, '$1') // ~~strikethrough~~ -> strikethrough
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // [text](url) -> text
    .replace(/#{1,6}\s+/g, '') // # headers -> headers
    .replace(/>\s+/g, '') // > blockquote -> blockquote
    .replace(/[-*+]\s+/g, '') // - list items -> list items
    .replace(/\d+\.\s+/g, '') // 1. numbered list -> numbered list
    .replace(/\n/g, ' ') // newlines -> spaces
    .replace(/\s+/g, ' ') // multiple spaces -> single space
    .trim();
};

export const BlogList: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      {posts.map((post, index) => {
        const isEven = index % 2 === 0;

        return (
          <Box
            key={post.slug}
            sx={{
              mb: 4,
              overflow: 'hidden',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            <MyLink
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Grid container sx={{ minHeight: 200 }}>
                {/* Image à gauche pour les articles pairs, à droite pour les impairs */}
                <Grid
                  size={{ xs: 12, md: 4 }}
                  sx={{
                    order: { xs: 1, md: isEven ? 1 : 2 },
                  }}
                >
                  {post.image && (
                    <Box
                      sx={{
                        position: 'relative',
                        width: { xs: 200, md: 250 },
                        height: { xs: 200, md: 250 },
                        overflow: 'hidden',
                        mx: { xs: 'auto', md: isEven ? 0 : 'auto' }, // Alignement à gauche pour articles pairs, centré pour mobiles
                      }}
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  )}
                </Grid>

                {/* Contenu textuel */}
                <Grid
                  size={{ xs: 12, md: 8 }}
                  sx={{
                    order: { xs: 2, md: isEven ? 2 : 1 },
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      py: 3,
                    }}
                  >
                    <Box>
                      <Typography
                        variant='h2'
                        component='h2'
                        gutterBottom
                        className='no-leaf'
                        sx={{
                          fontWeight: 'bold',
                          mb: 2,
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant='body1'
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          mb: 2,
                        }}
                      >
                        {stripMarkdown(post.content)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 500,
                        }}
                      >
                        {formatDate(post.date)}
                      </Typography>

                      {post.key && (
                        <Box
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          {post.key}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </MyLink>
          </Box>
        );
      })}
    </Box>
  );
};
