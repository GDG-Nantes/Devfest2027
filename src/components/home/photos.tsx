import { Button, Grid2, Stack } from '@mui/material';
import React, { CSSProperties } from 'react';
import { MyLink } from '@/components/commun/link';
import Image, { StaticImageData } from 'next/image';

import Faucheuses from '@/images/home/album/faucheuses.jpg';
import EquipeAmphi from '@/images/home/album/equipe-amphi.jpg';
import Adrien from '@/images/home/album/adrien.jpg';
import AnnabelleJef from '@/images/home/album/annabelle-jef.jpg';
import Buffet from '@/images/home/album/chef.jpg';
import Stand from '@/images/home/album/stand.jpg';
import Concert from '@/images/home/album/concert.jpg';
import DeuxMille from '@/images/home/album/2000.jpg';
import { MyComponent } from '@/types';
import { getTranslation } from '@/i18n/i18n';

export const DevfestPhotos: MyComponent = async ({ params }) => {
  const t = await getTranslation(params, 'pages.home.photos');
  return (
    <Grid2
      display={'grid'}
      container
      gap={2}
      gridTemplateColumns={{ md: 'repeat(5, 1fr)', sm: 'repeat(3, 1fr)' }}
      gridTemplateRows={{ md: 'repeat(3, 30vh)', sm: 'repeat(5, 17vh)' }}
      gridAutoFlow={'dense'}
    >
      <Picture
        image={Faucheuses}
        type={'high'}
        alt={''}
        gridColumn='1'
        gridRow='span 2'
      />
      <Picture image={EquipeAmphi} type={'low'} alt={''} gridColumn='span 2' />
      <Picture
        image={Adrien}
        type={'low'}
        alt={''}
        gridColumn='span 2'
        objectPosition={'top'}
      />

      <ButtonTile
        label={t('p1')}
        subLabel={t('p2')}
        buttonLabel={t('button')}
        gridColumn='span 2'
      />

      <Picture
        image={AnnabelleJef}
        alt={''}
        type={'high'}
        gridColumn='span 1'
        gridRow='span 2'
      />
      <Picture image={Buffet} alt={''} type={'square'} gridColumn='span 1' />
      <Picture image={DeuxMille} type={'low'} alt={''} gridColumn='span 2' />
      <Picture image={Stand} alt={''} type={'square'} gridColumn='span 1' />
      <Picture
        image={Concert}
        alt={''}
        type={'square'}
        gridColumn='span 1'
        noMobile
      />
    </Grid2>
  );
};

const Picture: React.FC<{
  image: StaticImageData;
  type: 'high' | 'low' | 'square';
  alt: string;
  gridColumn?: string;
  gridRow?: string;
  objectPosition?: CSSProperties['objectPosition'];
  noMobile?: boolean;
}> = async ({
  image,
  gridColumn,
  gridRow,
  objectPosition,
  alt,
  type,
  noMobile,
}) => {
  const sizes =
    type === 'square'
      ? '(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw'
      : type === 'low'
        ? '(max-width: 640px) 100vw, (max-width: 1280px) 75vw, 50vw'
        : '(max-width: 640px) 100vh, (max-width: 1280px) 75vh';
  return (
    <Grid2
      gridColumn={gridColumn}
      gridRow={gridRow}
      sx={noMobile ? { display: { xs: 'none', sm: 'block' } } : undefined}
    >
      <Image
        alt={alt}
        src={image}
        sizes={sizes}
        style={{
          height: '100%',
          width: '100%',
          aspectRatio: type === 'square' ? '1 / 1' : '16 / 9',
          objectPosition: objectPosition || 'center',
          objectFit: 'cover',
        }}
      />
    </Grid2>
  );
};

const ButtonTile: React.FC<{
  gridColumn: string;
  label: string;
  subLabel: string;
  buttonLabel: string;
}> = ({ gridColumn, label, subLabel, buttonLabel }) => {
  return (
    <Stack style={{ gridColumn }} alignItems='center' justifyContent='center'>
      <p>{label}</p>
      <p style={{ marginTop: 0 }}>{subLabel}</p>
      <MyLink href='https://photos.app.goo.gl/H1EqkeCNkjjYMxCCA'>
        <Button variant='contained' color='primary' aria-label='Photos 2025'>
          {buttonLabel}
        </Button>
      </MyLink>
    </Stack>
  );
};
