import { Email } from '@mui/icons-material';
import {
  Button,
  Container,
  Grid2 as Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { SubscribeNewsletter } from '@/components/commun/newsletter';
import { SocialData, SocialLink } from '@/components/commun/socials/socials';
import './footer.scss';
import { MyLink } from '@/components/commun/link';
import Image from 'next/image';
import { MyComponent } from '@/types';
import { getTranslation } from '@/i18n/i18n';
import LogoLong from '@/images/logo-blanc.png';

type FooterLink = { label: string; url: string; disabled?: boolean };

export const Footer: MyComponent = async ({ params }) => {
  const t = await getTranslation(params, 'footer');
  const tPages = await getTranslation(params, 'pages');

  const socials: SocialData[] = [
    {
      login: 'gdgnantes',
      type: 'facebook',
    },
    {
      login: 'devfestnantes',
      type: 'twitter',
    },
    {
      login: 'gdg-nantes',
      type: 'linkedin',
    },
    {
      login: 'francegdg',
      type: 'youtube',
    },
    {
      login: 'GDG-Nantes/Devfest2027',
      type: 'github',
    },
    {
      login: 'gdgnantes',
      type: 'instagram',
    },
    {
      login: 'gdgnantes',
      type: 'bluesky',
    },
  ];

  const aboutLinks: FooterLink[] = [
    {
      label: 'GDG Nantes',
      url: 'https://gdgnantes.com',
    },
    {
      label: 'Google Developer Groups',
      url: 'https://developers.google.com/',
    },
    {
      label: tPages('code-of-conduct.name'),
      url: '/code-of-conduct',
    },
    {
      label: tPages('legal-mentions.name'),
      url: '/legal-mentions',
    },
  ];

  const partnersLinks: FooterLink[] = [
    {
      label: t('partnership-kit'),
      url: 'https://drive.google.com/drive/folders/1B2HikY25j7-9XlIWZoPDrhqVC7jvDHbj',
    },
    {
      label: t('media-kit'),
      url: 'https://drive.google.com/drive/folders/1rGPDdErUhohlJlrCyen_ixHASzkwjtEU',
    },
  ];

  const previousEditions: FooterLink[] = [
    {
      url: `https://devfest2025.gdgnantes.com`,
      label: 'Devfest Nantes 2025',
    },
    {
      url: `https://devfest2024.gdgnantes.com`,
      label: 'Devfest Nantes 2024',
    },
    {
      url: `https://devfest2023.gdgnantes.com`,
      label: 'Devfest Nantes 2023',
    },
    {
      url: `https://devfest2022.gdgnantes.com`,
      label: 'Devfest Nantes 2022',
    },
    {
      url: `https://devfest2021.gdgnantes.com`,
      label: 'Devfest Nantes 2021',
    },
  ];

  return (
    <footer>
      <Container className={'section'}>
        <Grid container rowSpacing={5} columnSpacing={3}>
          <FooterItem title={t('follow')} size='half'>
            <div className='socials'>
              {socials.map((social) => (
                <SocialLink key={social.type} {...social} />
              ))}
            </div>
          </FooterItem>

          <FooterItem size='half'>
            <Link href='mailto:bureau@gdgnantes.com'>
              <Button
                className='footer-title'
                aria-label='bureau@gdgnantes.com'
                startIcon={<Email style={{ color: 'white' }} />}
              >
                bureau@gdgnantes.com
              </Button>
            </Link>
          </FooterItem>

          <FooterItem title={t('about')} links={aboutLinks} />
          <FooterItem title={t('previous-editions')} links={previousEditions} />
          <FooterItem title={t('partners')} links={partnersLinks} />

          <FooterItem title='Newsletter'>
            <p>{t('no-spam')}</p>
            <SubscribeNewsletter params={params} />
          </FooterItem>

          <FooterItem size='full'>
            <div>
              <Image
                src={LogoLong}
                alt='logo devfest'
                style={{ width: '150px', height: 'auto' }}
              />
              <p style={{ marginTop: '5px' }}>{t('organizers')}</p>
            </div>
          </FooterItem>
        </Grid>
      </Container>
    </footer>
  );
};

const FooterItem: React.FC<
  React.PropsWithChildren<{
    title?: string;
    links?: FooterLink[];
    size?: 'half' | 'fourth' | 'full';
  }>
> = ({ children, title, links, size = 'fourth' }) => {
  const mediaSize: { xs?: number; sm?: number; lg?: number } =
    size == 'half'
      ? { xs: 12, sm: 6 }
      : size == 'full'
        ? { xs: 12 }
        : { xs: 12, sm: 6, lg: 3 };
  return (
    <Grid size={mediaSize} textAlign='center' paddingLeft='0'>
      {title && (
        <Typography variant='h3' className='footer-title'>
          {title}
        </Typography>
      )}
      {links && <FooterLinks links={links} />}
      {children}
    </Grid>
  );
};

const FooterLinks: React.FC<{ links: FooterLink[] }> = ({ links }) => {
  return (
    <List dense>
      {links.map(({ label, url, disabled }) => (
        <ListItem style={{ justifyContent: 'center' }} key={label}>
          {disabled ? (
            <div style={{ textDecoration: 'line-through' }}>{label}</div>
          ) : (
            <MyLink href={url}>{label}</MyLink>
          )}
        </ListItem>
      ))}
    </List>
  );
};
