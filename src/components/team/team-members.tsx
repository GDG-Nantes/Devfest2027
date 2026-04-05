import { shuffleArray } from '@/helpers/array';
import { SocialLink } from '@/components/commun/socials/socials';
import { teamMembers } from '../../types/team/team';
import { Box, Grid, List, Typography } from '@mui/material';
import '../commun/avatar/avatar.scss';
import React from 'react';
import { MyAvatar } from '@/components/commun/avatar/avatar';
import './team-member.scss';

export const TeamMembers: React.FC = async () => {
  const shuffledMembers = shuffleArray(teamMembers);

  return (
    <Grid container columnSpacing={3} rowSpacing={10} justifyContent='center'>
      {shuffledMembers.map(async (member) => (
        <Grid
          maxWidth={500}
          height='100%'
          width='100%'
          key={member.firstName}
          size={{
            xs: 12,
            sm: 12,
            md: 6,
            lg: 4,
          }}
        >
          <Box className='team-member'>
            <MyAvatar
              src={member.image.default.src}
              alt={`${member.firstName}'s picture`}
              width={100}
              height={100}
            />

            <div className='member-info'>
              <Typography variant='h3'>
                {member.firstName} {member.lastName.toUpperCase()}
              </Typography>
              <Typography variant='h4'>{member.title}</Typography>
              <List>
                {member.socials.map((social) => (
                  <SocialLink key={social.type} {...social} />
                ))}
              </List>
            </div>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
