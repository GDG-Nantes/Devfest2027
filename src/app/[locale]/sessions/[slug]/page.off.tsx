import {
  SecondarySection,
  TertiarySection,
} from '@/components/commun/section/sectionType';
import { SessionWithoutResolvedSlot } from '../../../../types/schedule/session';
import { getTranslation } from '@/i18n/i18n';
import { CommonParams } from '@/types';
import { Button, Card, IconButton, Stack, Typography } from '@mui/material';
import fs from 'fs';
import yaml from 'js-yaml';
import { SessionComplexity, Tags } from '../../schedule/common';
import { AccessTime, Slideshow, YouTube } from '@mui/icons-material';
import { MyLink } from '@/components/commun/link';
import classNames from 'classnames';
import { Markdown } from '@/components/commun/markdown';
import { Speaker } from '../../../../types/schedule/speaker';
import Slots from '../../../../../data/slots.json';
import { AvatarSpeaker } from '@/components/speaker/avatar';
import './style.scss';
import { Flag } from '@/components/commun/flags';
import { getAllSessions } from '@/services/sessions';

export async function generateStaticParams() {
  const sessions = await getAllSessions();

  const locales = ['fr', 'en'];

  return locales.flatMap((locale) =>
    sessions.map((session) => ({
      locale,
      slug: session.key,
    }))
  );
}

export default async function SessionPage({
  params,
}: CommonParams<void, { slug: string }>) {
  const slug = (await params).slug;

  const data = fs.readFileSync(`data/sessions/${slug}.yml`, 'utf8');
  if (!data) {
    throw new Error(`Session with slug "${slug}" not found`);
  }

  const session = yaml.load(data) as SessionWithoutResolvedSlot;

  const t = await getTranslation(params, 'pages.sessions');
  const slotLabel = getSessionSlotLabel(session.slot, { params });
  const dateSession = session.slot.startsWith('day-1')
    ? '2027-03-11'
    : '2027-03-12';
  const urlOpenfeedback = `https://openfeedback.io/devfestnantes2027/${dateSession}/${session.openfeedbackId}?hideHeader=true&forceColorScheme=dark`;

  return (
    <>
      <TertiarySection slim>
        <Typography
          variant='h1'
          color='primary'
          className={classNames(
            'session-title',
            session.cancelled && 'cancelled'
          )}
        >
          {session.title}
        </Typography>
        {session.cancelled && (
          <Typography
            variant='h1'
            color='secondary'
            className={'cancelled-title'}
          >
            {t('cancelled')}
          </Typography>
        )}
        <Stack spacing={3}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography
              variant='h3'
              style={{ textTransform: 'capitalize', marginTop: '0' }}
            >
              {session.talkType}
            </Typography>
            <Tags tags={session.tags} color='white' />
            <SessionComplexity complexity={session.complexity} />
            <Flag lang={session.language} />
          </Stack>

          <Stack direction='row' spacing={1}>
            <AccessTime color='inherit' />
            <Typography variant='h3'>
              {slotLabel} {session.room}
            </Typography>
          </Stack>
          {session.speakers ? (
            <Stack spacing={1}>
              {session.speakers.map((speaker) => (
                <SpeakerCard key={speaker} speakerKey={speaker} />
              ))}
            </Stack>
          ) : (
            <></>
          )}

          {(session.youtube || session.slides) && (
            <Stack direction='row' spacing={3}>
              {session.youtube && (
                <MyLink
                  href={`https://www.youtube.com/watch?v=${session.youtube}&list=PLuZ_sYdawLiUHU4E1i5RrFsRN_lQcgPwT`}
                >
                  <Button
                    variant='contained'
                    color='secondary'
                    aria-label='Youtube'
                  >
                    <IconButton>
                      <YouTube />
                    </IconButton>
                    Youtube
                  </Button>
                </MyLink>
              )}
              {session.slides && (
                <MyLink href={session.slides}>
                  <Button
                    variant='contained'
                    color='secondary'
                    aria-label='Slides'
                  >
                    <IconButton>
                      <Slideshow />
                    </IconButton>
                    Slides
                  </Button>
                </MyLink>
              )}
            </Stack>
          )}
        </Stack>
      </TertiarySection>
      <SecondarySection slim>
        <Markdown content={session.abstract} />
      </SecondarySection>

      {session.openfeedbackId && (
        <iframe
          style={{
            marginTop: '20px',
          }}
          id='iframe-openfeedback'
          title='Openfeedback'
          src={urlOpenfeedback}
        />
      )}
    </>
  );
}

export type PartialSpeaker = Omit<Speaker, 'socials' | 'bio'>;

const SpeakerCard: React.FC<{ speakerKey: string }> = ({ speakerKey }) => {
  const files = fs.readdirSync('data/speakers');
  const speakersYaml = files.map((f) =>
    fs.readFileSync('data/speakers/' + f, 'utf8')
  );
  const speaker = speakersYaml
    .map((yamlContent) => yaml.load(yamlContent) as Speaker)
    .filter((speaker) => speaker.key === speakerKey)[0];

  return (
    <MyLink href={'/speakers/' + speaker.key}>
      <Card
        sx={{
          maxWidth: '400px',
          padding: '5px',
          minHeight: '75px',
          color: 'var(--tertiary)',
          backgroundColor: 'var(--primary)',
          border: '1px solid white',
          borderLeft: '5px solid var(--secondary)',
        }}
      >
        <Stack
          direction='row'
          spacing={5}
          alignItems='center'
          sx={{ minHeight: '75px', paddingLeft: '10px' }}
        >
          <AvatarSpeaker speaker={speaker} size='medium' noLink />
          <Stack direction='column' spacing={1} justifyContent='center'>
            <Typography variant='h4' color='inherit' style={{ color: 'white' }}>
              {speaker.name}
            </Typography>
            <span
              style={{ color: 'var(--tertiary-darker)', marginBottom: '0' }}
            >
              {speaker.company}
            </span>
            <span style={{ color: 'var(--tertiary-darker)', marginTop: '0' }}>
              {speaker.city}
            </span>
          </Stack>
        </Stack>
      </Card>
    </MyLink>
  );
};

async function getSessionSlotLabel(
  slotKey: string,
  { params }: CommonParams
): Promise<string> {
  const t = await getTranslation(params, 'pages.schedule');
  const slot = Slots.slots.find((s) => s.key == slotKey);
  const slotDay = slotKey.startsWith('day-1') ? t('day1') : t('day2');
  return `${slotDay} ${slot?.start}`;
}
