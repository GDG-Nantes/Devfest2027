import type { RoomName } from './schedule';
import type { Slot } from './slots';

export type Session = {
  key: string;
  title: string;
  language: 'English' | 'French';
  talkType: 'quickie' | 'conference' | 'codelab';
  tags: string[];
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  speakers: string[];
  slot: Slot;
  room: RoomName;
  abstract: string;
  openfeedbackId?: string;
  youtube?: string;
  slides?: string;
  cancelled?: boolean;
};

export type SessionWithoutResolvedSlot = Omit<Session, 'slot'> & {
  slot: string;
};
