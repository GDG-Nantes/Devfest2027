export type Speaker = {
  key: string;
  name: string;
  feature?: boolean;
  city?: string;
  company?: string;
  companyLogo?: string;
  photoUrl?: string;
  socials: Social;
  bio?: string;
};

export type Social = {
  twitter?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  website?: string;
  bluesky?: string;
};
