import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises';

let configuredOrigin = process.env.PUBLIC_SITE_URL;
if (!configuredOrigin) {
  try {
    const envFile = await readFile('.env', 'utf8');
    const match = envFile.match(/^PUBLIC_SITE_URL\s*=\s*(.*)\s*$/m);
    configuredOrigin = match?.[1]?.trim().replace(/^['"]|['"]$/g, '');
  } catch { /* .env is optional; the deployment environment may set the value instead. */ }
}
if (!configuredOrigin) {
  console.info('PUBLIC_SITE_URL is unset; skipping sitemap until the final site origin is configured.');
  process.exit(0);
}

let origin;
try {
  const url = new URL(configuredOrigin);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) throw new Error('Expected an HTTPS origin without a path.');
  origin = url.origin;
} catch (error) {
  console.error(`Invalid PUBLIC_SITE_URL: ${error.message}`);
  process.exit(1);
}

await mkdir('dist', { recursive: true });
const pages = ['', 'privacy', 'terms'];
const entries = pages.map((path) => `  <url><loc>${origin}/${path}</loc></url>`).join('\n');
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`);
await appendFile('dist/robots.txt', `Sitemap: ${origin}/sitemap.xml\n`);
console.info(`Wrote sitemap.xml for ${origin}.`);
