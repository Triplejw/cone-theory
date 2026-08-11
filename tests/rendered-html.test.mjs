import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

function readJpegDimensions(image) {
  assert.equal(image.subarray(0, 2).toString("hex"), "ffd8");

  for (let offset = 2; offset + 9 < image.length; ) {
    if (image[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = image[offset + 1];
    const segmentLength = image.readUInt16BE(offset + 2);
    const isStartOfFrame =
      marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);

    if (isStartOfFrame) {
      return {
        height: image.readUInt16BE(offset + 5),
        width: image.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + segmentLength;
  }

  throw new Error("Could not read JPEG dimensions.");
}

test("ships the complete Cone Theory experience", async () => {
  const [page, storyPage, css, layout, readme, packageJson, builtHome, builtStory, socialImage] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/story/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../out/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/story.html", import.meta.url), "utf8"),
    readFile(new URL("../public/og-v3.jpg", import.meta.url)),
    access(new URL("../public/cone-theory-logo.png", import.meta.url)),
    access(new URL("../public/cone-theory-header-logo.png", import.meta.url)),
    access(new URL("../public/cone-theory-wordmark.png", import.meta.url)),
    access(new URL("../public/flavour-strawberry.jpg", import.meta.url)),
    access(new URL("../public/flavour-cherry.jpg", import.meta.url)),
    access(new URL("../public/flavour-vanilla.jpg", import.meta.url)),
    access(new URL("../public/collaborators/daniel-dencil.jpg", import.meta.url)),
    access(new URL("../public/collaborators/joshua-jj-wonder.jpg", import.meta.url)),
  ]);

  assert.match(page, /SPLASH_DURATION_MS = 3_000/);
  assert.match(page, /window\.setTimeout\(closeSplash, SPLASH_DURATION_MS\)/);
  assert.match(page, /className="splash__logo"/);
  assert.match(page, /Built on angles\. Made for cravings\./);
  assert.match(page, /cone-theory-splash/);
  assert.doesNotMatch(page, /<video|\.mp4|onEnded/);
  assert.match(page, /id="menu"/);
  assert.match(page, /id="flavours"/);
  assert.match(page, /id="story"/);
  assert.match(page, /id="find-us"/);
  assert.match(page, /openSplash/);
  assert.match(page, /className="brand__mark"/);
  assert.match(page, /src="\/cone-theory-header-logo\.png"/);
  assert.match(page, /site-nav site-nav--left/);
  assert.match(page, /site-nav site-nav--right/);
  assert.match(page, /className="header-right"/);
  assert.match(page, /href="\/story"/);
  assert.doesNotMatch(page, /<a href="#story">Our story<\/a>/);
  assert.match(page, /className="angle-ticker__track"/);
  assert.match(page, /className="angle-ticker__group"/);
  assert.match(page, /cone-theory-wordmark\.png/);
  assert.doesNotMatch(page, /site-nav__active/);
  assert.match(page, /Wikimedia Commons/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /--brand-red: #b50d2d/);
  assert.match(css, /animation: ticker 40s linear infinite/);
  assert.match(css, /translate3d\(-50%, 0, 0\)/);
  assert.match(css, /animation: splash-progress 3s linear both/);
  assert.match(css, /\.story-profile-grid/);
  assert.match(css, /\.story-home-trigger/);
  assert.match(css, /\.story-values__grid article\.reveal[\s\S]*animation-name: reveal-card-up/);
  assert.match(css, /@keyframes reveal-card-up/);
  assert.doesNotMatch(css, /letter-spacing:\s*-/);
  assert.match(css, /\.hero h1 \.outline[\s\S]*?font-kerning: none/);
  assert.match(css, /\.story-hero h1 \.outline[\s\S]*?font-kerning: none/);
  assert.doesNotMatch(css, /\.flavour-card:nth-child\(2\)[^{]*\{[^}]*transform:/);
  assert.match(css, /\.flavour-card h3[\s\S]*color: var\(--ink\)/);
  assert.match(css, /\.story-values__grid h3[\s\S]*min-height: 2em/);
  assert.match(css, /@media \(max-width: 1360px\)[\s\S]*?\.story-values__grid/);
  assert.doesNotMatch(css, /#fedde5|--ice-50/);
  assert.match(storyPage, /export const metadata/);
  assert.doesNotMatch(storyPage, /["']use client["']/);
  assert.match(storyPage, /Daniel Dencil/);
  assert.match(storyPage, /Joshua JJ Wonder/);
  assert.match(storyPage, /same department at the same university/);
  assert.match(storyPage, /\/collaborators\/daniel-dencil\.jpg/);
  assert.match(storyPage, /\/collaborators\/joshua-jj-wonder\.jpg/);
  assert.match(storyPage, /src="\/cone-theory-header-logo\.png"/);
  assert.match(storyPage, /href="https:\/\/www\.behance\.net\/jker2"/);
  assert.match(storyPage, /aria-current="page"/);
  assert.match(storyPage, /href="\/#menu"/);
  assert.doesNotMatch(readme, /expected to join/i);
  assert.match(readme, /collaborate on Cone Theory as its creative/);
  assert.match(readme, /href="https:\/\/www\.behance\.net\/jker2"/);
  assert.match(layout, /Cone Theory — Built on angles\. Made for cravings\./);
  assert.match(layout, /next\/font\/local/);
  assert.match(layout, /metadataBase: new URL\("https:\/\/www\.conetheory\.store"\)/);
  assert.match(layout, /images: \[\{ url: "\/og-v3\.jpg"/);
  assert.match(storyPage, /url: "\/og-v3\.jpg"/);
  assert.doesNotMatch(`${layout}${storyPage}${readme}`, /cone-theory-live\.vercel\.app|og-v2\.jpg/);
  assert.match(builtHome, /<link rel="canonical" href="https:\/\/www\.conetheory\.store"/);
  assert.match(builtHome, /<meta property="og:url" content="https:\/\/www\.conetheory\.store"/);
  assert.match(builtStory, /<link rel="canonical" href="https:\/\/www\.conetheory\.store\/story"/);
  for (const html of [builtHome, builtStory]) {
    assert.match(html, /https:\/\/www\.conetheory\.store\/og-v3\.jpg/);
    assert.doesNotMatch(html, /cone-theory-live\.vercel\.app|og-v2\.jpg/);
  }
  assert.deepEqual(readJpegDimensions(socialImage), { width: 1200, height: 630 });
  assert.ok(socialImage.length < 5 * 1024 * 1024);
  assert.match(packageJson, /"next": "16\.2\.6"/);
  assert.doesNotMatch(packageJson, /vinext|react-loading-skeleton/);
});
