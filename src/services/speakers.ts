import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import type { Speaker } from '@/types/speaker';

const speakersDirectory = path.join(process.cwd(), 'data/speakers');

export function getAllSpeakers(): Speaker[] {
  const filenames = fs.readdirSync(speakersDirectory);

  return filenames
    .filter((name) => name.endsWith('.yaml') || name.endsWith('.yml'))
    .map((filename) => {
      const fullPath = path.join(speakersDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return yaml.parse(fileContents) as Speaker;
    });
}

export function getSpeakerBySlug(slug: string): Speaker | null {
  try {
    const fullPath = path.join(speakersDirectory, `${slug}.yaml`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return yaml.parse(fileContents) as Speaker;
  } catch {
    try {
      const fullPath = path.join(speakersDirectory, `${slug}.yml`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return yaml.parse(fileContents) as Speaker;
    } catch {
      return null;
    }
  }
}
