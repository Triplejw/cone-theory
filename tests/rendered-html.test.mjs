import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Cone Theory landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Cone Theory — Built on angles\. Made for cravings\.<\/title>/i);
  assert.match(html, /Small-batch ice cream where technical precision meets culinary art/i);
  assert.match(html, /property="og:image" content="http:\/\/localhost(?::\d+)?\/og\.png"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the branded media and responsive experience", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/cone-theory-logo.png", import.meta.url)),
    access(new URL("../public/cone-theory-intro.mp4", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(page, /src="\/cone-theory-intro\.mp4"/);
  assert.match(page, /onEnded=\{closeSplash\}/);
  assert.match(page, /id="menu"/);
  assert.match(page, /id="flavours"/);
  assert.match(page, /id="story"/);
  assert.match(page, /id="find-us"/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(layout, /League_Spartan/);
  assert.match(layout, /images: \["\/og\.png"\]/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
