import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const sourceDir = process.argv[2];
if (!sourceDir) {
  throw new Error('Usage: node scripts/prepare-editorial-images.mjs <source-folder>');
}

const outputDir = new URL('../public/media/editorial/', import.meta.url);
await fs.mkdir(outputDir, { recursive: true });

const images = [
  { source: 'element5-digital-h9eOO7W5m2s-unsplash.jpg', name: 'journey-planning', ratio: 5 / 6 },
  { source: 'headway-F2KRf_QfCqw-unsplash.jpg', name: 'conference-audience', ratio: 4 / 3 },
  { source: 'priscilla-du-preez-k3RZK--S-kk-unsplash.jpg', name: 'corporate-event', ratio: 4 / 5 },
  { source: 'mantas-hesthaven-_g1WdcKcV3w-unsplash.jpg', name: 'traveler-at-doorway', ratio: 4 / 5 },
  { source: 'nils-nedel-ONpGBpns3cs-unsplash.jpg', name: 'flight-above-clouds', ratio: 4 / 5 },
  { source: 'harshil-gudka-kfxEUCTUeyg-unsplash.jpg', name: 'kenyan-savanna', ratio: 4 / 3 },
];

for (const image of images) {
  for (const width of [640, 1280]) {
    const output = new URL(`${image.name}-${width}.webp`, outputDir);
    await sharp(path.join(sourceDir, image.source))
      .rotate()
      .resize(width, Math.round(width / image.ratio), { fit: 'cover', position: 'attention' })
      .webp({ quality: 78, effort: 6 })
      .toFile(fileURLToPath(output));
    const { size } = await fs.stat(output);
    console.log(`${image.name}-${width}.webp ${Math.round(size / 1024)} KB`);
  }
}
