import {
  Facebook,
  GitHub,
  Instagram,
  Language,
  LinkedIn,
  Twitter,
  YouTube,
} from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React from 'react';
import { MyLink } from '@/components/commun/link';
import Bluesky from '@/images/social/bluesky.svg';
import Image from 'next/image';

export type SocialWithLogin =
  | 'linkedin'
  | 'github'
  | 'twitter'
  | 'youtube'
  | 'facebook'
  | 'instagram'
  | 'bluesky';

export type SocialData =
  | {
      type: SocialWithLogin;
      login: string;
    }
  | { type: 'website'; url: string };

export const SocialLink: React.FC<
  SocialData & {
    withLogin?: boolean;
  }
> = ({ withLogin, ...social }) => {
  if (
    (social.type != 'website' && social.login == null) ||
    (social.type == 'website' && social.url == null)
  ) {
    return null;
  }

  let icon;
  let url: string;

  if (social.type === 'linkedin') {
    icon = <LinkedIn />;
    url = `https://www.linkedin.com/in/${social.login}`;
  } else if (social.type === 'github') {
    icon = <GitHub />;
    url = `https://github.com/${social.login}`;
  } else if (social.type === 'twitter') {
    icon = <Twitter />;
    url = `https://twitter.com/${social.login}`;
  } else if (social.type === 'youtube') {
    icon = <YouTube />;
    url = `https://youtube.com/user/${social.login}`;
  } else if (social.type === 'facebook') {
    icon = <Facebook />;
    url = `https://facebook.com/${social.login}`;
  } else if (social.type === 'instagram') {
    icon = <Instagram />;
    url = `https://www.instagram.com/${social.login}`;
  } else if (social.type === 'website') {
    icon = <Language />;
    url = social.url;
  } else if (social.type === 'bluesky') {
    icon = <Image src={Bluesky} alt={'logo bluesky'} width={22} height={22} />;
    url = `https://bsky.app/profile/${social.login}${social.login.includes('.') ? '' : '.bsky.social'}`;
  } else {
    url = '';
  }

  return (
    <MyLink href={url} aria-label={social.type}>
      {withLogin ? (
        <Button color='primary' variant='text' size='small' startIcon={icon}>
          {social.type != 'website' &&
            social.type != 'linkedin' &&
            social.login}
          {social.type == 'website' && 'Website'}
        </Button>
      ) : (
        <IconButton aria-label={social.type}>{icon}</IconButton>
      )}
    </MyLink>
  );
};
