import Partners from '../../data/partners.json';

export type Partner = {
  id: string;
  title: string;
  image: string;
  website: string;
  hidden?: boolean;
};

export type PartnerType =
  | 'PXL'
  | 'Platinium'
  | 'Gold'
  | 'Virtual'
  | 'Velotypie';

export const partnersByTypes: Record<PartnerType, Partner[]> = Partners;
