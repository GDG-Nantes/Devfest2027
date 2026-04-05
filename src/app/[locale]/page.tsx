import { DevfestNumbers, HomeJumbo, Tickets } from '@/components/home';
import { CommonParams } from '@/types';
import '@/components/home/home.scss';
import { Container, Typography } from '@mui/material';
import { Youtube } from '@/components/commun/youtube';
import { getTranslation } from '@/i18n/i18n';
import {
  PrimarySection,
  Section,
} from '@/components/commun/section/sectionType';
import { HomeMap } from '@/components/home/map';
import { DevfestPhotos } from '@/components/home/photos';
import Affiche from '@/images/affiche.jpg';
import Image from 'next/image';
import { MyLink } from '@/components/commun/link';
import { AccessibilityNew } from '@mui/icons-material';
import React from 'react';
import './home.scss';
import { PartnersList } from '@/components/partners/partners';
import { PlanCite } from '@/components/home/plan';
export default async function Home({ params }: CommonParams) {
  const t = await getTranslation(params);
  return (
    <>
      <HomeJumbo params={params} />
      <PrimarySection>
        <Typography variant='h1'>{t('pages.home.what-is')}</Typography>
        <Typography variant='body1'>{t('site.description')}</Typography>
        <Typography variant='body1'>{t('site.theme')}</Typography>
        <DevfestNumbers params={params} />
        <Section fullWidth style={{ textAlign: 'center' }}>
          <Image
            src={Affiche}
            style={{ width: '50%', height: 'auto' }}
            alt={'Poster'}
          />
        </Section>

        <OurValuesLink params={params} />
        <Youtube id='t_1-8ajyO6c' title='Teaser 2027' />
      </PrimarySection>
      <PrimarySection fullWidth style={{ background: 'var(--tertiary)' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PlanCite />
        </div>
      </PrimarySection>
      <HomeMap params={params} />
      <PrimarySection fullWidth>
        <Typography variant='h2'>{t('pages.home.tickets.name')}</Typography>
        <Tickets params={params} />
      </PrimarySection>
      <PrimarySection fullWidth>
        <Typography variant='h2'>{t('pages.partners.pxl')}</Typography>
        <PartnersList params={params} partnerType='PXL' />
      </PrimarySection>
      <PrimarySection fullWidth>
        <Typography variant='h2'>
          {t('pages.partners.platinium-partners')}
        </Typography>
        <PartnersList params={params} partnerType='Platinium' />
      </PrimarySection>
      <Section fullWidth>
        <DevfestPhotos params={params} />
      </Section>
    </>
  );
}

const OurValuesLink: React.FC<CommonParams> = async ({ params }) => {
  const t = await getTranslation(params, 'pages.home.numbers');

  return (
    <Container className={'our-values-link'}>
      <MyLink href='/our-values'>
        <AccessibilityNew sx={{ fontSize: 60 }}></AccessibilityNew>
        <p>{t('our-values')}</p>
      </MyLink>
    </Container>
  );
};
