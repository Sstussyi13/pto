// scripts/generate-sitemap.js

import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

const BASE_URL = process.env.SITE_URL || 'https://example.com';

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/services', changefreq: 'weekly', priority: 0.9 },
  { url: '/steps', changefreq: 'monthly', priority: 0.8 },
  { url: '/contacts', changefreq: 'monthly', priority: 0.8 },
];

const stream = new SitemapStream({ hostname: BASE_URL });

streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
  const output = createWriteStream('./public/sitemap.xml');
  output.write(data.toString());
  output.end();
  console.log('✅ sitemap.xml успешно создан');
});
