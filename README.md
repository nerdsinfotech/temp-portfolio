# Nerdsinfotech — Portfolio Site

Source for the Nerdsinfotech studio portfolio. Built with React + TypeScript + Tailwind CSS, animated with GSAP/ScrollTrigger.

## Structure

```
src/
  App.tsx                 Main page — all sections
  components/
    BootLoader.tsx         Premium percentage-counter preloader
    Cursor.tsx              Custom cursor with hover labels
    Atmosphere.tsx          Film-grain + vignette overlay
    GlitchHeading.tsx       Scroll-triggered word mask-reveal headings
    Magnetic.tsx             Magnetic hover button wrapper
    TiltCard.tsx             3D tilt-on-hover card wrapper
    AvatarBadge.tsx          Team icon avatar with orbit ring
    GlobeAccent.tsx          Rotating wireframe globe (brand motif)
    MeshGradient.tsx         Ambient animated gradient-mesh canvas
    IndexNav.tsx             Fixed side index nav with scrollspy
  assets/
    logo.png                 Uploaded brand logo
    logoData.ts               Logo pre-encoded as a base64 data URI (used at runtime)
  index.css                  Design tokens (colors, fonts) + Tailwind
index.html                   Entry HTML (Parcel build target)
```

## Local development

This project has two build paths available:

**Vite (recommended for local dev — fast HMR)**
```bash
pnpm install
pnpm dev
```

**Parcel** is used to produce the single-file distributable — see below.

## Producing a single-file HTML build

The deployed/shared version of this site is a single self-contained `bundle.html` with all JS/CSS/images inlined (no external requests except Google Fonts). To reproduce it:

```bash
pnpm install
rm -rf dist bundle.html .parcel-cache
pnpm exec parcel build index.html --dist-dir dist --no-source-maps
pnpm exec html-inline dist/index.html > bundle.html
```

`bundle.html` can then be hosted anywhere as a static file, or opened directly in a browser.

## Notes

- The logo is embedded as a base64 data URI (`src/assets/logoData.ts`) rather than referenced as a file path, so it survives the `html-inline` step into `bundle.html` without breaking.
- Animations (hero pin, horizontal capability gallery, timeline draw) use GSAP's `ScrollTrigger` and are guarded behind the boot sequence completing (`booted` state in `App.tsx`).
- Reduced-motion is respected via `prefers-reduced-motion` in `index.css`.
