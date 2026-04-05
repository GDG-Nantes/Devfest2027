import { Typography } from '@mui/material';
import { PartnersList } from '@/components/partners/partners';
import { CommonParams } from '@/types';
import { partnersByTypes, PartnerType } from '../../../types/partners/partnersByTypes';
import { TertiarySection } from '@/components/commun/section/sectionType';
import { getTranslation } from '@/i18n/i18n';

export default async function PartnersPage({ params }: CommonParams) {
  let types = Object.keys(partnersByTypes) as PartnerType[];
  const t = await getTranslation(params);
  
  types = types.filter((type) => partnersByTypes[type].some((partner) => !partner.hidden));
  return (
    <div>
      <h1>{t('pages.partners.partners')}</h1>
        {types.map((type) => (
          <TertiarySection key={type} fullWidth={true} style={{marginBottom: '50px'}}>
            <div key={type}>
              <Typography
                variant='h2'
              >
                {t('pages.partners.' + type.toLowerCase())}
              </Typography>
              <PartnersList params={params} partnerType={type} />
            </div>
          </TertiarySection>
        ))}
    </div>
  )
}
