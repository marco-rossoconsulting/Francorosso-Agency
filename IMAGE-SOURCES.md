# Editorial image sources

These photographs came from the image folder supplied for this site on 10 September 2026. The source filenames identify Unsplash photographers; the repository contains only cropped, compressed WebP exports. Confirm the intended usage rights with the agency before public launch.

| Export | Supplied original | Placement |
| --- | --- | --- |
| `journey-planning` | `element5-digital-h9eOO7W5m2s-unsplash.jpg` | Home hero |
| `conference-audience` | `headway-F2KRf_QfCqw-unsplash.jpg` | Home MICE section |
| `corporate-event` | `priscilla-du-preez-k3RZK--S-kk-unsplash.jpg` | Business and MICE hero |
| `traveler-at-doorway` | `mantas-hesthaven-_g1WdcKcV3w-unsplash.jpg` | Services hero |
| `flight-above-clouds` | `nils-nedel-ONpGBpns3cs-unsplash.jpg` | Travel insurance hero |
| `kenyan-savanna` | `harshil-gudka-kfxEUCTUeyg-unsplash.jpg` | About page history section |

Each image has 640 px and 1280 px versions. The page content points to the 1280 px file and `Figure.astro` supplies the 640 px version through `srcset`. To regenerate, run `node scripts/prepare-editorial-images.mjs <source-folder>` with the original folder available locally. The source photos are not committed.
