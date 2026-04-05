import { Directions } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { MyLink } from '@/components/commun/link';
import HomeMapImage from '@/images/home/map.jpg';
import Image from 'next/image';
import { MyComponent } from '@/types';
import { getTranslation } from '@/i18n/i18n';
import {
  MyContainer,
  PrimarySection,
} from '@/components/commun/section/sectionType';

export const HomeMap: MyComponent = async ({ params }) => {
  return (
    <>
      <PrimarySection mediaDisplay='mobile-only'>
        <Description params={params} />
      </PrimarySection>
      <FullWidthMap>
        <Box
          style={{
            position: 'absolute',
            display: 'inline-block',
            bottom: '20px',
            left: '20px',
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '20px',
            maxWidth: '40vw',
          }}
        >
          <Description params={params} />
        </Box>
      </FullWidthMap>
    </>
  );
};

const Description: MyComponent = async ({ params }) => {
  const t = await getTranslation(params, 'pages.attending.map');
  return (
    <>
      <Typography variant='h2' style={{ marginTop: 0 }}>
        {t('title')}
      </Typography>
      <Typography variant='h3'>H Arena, Nantes, France</Typography>
      <p>{t('description')}</p>
      <MyLink href='https://www.google.com/maps/dir/?api=1&destination=47.2058,-1.5243'>
        <Button variant='contained' color='secondary' endIcon={<Directions />}>
          44 Bd de la Prairie au Duc, 44200 Nantes
        </Button>
      </MyLink>
    </>
  );
};

const FullWidthMap: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <MyContainer
      mediaDisplay='desktop-only'
      maxWidth={false}
      style={{
        height: '600px',
        width: '100%',
        position: 'relative',
      }}
    >
      <Image
        alt='world map'
        src={HomeMapImage}
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
      {children}
    </MyContainer>
  );
};
