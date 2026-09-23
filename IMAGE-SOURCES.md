# Editorial image sources

These photographs came from the image folder supplied for this site on 10 September 2026. The source filenames identify Unsplash photographers; the repository contains only cropped, compressed WebP exports. Confirm the intended usage rights with the agency before public launch.

| Export | Supplied original | Placement |
| --- | --- | --- |
| `journey-planning` | `element5-digital-h9eOO7W5m2s-unsplash.jpg` | Earlier home hero export, retained in the media library |
| `home-hero-doorway` | `mantas-hesthaven-_g1WdcKcV3w-unsplash.jpg` | Home hero responsive poster |
| `home-hero-desktop.mp4`, `home-hero-mobile.mp4` | `mantas-hesthaven-_g1WdcKcV3w-unsplash.jpg`, `sutirta-budiman-kjOBqwMUnWw-unsplash.jpg`, `nils-nedel-ONpGBpns3cs-unsplash.jpg` | Home hero silent photo motion sequence |
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

The original editorial exports have 640 px and 1280 px versions; `Figure.astro` supplies the smaller version through `srcset`. The home why-us photos are square 320 px and 640 px exports with responsive `srcset`. To regenerate those, run `node scripts/prepare-editorial-images.mjs <source-folder>` with the original folder available locally. The home hero adds 1600 × 900 and 720 × 1280 WebP posters, plus two 13-second H.264 loops made from the supplied stills. The poster loads first; video starts after the page loads and is skipped for reduced-motion and save-data preferences. The source photos are not committed.
