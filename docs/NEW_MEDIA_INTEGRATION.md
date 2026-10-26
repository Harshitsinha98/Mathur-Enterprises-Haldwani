# New media integration

- Registered 170 photographs from `new/` as `new-001` through `new-170` in `photos.json` for the site's responsive Sharp/WebP image pipeline.
- Added the photo IDs to the Moments collection so they are displayed in the dedicated, responsive `/media` gallery and use the existing tap-to-open lightbox.
- Added 5 MOV videos to the same page with native playback controls.
- Added a Home page entry point and search metadata for `/media`.

The source images and videos remain in `new/` with their original filenames. The normal build runs `npm run images` before bundling.
