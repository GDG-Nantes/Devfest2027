/* eslint-disable */
export type Allergene =
  | 'gluten'
  | 'crustaces'
  | 'oeufs'
  | 'poissons'
  | 'arachides'
  | 'soja'
  | 'lactose'
  | 'fruits-a-coques'
  | 'celeri'
  | 'moutarde'
  | 'sesame'
  | 'sulfites'
  | 'lupin'
  | 'mollusques';

export interface MenuTraiteur {
  [k: string]: SectionMenu[];
}
export interface SectionMenu {
  titreFR: string;
  titreEN: string;
  plats: Plat[];
}
export interface Plat {
  titreFR: string;
  titreEN: string;
  allergenes: Allergene[];
  vege?: boolean;
  vegan?: boolean;
}
