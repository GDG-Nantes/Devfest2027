'use client';
import { MyComponent } from '@/types';
import { PrimarySection } from '../commun/section/sectionType';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getTranslation } from '@/i18n/i18n';
import Link from 'next/link';
import './animations.scss';

export const Animations: MyComponent = ({ params }) => {
  const [t, setT] = useState<((key: string) => string) | null>(null);
  const [siteT, setSiteT] = useState<((key: string) => string) | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const translation = await getTranslation(params, 'pages.home.animations');
      const siteTranslation = await getTranslation(params);
      setT(() => translation);
      setSiteT(() => siteTranslation);
    };

    loadTranslations();
  }, [params]);

  if (!t || !siteT) {
    return null; // or a loading spinner
  }

  return (
    <PrimarySection className='animations-section'>
      <Typography style={{ textAlign: 'center' }} variant='h1' color='primary'>
        Animations
      </Typography>
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        width={{ md: '100%' }}
        spacing={{ sm: 1, md: 4 }}
        justifyContent='space-around'
        alignItems={{ sm: 'center', md: 'normal' }}
      >
        <Card className='animation-card'>
          <CardContent>
            {/* Title */}
            <Typography variant='h5' gutterBottom>
              {t('citd.title')}
            </Typography>

            {/* Description */}
            <Typography variant='body2' color='text.secondary' gutterBottom>
              {t('citd.description')}
            </Typography>

            {/* Sessions */}
            <Box mt={2}>
              <Typography variant='subtitle1'>{t('sessions')}</Typography>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='body2'>
                      {siteT('pages.schedule.day1')}
                    </Typography>
                    <Typography variant='body2'>11h10</Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='body2'></Typography>
                    <Typography variant='body2'>15h10</Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='body2'>
                      {siteT('pages.schedule.day2')}
                    </Typography>
                    <Typography variant='body2'>11h10</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions>
            <Link
              style={{ marginLeft: 'auto' }}
              target='_blank'
              rel='noopener noreferrer'
              href='http://codeinthedark.com/'
            >
              <Button size='small' variant='text' color='inherit'>
                {t('learn-more')}
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Stack>
    </PrimarySection>
  );
};
