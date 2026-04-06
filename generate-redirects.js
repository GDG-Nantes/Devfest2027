/**
 * Post-build script that copies default-locale pages to locale-less URLs.
 *
 * Astro builds with prefixDefaultLocale: true, so French pages are at
 * out/fr/team/index.html, out/fr/blog/index.html, etc.
 *
 * This script copies each HTML file from out/fr/ to the corresponding
 * root path (e.g. out/team/index.html), so that locale-less URLs like
 * /team serve the French page directly -- no meta-refresh redirect,
 * no visible flash.
 *
 * The /fr/ URLs continue to work as before (Astro generates them).
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const defaultLocale = 'fr';
const localeDir = path.join(outDir, defaultLocale);

function copyDir(dir, base) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      copyDir(fullPath, base);
    } else if (entry.name.endsWith('.html')) {
      const relativePath = path.relative(base, fullPath);
      const targetPath = path.join(outDir, relativePath);

      // Only copy if the file doesn't already exist at root level
      if (!fs.existsSync(targetPath)) {
        // Ensure parent directories exist
        const parentDir = path.dirname(targetPath);
        fs.mkdirSync(parentDir, { recursive: true });

        fs.copyFileSync(fullPath, targetPath);
        const urlPath = relativePath.replace(/\\/g, '/');
        console.log(`  copy: /${defaultLocale}/${urlPath} -> /${urlPath}`);
      }
    }
  }
}

if (!fs.existsSync(localeDir)) {
  console.log(`No ${defaultLocale}/ directory found in output. Nothing to do.`);
  process.exit(0);
}

console.log(`Copying /${defaultLocale}/ pages to root for locale-less URLs...`);
copyDir(localeDir, localeDir);
console.log('Done.');
