/**
 * Post-build script that generates redirect HTML files for locale-less URLs.
 *
 * For each page under the default locale (e.g. out/fr/team.html),
 * creates a redirect file at the root (e.g. out/team.html) that redirects
 * to the default locale version via <meta http-equiv="refresh">.
 *
 * This ensures URLs like /team redirect to /fr/team.
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const defaultLocale = 'fr';
const localeDir = path.join(outDir, defaultLocale);

function generateRedirectHtml(targetPath) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/${defaultLocale}/${targetPath}">
  <link rel="canonical" href="/${defaultLocale}/${targetPath}">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="/${defaultLocale}/${targetPath}">/${defaultLocale}/${targetPath}</a></p>
</body>
</html>`;
}

function scanDir(dir, base) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    // Skip __next metadata directories
    if (entry.name.startsWith('__next')) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanDir(fullPath, base);
    } else if (entry.name.endsWith('.html')) {
      const relativePath = path.relative(base, fullPath);
      const targetInOut = path.join(outDir, relativePath);

      // Only create redirect if the file doesn't already exist at root level
      if (!fs.existsSync(targetInOut)) {
        // Ensure parent directories exist
        const parentDir = path.dirname(targetInOut);
        fs.mkdirSync(parentDir, { recursive: true });

        // Target path for the redirect URL (without .html extension)
        const urlPath = relativePath.replace(/\.html$/, '').replace(/\\/g, '/');
        fs.writeFileSync(targetInOut, generateRedirectHtml(urlPath));
        console.log(`  redirect: /${urlPath} -> /${defaultLocale}/${urlPath}`);
      }
    }
  }
}

console.log('Generating locale-less redirect pages...');
scanDir(localeDir, localeDir);
console.log('Done.');
