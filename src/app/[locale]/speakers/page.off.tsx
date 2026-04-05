import { CommonParams } from '@/types';
import { getTranslation } from '@/i18n/i18n';
import { Typography } from '@mui/material';
import { PrimarySection } from '@/components/commun/section/sectionType';
import { getAllSpeakers } from '@/services/speakers';
import { SpeakersList } from '@/components/speaker/speakers';

export async function generateMetadata({ params }: CommonParams) {
  const t = await getTranslation(params);
  return {
    title: t('pages.speakers.name'),
  };
}

export default async function Speakers({ params }: CommonParams) {
  const t = await getTranslation(params);
  const speakers = await getAllSpeakers();

  return (<>
    <PrimarySection>
      <Typography variant='h2' color='primary'>
        {t('pages.speakers.name')}
      </Typography>
      <SpeakersList speakers={speakers} />
    </PrimarySection>
  </>)
}
