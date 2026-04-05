/* ts-ignore @typescript-eslint/no-explicit-any */

import * as fs from 'fs';
import yaml from 'js-yaml';
import { Speaker } from '../src/types/schedule/speaker';
import planningData from './export-planning.json';
import slotsData from '../data/slots.json';
import { normalize, writeFile } from './helpers';
import * as rimraf from 'rimraf';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

const dumpOptions: yaml.DumpOptions = { lineWidth: -1 };

const outDirSpeakers = '../data/speakers';
const outDirSessions = '../data/sessions';
const outDirImages = '../src/images/speakers';

rimraf.sync(outDirSpeakers);
fs.mkdirSync(outDirSpeakers);

rimraf.sync(outDirSessions);
fs.mkdirSync(outDirSessions);

// rimraf.sync(outDirImages);
// fs.mkdirSync(outDirImages);

const slots = slotsData.slots;
const downloadErrors: { name: string; pictureUrl: string; reason: string }[] =
  [];

transformerSpeakers();
transformerSessions();

// Fonction pour télécharger une image
async function downloadImage(
  url: string,
  filepath: string,
  redirectCount = 0
): Promise<void> {
  if (redirectCount > 5) {
    throw new Error('Too many redirects');
  }

  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;

    protocol
      .get(url, (response) => {
        if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          // Handle redirect
          console.log(`Redirecting to ${response.headers.location}`);
          response.resume(); // Consume response data
          downloadImage(response.headers.location, filepath, redirectCount + 1)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (response.statusCode === 200) {
          const file = fs.createWriteStream(filepath);
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
          file.on('error', reject);
        } else {
          response.resume(); // Consume response data to free up memory
          reject(new Error(`Failed to download image: ${response.statusCode}`));
        }
      })
      .on('error', reject);
  });
}

// Fonction pour obtenir l'extension d'un fichier depuis une URL
function getImageExtension(url: string): string {
  const urlPath = new URL(url).pathname;
  const ext = path.extname(urlPath).toLowerCase();

  // Si pas d'extension détectée, essayer de deviner depuis les paramètres
  if (!ext && url.includes('raw=1')) {
    return '.jpg'; // Dropbox raw images are usually JPG
  }

  // Extensions d'images courantes
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
    return ext;
  }

  // Par défaut, utiliser .jpg
  return '.jpg';
}

function transformerSpeakers() {
  // Extraire tous les speakers uniques de toutes les sessions
  const allSpeakers = new Map<string, any>();

  planningData.sessions.forEach((session) => {
    if (session.proposal?.speakers) {
      session.proposal.speakers.forEach((speaker) => {
        if (!allSpeakers.has(speaker.id)) {
          allSpeakers.set(speaker.id, speaker);
        }
      });
    }
  });

  const promises = Array.from(allSpeakers.values()).map(async (speaker) => {
    const normalizedName = normalize(speaker.name || 'x-undefined');

    // Télécharger l'image si elle existe
    let imageFileName: string | null = null;
    if (speaker.picture) {
      try {
        const imageExtension = getImageExtension(speaker.picture);
        imageFileName = `${normalizedName}${imageExtension}`;
        const imagePath = path.join(outDirImages, imageFileName);

        // Télécharger l'image seulement si elle n'existe pas déjà
        if (!fs.existsSync(imagePath)) {
          console.log(
            `Downloading image for ${speaker.name}: ${speaker.picture}`
          );
          await downloadImage(speaker.picture, imagePath);
          console.log(`✓ Downloaded: ${imageFileName}`);
        } else {
          console.log(`✓ Image already exists: ${imageFileName}`);
        }
      } catch (error: any) {
        console.error(`✗ Failed to download image for ${speaker.name}:`, error);
        downloadErrors.push({
          name: speaker.name,
          pictureUrl: speaker.picture,
          reason: error.message,
        });
        imageFileName = null;
      }
    }

    const yamlData: Speaker = {
      key: normalizedName,
      name: speaker.name || 'x-undefined',
      company: speaker.company || undefined,
      companyLogo:
        speaker.company && speaker.company !== 'Freelance'
          ? `${normalize(speaker.company.toLowerCase())}.png`
          : undefined,
      city: speaker.location,
      photoUrl: imageFileName ? `${imageFileName}` : 'undefined.png',
      socials: {},
      bio: speaker.bio && speaker.bio.length > 1 ? speaker.bio : undefined,
    };

    // Traitement des liens sociaux
    if (speaker.socialLinks) {
      speaker.socialLinks.forEach((link: string) => {
        if (link.includes('twitter.com') || link.includes('x.com')) {
          yamlData.socials.twitter = link
            .replace('https://twitter.com/', '')
            .replace('https://x.com/', '')
            .replace('@', '');
        } else if (link.includes('github.com')) {
          yamlData.socials.github = link.replace('https://github.com/', '');
        } else if (link.includes('linkedin.com')) {
          yamlData.socials.linkedin = link.replace(/https:\/\/.+linkedin\.com\/[^/]+\//, '').replace(/\/$/, '');
        }
      });
    }

    const speakerData = `---
${yaml.dump(yamlData, dumpOptions)}`;

    return writeFile(`${outDirSpeakers}/${normalizedName}.yml`, speakerData);
  });

  // Créer le fichier des emails
  const emails = Array.from(allSpeakers.values())
    .map((s) => s.email)
    .join('\n');
  if (emails) {
    fs.writeFileSync('emails_speakers.md', emails);
  }

  Promise.allSettled(promises).then(() => {
    console.log('speakers ok');

    if (downloadErrors.length > 0) {
      console.log('\n--- Image Download Errors ---');
      downloadErrors.forEach((err) => {
        console.log(`- Speaker: ${err.name}`);
        console.log(`  URL: ${err.pictureUrl}`);
        console.log(`  Reason: ${err.reason}`);
      });
      console.log('---------------------------\n');
    }
  });
}

function findSlot(start: string, talkType: string) {
  const sessionDate = new Date(start);
  const sessionTime = start.substring(11, 16); // HH:mm

  const day = sessionDate.getUTCDate() === 4 ? 1 : 2;

  const slot = slots.find((s) => {
    if (!s.key.startsWith(`day-${day}`)) {
      return false;
    }
    if (s.type !== talkType) {
      return false;
    }
    return s.start === sessionTime;
  });

  return slot?.key;
}

function transformerSessions() {
  const promises = planningData.sessions
    .filter((session) => session.proposal)
    .map((session) => {
      const normalizedName = normalize(session.title);
      console.log(normalizedName);

      const talkType = getTalkType(session.proposal!.formats);
      const yamlData: any = {
        key: normalizedName,
        title: session.title,
        language: getLanguage(session.language ? [session.language] : []),
        talkType: talkType,
        tags: getCategory(session.proposal!.categories),
        complexity: getComplexity(session.proposal!.level),
        speakers: getSpeakers(session.proposal!.speakers),
        slot: findSlot(session.start, talkType) || 'day-x-conference-x',
        room: session.track,
        abstract: session.proposal!.abstract,
      };

      const sessionData = `---
${yaml.dump(yamlData, dumpOptions)}`;

      return writeFile(`${outDirSessions}/${normalizedName}.yml`, sessionData);
    });

  Promise.all(promises).then(() => console.log('sessions ok'));
}

function getTalkType(formats: any[]) {
  if (!formats || formats.length === 0) return 'conference';

  const format = formats[0];
  if (format.includes('Quickie')) {
    return 'quickie';
  } else if (format.includes('Conference')) {
    return 'conference';
  } else if (format.includes('Codelab')) {
    return 'codelab';
  }
  return 'conference';
}

function getLanguage(languages: string[]) {
  if (!languages || languages.length === 0) return 'French';
  return languages[0] === 'fr' ? 'French' : 'English';
}

function getCategory(categories: any[]) {
  if (!categories || categories.length === 0) return ['web'];

  const categoryMap = {
    'BigData & AI': 'bigdata_ai',
    'Cloud & DevOps': 'cloud_devops',
    Discovery: 'discovery',
    Languages: 'languages',
    Mobile: 'mobile',
    Security: 'security',
    'UX / UI': 'ux_ui',
    Web: 'web',
    'IoT and Hardware': 'iot_hardware',
  };

  const category = categories[0];
  for (const [key, value] of Object.entries(categoryMap)) {
    if (category.includes(key)) {
      return [value];
    }
  }

  return ['web'];
}

function getComplexity(level: string | undefined) {
  if (!level) return 'Intermediate';
  return level === 'BEGINNER'
    ? 'Beginner'
    : level === 'ADVANCED'
      ? 'Advanced'
      : 'Intermediate';
}

function getSpeakers(speakers: any[]) {
  return speakers
    .map((speaker) => normalize(speaker.name || 'x-undefined'))
    .sort((a: string, b: string) => a.localeCompare(b));
}
