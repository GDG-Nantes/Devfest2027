export type Slots = {
  slots: Slot[];
};

export type Slot = {
  key: string;
  start: string;
  type: SlotType;
  display: {
    row: number;
    size: number;
    notForCodelab?: boolean;
  };
};

export type SlotType =
  | 'opening'
  | 'keynote'
  | 'lunch'
  | 'break'
  | 'quickie'
  | 'conference'
  | 'codelab'
  | 'party';
