# Editorial image sources

The editorial photographs came from the image folder supplied for this site on 10 September 2026. The source filenames identify Unsplash photographers; the repository contains only cropped, compressed WebP exports. Confirm the intended usage rights with the agency before public launch. The branded home hero was supplied separately by Francorosso on 23 September 2026.

| Export | Supplied original | Placement |
| --- | --- | --- |
| `journey-planning` | `element5-digital-h9eOO7W5m2s-unsplash.jpg` | Earlier home hero export, retained in the media library |
| `home-hero-plane` | `Francorosso Plane Wing logo Hero.png` | Home hero desktop and mobile still image; social-sharing JPEG |
| `conference-audience` | `headway-F2KRf_QfCqw-unsplash.jpg` | Home MICE section |
| `corporate-event` | `priscilla-du-preez-k3RZK--S-kk-unsplash.jpg` | Business and MICE hero |
| `traveler-at-doorway` | `mantas-hesthaven-_g1WdcKcV3w-unsplash.jpg` | Services hero |
| `flight-above-clouds` | `nils-nedel-ONpGBpns3cs-unsplash.jpg` | Travel insurance hero |
| `kenyan-savanna` | `harshil-gudka-kfxEUCTUeyg-unsplash.jpg` | About page history section |
| `travelers-on-trail` | `luke-porter-NEqEC7qa9FM-unsplash.jpg` | Home why-us photo columns |
| `journey-map` | `chris-lawton-duQ1ulzTJbM-unsplash.jpg` | Home why-us photo columns |
| `airport-concourse` | `joseph-barrientos-JGhje7WBHdg-unsplash.jpg` | Home why-us photo columns |
| `balloon-at-sunrise` | `sutirta-budiman-kjOBqwMUnWw-unsplash.jpg` | Home why-us photo columns |
| `mount-fuji-pagoda` | `david-edelstein-N4DbvTUDikw-unsplash.jpg` | Home why-us photo columns |
| `savanna-at-sunset` | `harshil-gudka-kfxEUCTUeyg-unsplash.jpg` | Home why-us photo columns |

The original editorial exports have 640 px and 1280 px versions; `Figure.astro` supplies the smaller version through `srcset`. The home why-us photos are square 320 px and 640 px exports with responsive `srcset`. To regenerate those, run `node scripts/prepare-editorial-images.mjs <source-folder>` with the original folder available locally. The home hero uses a 1600 × 900 WebP, a 720 × 1280 crop, and a 1200 × 630 JPEG for social sharing from the separately supplied branded PNG; the original PNG is not committed.
