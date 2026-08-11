import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("ships the complete Cone Theory experience", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/cone-theory-logo.png", import.meta.url)),
    access(new URL("../public/cone-theory-intro.mp4", import.meta.url)),
    access(new URL("../public/og-v2.jpg", import.meta.url)),
    access(new URL("../public/cone-theory-wordmark.png", import.meta.url)),
    access(new URL("../public/flavour-strawberry.jpg", import.meta.url)),
    access(new URL("../public/flavour-cherry.jpg", import.meta.url)),
    access(new URL("../public/flavour-vanilla.jpg", import.meta.url)),
  ]);

  assert.match(page, /src="\/cone-theory-intro\.mp4"/);
  assert.match(page, /onEnded=\{closeSplash\}/);
  assert.match(page, /id="menu"/);
  assert.match(page, /id="flavours"/);
  assert.match(page, /id="story"/);
  assert.match(page, /id="find-us"/);
  assert.match(page, /openSplash/);
  assert.match(page, /className="brand__mark"/);
  assert.match(page, /site-nav site-nav--left/);
  assert.match(page, /site-nav site-nav--right/);
  assert.match(page, /className="header-right"/);
  assert.match(page, /cone-theory-wordmark\.png/);
  assert.doesNotMatch(page, /site-nav__active/);
  assert.match(page, /Wikimedia Commons/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /--brand-red: #b50d2d/);
  assert.doesNotMatch(css, /#fedde5|--ice-50/);
  assert.match(layout, /Cone Theory — Built on angles\. Made for cravings\./);
  assert.match(layout, /next\/font\/local/);
  assert.match(layout, /images: \["\/og-v2\.jpg"\]/);
  assert.match(packageJson, /"next": "16\.2\.6"/);
  assert.doesNotMatch(packageJson, /vinext|react-loading-skeleton/);
});
