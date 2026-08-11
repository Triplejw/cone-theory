<p align="center">
  <img src="./public/cone-theory-wordmark.png" alt="Cone Theory" width="720" />
</p>

<p align="center">
  <strong>Built on angles. Made for cravings.</strong><br />
  An animated, responsive landing page for Cone Theory’s small-batch ice-cream brand.
</p>

<p align="center">
  <a href="https://cone-theory-live.vercel.app/">Live website</a>
  ·
  <a href="https://www.figma.com/design/xnv5wiOto4odb8jiQ2Trtv/Untitled?node-id=0-1&p=f&m=draw">Figma design</a>
  ·
  <a href="./ASSET_LICENSES.md">Asset licenses</a>
</p>

## Overview

Cone Theory is a single-page brand experience combining a geometric visual
language, editorial typography, product photography, and motion-led
interaction.

The site introduces the brand with a replayable film, presents the scoop menu
and current flavour lineup, explains the small-batch method, and closes with a
strong follow-the-brand call to action.

The application is statically exported for fast, portable Vercel deployment.
It has no database, API keys, or required environment variables.

## Experience highlights

- Supplied Cone Theory logo, wordmark, and intro film
- Centered responsive header lockup with an enlarged brand mark and wordmark
- Hover- and keyboard-driven navigation marker
- Once-per-session cinematic splash screen with manual replay controls
- Pointer-responsive hero artwork and animated geometric details
- Scroll-progress indicator and continuous brand ticker
- Clipped panels with continuous cherry-red borders
- Responsive flavour photography cards and mobile scroll snapping
- Scroll-driven section reveals in browsers that support them
- Touch-aware hover behavior and reduced-motion support
- Self-hosted fonts, Open Graph metadata, and a 1200 × 630 sharing card
- Fully static production output

## Page map

| Section | Purpose |
| --- | --- |
| Intro | Plays the supplied brand film and provides an immediate Enter site action |
| Hero | Introduces the Built on angles. Made for cravings. positioning |
| Scoop scale | Presents serving sizes and pricing |
| Flavours | Shows the current flavour hypotheses with licensed photography |
| Our method | Explains Cone Theory’s sourcing and small-batch principles |
| Find us | Points toward upcoming drops and serving locations |
| Footer | Provides navigation, replay controls, copyright, and attribution |

## Design system

The visual system is defined primarily through CSS custom properties in
app/globals.css.

### Colour palette

| Token | Value | Role |
| --- | --- | --- |
| --cream | #FFF3E2 | Primary page background |
| --cream-soft | #FFF8F2 | Soft neutral surface |
| --ice-100 | #FCB3C4 | Secondary ice-cream pink |
| --ice-300 | #F985A0 | Strong pink accent |
| --brand-red | #B50D2D | Primary actions, cards, sections, and brand emphasis |
| --cherry-mid | #880A13 | Borders and structural details |
| --cherry-dark | #5B070D | Deep interaction colour |
| --ink | #201B11 | Primary text and dark surfaces |
| --muted | #5B4040 | Supporting copy |
| --leaf | #1A6128 | Botanical accent |

### Typography

Fonts are self-hosted with next/font/local:

| Typeface | Use |
| --- | --- |
| League Spartan | Display headlines and large brand statements |
| Montserrat | Body copy and supporting text |
| Barlow Condensed | Navigation, labels, prices, buttons, and annotations |

The supplied Cone Theory wordmark is used as artwork rather than being
reconstructed with a substitute typeface.

### Shape and motion

The interface uses clipped polygons, angular borders, outlined type,
technical labels, and offset cards. Motion is built with CSS animations,
scroll-linked animation support, and small requestAnimationFrame interactions
instead of a large animation dependency.

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4 PostCSS pipeline
- Handcrafted global CSS and custom properties
- next/image with static-export-compatible unoptimized output
- next/font/local
- ESLint 9 with React, Hooks, accessibility, TypeScript, and Next.js rules
- Node’s built-in test runner
- pnpm 11
- GitHub Actions
- Vercel

## Project structure

~~~text
.
├── .github/workflows/
│   └── production-verification.yml
├── app/
│   ├── fonts/                     # Self-hosted font files
│   ├── globals.css                # Tokens, layout, motion, and responsive rules
│   ├── layout.tsx                 # Fonts, icons, and social metadata
│   └── page.tsx                   # Content and client-side interactions
├── public/
│   ├── cone-theory-intro.mp4      # Splash-screen film
│   ├── cone-theory-logo.png       # Geometric brand artwork
│   ├── cone-theory-wordmark.png   # Cone Theory wordmark
│   ├── flavour-*.jpg              # Licensed flavour photography
│   └── og-v2.jpg                  # Active 1200 × 630 sharing image
├── tests/
│   └── rendered-html.test.mjs     # Source and build smoke checks
├── ASSET_LICENSES.md
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
~~~

## Local development

### Requirements

- Node.js 22.13.0 or newer
- pnpm 11.16.0

The expected package-manager version is recorded in package.json.

### Install and run

~~~bash
corepack enable
pnpm install
pnpm dev
~~~

Open http://localhost:3000. No .env file is required.

## Commands

| Command | Purpose |
| --- | --- |
| pnpm dev | Starts the Next.js development server |
| pnpm build | Creates the static production export in out/ |
| pnpm lint | Runs the repository ESLint rules |
| pnpm test | Builds the site and runs the Node smoke test |
| pnpm start | Conventional Next.js server command; exported previews should serve out/ instead |

To preview the exact static output locally:

~~~bash
pnpm build
pnpm dlx serve out
~~~

## Intro-film behavior

The intro uses public/cone-theory-intro.mp4 as a muted, inline-playing video.

1. It opens automatically on the first page load in a browser session.
2. Enter site closes it immediately.
3. It closes automatically when the film ends.
4. Completion is stored in sessionStorage for the current session.
5. Later navigation in the same session skips the automatic intro.
6. Visitors can replay it from the header, hero, call to action, or footer.
7. Reduced-motion visitors bypass the automatic splash.

The film is stored as a project asset and does not require an external video
service.

## Accessibility

- Semantic header, navigation, main content, sections, and footer
- Keyboard-accessible Skip to content link
- Visible focus indicators
- Descriptive image alternative text
- Labels for icon-only controls
- Real buttons for actions and links for navigation
- Immediate splash-screen exit
- Muted inline autoplay behavior
- prefers-reduced-motion handling
- Touch-specific interaction adjustments
- Responsive layouts without intentional page-level horizontal overflow

Keyboard navigation, assistive technology, and browser accessibility tools
should be rechecked after substantial design changes.

## Assets and licenses

The supplied logo, wordmark, intro film, and generated social artwork are Cone
Theory project assets.

Flavour photography comes from Wikimedia Commons:

- Strawberry photography by Zuxra.bmr — CC0 1.0
- Cherry-cone photography by Jessica Rossi — CC BY-SA 2.0
- Vanilla-bean photography by a.pasquier — CC BY-SA 2.0

Complete source links and license details are in
[ASSET_LICENSES.md](./ASSET_LICENSES.md). The site also shows the photography
credits in its footer. Keep the attribution and applicable share-alike terms
intact when modifying or redistributing those photographs.

No repository-wide open-source software license is currently declared. Do not
assume the Cone Theory brand artwork is available for reuse outside this
project.

## Social sharing

Metadata is configured in app/layout.tsx and includes:

- The production metadata base URL
- Page title and description
- Cone Theory icons
- Open Graph title, description, and image
- Twitter summary_large_image metadata
- A 1200 × 630 JPEG sharing image at public/og-v2.jpg

If the production domain changes, update metadataBase before deploying. Social
platforms may cache an older card, so use the platform’s sharing debugger when
validating an update.

## Quality gates

Every push to main and every pull request runs
.github/workflows/production-verification.yml. The workflow installs the
locked dependencies, runs ESLint, creates a production build, and executes the
smoke test.

Run the same checks locally before publishing:

~~~bash
pnpm lint
pnpm test
~~~

Recommended release checks:

- Test intro first-view, skip, completion, and replay paths
- Test keyboard navigation and focus visibility
- Check every internal anchor
- Inspect desktop, tablet, and mobile breakpoints
- Confirm there is no horizontal page overflow
- Confirm all brand and flavour media load
- Confirm photography credits remain visible
- Scan the browser console for runtime errors
- Inspect Open Graph and Twitter metadata
- Confirm the production alias serves the latest main commit

## Production deployment

- **Live site:** https://cone-theory-live.vercel.app/
- **Source:** https://github.com/Triplejw/cone-theory
- **Production branch:** main
- **Build command:** pnpm build
- **Output:** Next.js static export
- **Environment variables:** none

GitHub stores and verifies the source; Vercel hosts the production website.
When the repository is connected through Vercel’s Git integration, pushes to
main create production deployments and attach a deployment status to the
GitHub commit.

For a new Vercel connection:

1. Import Triplejw/cone-theory.
2. Set main as the production branch.
3. Keep the detected Next.js framework settings.
4. Use the repository install and build defaults.
5. Attach the production alias.
6. Confirm the GitHub commit and Vercel deployment use the same SHA.

The .vercel directory is intentionally ignored and must not be committed.
Project linkage and deployment records belong to Vercel.

## Repository notes

- main is the production source branch.
- pnpm is the canonical package manager; keep pnpm-lock.yaml committed.
- The site is intentionally static and has no backend or database.
- Runtime media lives under public/.
- out/, .next/, .vercel/, environment files, and local work folders are ignored.
- Image optimization is disabled because the project uses static export.
- Most content and interactions live in app/page.tsx.
- Tokens, motion, and responsive behavior live in app/globals.css.
- public/og-v2.jpg is the sharing image referenced by runtime metadata.

## Brand line

> Built on angles. Made for cravings.
