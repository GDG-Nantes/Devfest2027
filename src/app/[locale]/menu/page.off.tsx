import React from 'react';
import { MenuTraiteur } from '@/components/menu-traiteur';
import { CommonParams } from '@/types';

const MenuTraiteurPage = async ({ params }: CommonParams) => {
  const { locale } = await params;
  return <MenuTraiteur locale={locale} />;
};

export default MenuTraiteurPage;
