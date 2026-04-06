import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import type { Session } from '@/types/session';
import type { Slot } from '@/types/slots';
import Slots from '../../data/slots.json';

const sessionsDirectory = path.join(process.cwd(), 'data/sessions');
const typedSlots = Slots.slots as Slot[];

let allSessionsCache: Session[] | null = null;
let sessionsBySpeakerCache: Map<string, Session[]> | null = null;

export function getAllSessions(): Session[] {
  if (allSessionsCache) {
    return allSessionsCache;
  }

  const filenames = fs.readdirSync(sessionsDirectory);

  allSessionsCache = filenames
    .filter((name) => name.endsWith('.yaml') || name.endsWith('.yml'))
    .map((filename) => {
      const fullPath = path.join(sessionsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const sessionWithoutResolvedSlot = yaml.parse(fileContents);

      const resolvedSlot = typedSlots.find(
        (slot) => slot.key === sessionWithoutResolvedSlot.slot
      );

      if (!resolvedSlot) {
        throw new Error(
          `Slot not found for session ${sessionWithoutResolvedSlot.key}: ${sessionWithoutResolvedSlot.slot}`
        );
      }

      return {
        ...sessionWithoutResolvedSlot,
        slot: resolvedSlot,
      } as Session;
    });

  return allSessionsCache;
}

export function getSessionsBySpeaker(speakerSlug: string): Session[] {
  if (!sessionsBySpeakerCache) {
    sessionsBySpeakerCache = new Map();
    const allSessions = getAllSessions();

    allSessions.forEach((session) => {
      session.speakers.forEach((speaker) => {
        if (!sessionsBySpeakerCache!.has(speaker)) {
          sessionsBySpeakerCache!.set(speaker, []);
        }
        sessionsBySpeakerCache!.get(speaker)!.push(session);
      });
    });
  }

  return sessionsBySpeakerCache.get(speakerSlug) || [];
}

export function getSessionBySlug(slug: string): Session | null {
  const filenames = fs.readdirSync(sessionsDirectory);

  const filename = filenames.find((name) => {
    const fileSlug = name.replace(/\.ya?ml$/, '');
    return fileSlug === slug;
  });

  if (!filename) {
    return null;
  }

  const fullPath = path.join(sessionsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const sessionWithoutResolvedSlot = yaml.parse(fileContents);

  const resolvedSlot = typedSlots.find(
    (slot) => slot.key === sessionWithoutResolvedSlot.slot
  );

  if (!resolvedSlot) {
    throw new Error(
      `Slot not found for session ${sessionWithoutResolvedSlot.key}: ${sessionWithoutResolvedSlot.slot}`
    );
  }

  return {
    ...sessionWithoutResolvedSlot,
    slot: resolvedSlot,
  } as Session;
}
