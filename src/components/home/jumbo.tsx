'use client';

import { Box, Button, Modal, Paper, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getTranslation } from '@/i18n/i18n';
import { MyComponent } from '@/types';
import Image from 'next/image';
import LogoDevfest from '@/images/logo-blanc.png';
import './jumbo.scss';
import { Android, Apple, PhotoSharp, YouTube } from '@mui/icons-material';

export const HomeJumbo: MyComponent = ({ params }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [t, setT] = useState<((key: string) => string) | null>(null);
  const [tSite, setTSite] = useState<((key: string) => string) | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const translation = await getTranslation(params, 'pages.home.jumbo');
      const siteTranslation = await getTranslation(params);
      setT(() => translation);
      setTSite(() => siteTranslation);
    };
    
    loadTranslations();
  }, [params]);

  if (!t || !tSite) {
    return null; // or a loading spinner
  }

  return (
    <>
      <div className='jumbo'>
        <div className='jumbo-content'>
          <div className='logo-jumbo-home'>
            <Image
              alt='logo'
              src={LogoDevfest}
              className='logo-jumbo-home-img'
            />
          </div>

          <Stack
            className='jumbo-text'
            sx={{ maxWidth: { xs: '90%', sm: '75%', md: '50%' } }}
          >
            {/*<Typography variant='h1' textAlign='center'>
              {tSite('site.theme')}
            </Typography>*/}
            {/*<Typography*/}
            {/*  variant="h2"*/}
            {/*  textAlign="center"*/}
            {/*>*/}
            {/*  At night, they come to code !*/}
            {/*</Typography>*/}
            <Typography
              variant='h1'
              textAlign='center'
              style={{ marginTop: '10px', marginBottom: '25px' }}
            >
              {t('come-back')}
            </Typography>
          </Stack>
          <Stack className={'jumbo-buttons'} direction='column' spacing={3}>
            {/*<Stack direction='row' spacing={3} justifyContent={'center'}>*/}
            {/*<Button*/}
            {/*  color='secondary'*/}
            {/*  variant='contained'*/}
            {/*  href='https://www.billetweb.fr/partenaire-devfest-nantes-2025'*/}
            {/*  target='_blank'*/}
            {/*  aria-label={t('become_sponsor')}*/}
            {/*>*/}
            {/*  {t('become_sponsor')}*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*  color="secondary"*/}
            {/*  variant="contained"*/}
            {/*  href="https://conference-hall.io/devfest-nantes-2025"*/}
            {/*  aria-label={t("cfp")}*/}
            {/*>*/}
            {/*  {t("cfp")}*/}
            {/*</Button>*/}
            {/*</Stack>*/}
            {/*<Stack direction='row' spacing={3} justifyContent={'center'}>*/}
              {/* <Button
                color='secondary'
                variant='contained'
                href='https://devfest2024.gdgnantes.com'
                aria-label={t('previous')}
              >
                {t('previous')}
              </Button>
              <Button
                color='secondary'
                variant='contained'
                href='https://www.billetweb.fr/billet-devfest-nantes-2025'
                aria-label={t('buy-tickets')}
                target='_blank'
              >
                {t('buy-tickets')}
              </Button>
              {/* <Button
                color='secondary'
                variant='contained'
                href='https://forms.gle/E92wkui3v87zP2o88'
                aria-label={t('become-volunteer')}
                target='_blank'
              >
                {t('become-volunteer')}
              </Button> */}
              {/*<Button
              color="secondary"
              variant="contained"
              aria-label={t('schedule')}
              href="/schedule"
              >
                {t('schedule')}
              </Button> */}
            {/*</Stack>*/}
            <Stack direction='row' spacing={3} justifyContent={'center'}>
              <Button
                color="secondary"
                startIcon={<PhotoSharp />}
                variant="contained"
                href="https://photos.app.goo.gl/H1EqkeCNkjjYMxCCA"
                aria-label="Photos"
                target="_blank"
              >
                Photos 2025
              </Button> 
              <Button
                color="secondary"
                startIcon={<YouTube />}
                variant="contained"
                href="https://www.youtube.com/watch?v=ZhEMS_6m8PI&list=PLuZ_sYdawLiWvkdETEVYDFjV2ibwJ2E-9&index=4"
                aria-label="Videos"
                target={"_blank"}
              >
                Videos 2025
              </Button>
              {/*<Button
                color='secondary'
                variant='contained'
                href='https://billetterie.gdgnantes.com'
                aria-label={t('resend-tickets')}
                target={'_blank'}
              >
                {t('resend-tickets')}
              </Button>*/}
              {/*<Button
                color="secondary"
                variant="contained"
                onClick={() => setModalOpen(true)}
                aria-label={t('get-app')}
                >
                {t('get-app')}
              </Button>*/}
              {/*</Stack>*/}
              {/*  <Stack direction="row" spacing={3} justifyContent={"center"}>*/}
              {/*      <Button*/}
              {/*        color="secondary"*/}
              {/*        variant="contained"*/}
              {/*        aria-label={"Feedbacks"}*/}
              {/*        target="_blank"*/}
              {/*        href="https://openfeedback.io/devfestnantes24"*/}
              {/*      >*/}
              {/*        Feedbacks*/}
              {/*      </Button>*/}

              {/*<MobileAppButton label={t('get-app')} />*/}
              {/*    /!* <Button*/}
              {/*      color="secondary"*/}
              {/*      variant="contained"*/}
              {/*      aria-label={t("offers")}*/}
              {/*      target={"_blank"}*/}
              {/*      href="https://nantes.francedigitaljobs.fr/search-list-jobs?id=&titre=&city=&categorie=&niveau=&type=&teletravail="*/}
              {/*    >*/}
              {/*      {t('offers')}*/}
              {/*    </Button> *!/*/}
              {/*  </Stack>*/}
              {/*<Stack direction="row" spacing={3} justifyContent={"center"}>*/}
              {/*  <Button href="/our-values" color="secondary">{t('bring-ecocup')}</Button>*/}
            </Stack>
          </Stack>
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} className={"modal-apps"}>
        <Paper className={"modal-content"}>
          <Box className={"modal-body"}>
            <Typography variant='h6' textAlign='center' sx={{ mb: 3 }}>
              {t('thanks-gdg-android')}
            </Typography>
            <Stack spacing={[5,5]} direction={["column", "row"]}>
              <Button
                color="secondary"
                variant="contained"
                href="https://apps.apple.com/fr/app/devfest-nantes/id6443489706"
                aria-label="iOS app"
                target={"_blank"}
                startIcon={<Apple/>}
              >
                iOS
              </Button>
              <Button
                color="secondary"
                variant="contained"
                href="https://play.google.com/store/apps/details?id=com.gdgnantes.devfest.mobile.androidapp&pcampaignid=web_share"
                aria-label="Android app"
                target={"_blank"}
                startIcon={<Android/>}
              >
                Android
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
