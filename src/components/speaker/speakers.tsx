import { shuffleArray } from '@/helpers/array';
import { Grid, Typography } from '@mui/material';
import '../commun/avatar/avatar.scss';
import React from 'react';
import { MyAvatar } from '@/components/commun/avatar/avatar';
import { MyLink } from '@/components/commun/link';
import './speakers.scss';
import { Speaker } from '@/types/schedule/speaker';

interface SpeakersListProps {
  speakers: Speaker[];
}

export const SpeakersList: React.FC<SpeakersListProps> = async ({
  speakers,
}) => {
  // Filtrer les speakers pour retirer les anonymes
  const filteredSpeakers = speakers.filter(
    (speaker) =>
      !speaker.name.toLowerCase().includes('anonymous') &&
      !speaker.key.toLowerCase().includes('anonymous')
  );
  const shuffledSpeakers = shuffleArray(filteredSpeakers);

  return (
    <Grid container columnSpacing={3} rowSpacing={6} justifyContent='center'>
      {shuffledSpeakers.map(async (speaker) => {
        const image = speaker.photoUrl
          ? await import(`@/images/speakers/${speaker.photoUrl}`)
          : null;

        return (
          <Grid
            maxWidth={250}
            height='100%'
            width='100%'
            key={speaker.key}
            size={{
              xs: 6,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <MyLink href={`/speakers/${speaker.key}`}>
              <div className='speaker-item'>
                <div className='speaker-avatar-container'>
                  <MyAvatar
                    src={
                      image ? image.default.src : '/images/speakers/default.jpg'
                    }
                    alt={`${speaker.name}'s picture`}
                    size={120}
                    className='speaker-avatar'
                  />
                </div>

                <div className='speaker-info'>
                  <Typography variant='h6' className='speaker-name'>
                    {speaker.name}
                  </Typography>
                  {speaker.company && (
                    <Typography
                      variant='body1'
                      className='speaker-company'
                      color='default'
                    >
                      {speaker.company}
                    </Typography>
                  )}
                  {speaker.city && (
                    <Typography
                      variant='body2'
                      className='speaker-city'
                      color='default'
                    >
                      {speaker.city}
                    </Typography>
                  )}
                </div>
              </div>
            </MyLink>
          </Grid>
        );
      })}
    </Grid>
  );
};
