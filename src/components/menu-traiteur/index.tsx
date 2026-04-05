'use client';

import { Check, Close, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import MenuFR from '../../../data/menu/menu-traiteur.json';
import { Allergene } from './schema_menu';
import { MyLink } from '../commun/link';
import { PrimarySection, TertiarySection } from '../commun/section/sectionType';
import './styles.scss';
import translationsFR from '@/locales/fr/translation.json';
import translationsEN from '@/locales/en/translation.json';

const ALLERGENES: Allergene[] = [
  'gluten',
  'crustaces',
  'oeufs',
  'poissons',
  'arachides',
  'soja',
  'lactose',
  'fruits-a-coques',
  'celeri',
  'moutarde',
  'sesame',
  'sulfites',
  'lupin',
  'mollusques',
];

interface MenuTraiteurProps {
  locale: string;
}

export const MenuTraiteur: React.FC<MenuTraiteurProps> = ({ locale }) => {
  const refVendredi = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (
      refVendredi.current &&
      new Date().toLocaleDateString('fr') === '12/03/2027'
    ) {
      refVendredi.current.scrollIntoView();
    }
  }, [refVendredi]);
  return (
    <>
      {Object.entries(MenuFR).map(([jour, sectionsJour], i) => {
        const jourEn = jour === 'Mercredi' ? 'Wednesday' : 'Thursday';
        return (
          <PrimarySection padding='none' key={jour}>
            {i !== 0 && <Divider />}
            <Typography
              variant='h2'
              ref={jour == 'Vendredi' ? refVendredi : null}
            >
              {locale == 'fr' ? jour : jourEn}
            </Typography>
            {sectionsJour.map((section) => (
              <SectionMenu
                key={section.titreFR}
                section={section}
                locale={locale}
              />
            ))}
          </PrimarySection>
        );
      })}
      <TertiarySection padding='none'>
        <MyLink
          href='https://www.lecarredesdelices.com/'
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Image
            alt='La Maison Hebel'
            src='/images/logo-lcdd.jpg'
            width={368}
            height={250}
            style={{
              objectFit: 'contain',
              borderRadius: '20px',
            }}
          />
        </MyLink>
      </TertiarySection>
    </>
  );
};

type TypeSectionMenu = (typeof MenuFR)['Jeudi'][0];

const SectionMenu: React.FC<{ section: TypeSectionMenu; locale: string }> = ({
  section,
  locale,
}) => {
  const keyTitre = locale === 'fr' ? 'titreFR' : 'titreEN';
  return (
    <Box key={section.titreFR}>
      <Typography
        variant='h3'
        style={{ marginTop: '20px', marginBottom: '5px' }}
      >
        {section[keyTitre]}
      </Typography>
      {section.plats.map((plat) => (
        <Accordion key={plat.titreFR}>
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: 'white' }} />}
            aria-controls='voir les allergenes'
            style={{
              backgroundColor: 'var(--secondary)',
            }}
          >
            <Typography variant='h4'>{plat[keyTitre]}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: 'var(--primary)',
            }}
          >
            <AllergenesPlat plat={plat} locale={locale} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

type TypePlat = TypeSectionMenu['plats'][0];
const AllergenesPlat: React.FC<{ plat: TypePlat; locale: string }> = ({
  plat,
  locale,
}) => {
  return (
    <Stack direction='row' justifyContent='center' flexWrap='wrap'>
      {plat.vege && (
        <IndicateurAllergenes
          allergene='vegetarien'
          isKO={false}
          isVege={true}
          locale={locale}
        />
      )}
      {plat.vegan && (
        <IndicateurAllergenes
          allergene='vegan'
          isKO={false}
          isVege={true}
          locale={locale}
        />
      )}
      {ALLERGENES.filter((allergene) =>
        plat.allergenes.includes(allergene)
      ).map((allergene) => (
        <IndicateurAllergenes
          allergene={allergene}
          isKO={true}
          key={allergene}
          isVege={false}
          locale={locale}
        />
      ))}
      {!plat.vege && (
        <IndicateurAllergenes
          allergene='vegetarien'
          isKO={true}
          isVege={true}
          locale={locale}
        />
      )}
      {!plat.vegan && (
        <IndicateurAllergenes
          allergene='vegan'
          isKO={true}
          isVege={true}
          locale={locale}
        />
      )}
      {ALLERGENES.filter(
        (allergene) => !plat.allergenes.includes(allergene)
      ).map((allergene) => (
        <IndicateurAllergenes
          allergene={allergene}
          isKO={false}
          key={allergene}
          isVege={false}
          locale={locale}
        />
      ))}
    </Stack>
  );
};

const IndicateurAllergenes: React.FC<{
  allergene: Allergene | 'vegetarien' | 'vegan';
  isKO: boolean;
  isVege: boolean;
  locale: string;
}> = ({ allergene, isKO, isVege, locale }) => {
  // Sélection des traductions en fonction de la locale
  const translations = locale === 'fr' ? translationsFR : translationsEN;

  const allergeneName =
    translations.pages.menu.allergenes[allergene] || allergene;

  return (
    <Box
      key={allergene}
      className={classNames(
        'allergene',
        isKO && !isVege && 'allergeneKO',
        isVege && !isKO && 'allergeneVege'
      )}
    >
      <Stack
        alignItems='center'
        width='75px'
        height='100%'
        justifyContent='space-between'
      >
        <Typography
          variant='subtitle1'
          textAlign='center'
          style={{
            lineHeight: '1',
            fontSize: '0.8rem',
          }}
        >
          {allergeneName}
        </Typography>
        {isKO ? <Close /> : <Check />}
      </Stack>
    </Box>
  );
};
