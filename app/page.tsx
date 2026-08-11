"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

const flavors = [
  {
    index: "01",
    name: "Pink Salt Strawberry",
    note: "Bright berry, a pinch of sea salt, and a finish that keeps pulling you back in.",
    tag: "House signature",
    color: "rose",
    image: "/flavour-strawberry.jpg",
    alt: "A selection of pink and cream ice-cream scoops",
  },
  {
    index: "02",
    name: "Dark Cherry Geometry",
    note: "Deep cherry folded through silky cream—sharp at the edges, lush at the centre.",
    tag: "Seasonal angle",
    color: "cherry",
    image: "/flavour-cherry.jpg",
    alt: "A generous pink cherry ice-cream cone",
  },
  {
    index: "03",
    name: "Vanilla Bean Baseline",
    note: "Madagascan vanilla, slow-churned into the quiet classic every theory needs.",
    tag: "Always in rotation",
    color: "vanilla",
    image: "/flavour-vanilla.jpg",
    alt: "A scoop of vanilla bean ice cream on a wooden board",
  },
];

const tickerPhrases = [
  "REAL INGREDIENTS",
  "SMALL BATCHES",
  "ZERO DULL SCOOPS",
  "REAL INGREDIENTS",
  "SMALL BATCHES",
  "ZERO DULL SCOOPS",
];

const scoopMenu = [
  ["Single angle", "₹90"],
  ["Double facet", "₹150"],
  ["Triple dimension", "₹200"],
];

const SPLASH_DURATION_MS = 3_000;

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashKey, setSplashKey] = useState(0);
  const heroArtRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hasSeenSplash = false;

    try {
      hasSeenSplash = window.sessionStorage.getItem("cone-theory-splash") === "seen";
    } catch {
      // Storage can be unavailable in strict privacy modes; the splash still remains dismissible.
    }

    if (reduceMotion || hasSeenSplash) {
      const frame = window.requestAnimationFrame(() => setShowSplash(false));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("splash-open", showSplash);
    return () => document.body.classList.remove("splash-open");
  }, [showSplash]);

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const art = heroArtRef.current;
    let frame = 0;

    const updateProgress = () => {
      if (!progress) return;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const value = range > 0 ? Math.min(window.scrollY / range, 1) : 0;
      progress.style.transform = `scaleX(${value})`;
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!art || event.pointerType === "touch") return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      art.style.setProperty("--pointer-x", x.toFixed(3));
      art.style.setProperty("--pointer-y", y.toFixed(3));
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const closeSplash = useCallback(() => {
    try {
      window.sessionStorage.setItem("cone-theory-splash", "seen");
    } catch {
      // Closing the splash should never depend on storage access.
    }
    setShowSplash(false);
  }, []);

  const openSplash = useCallback(() => {
    setSplashKey((value) => value + 1);
    setShowSplash(true);
  }, []);

  useEffect(() => {
    if (!showSplash) return;

    const timeout = window.setTimeout(closeSplash, SPLASH_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [closeSplash, showSplash, splashKey]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />

      {showSplash ? (
        <section className="splash" key={splashKey} aria-label="Cone Theory brand introduction">
          <div className="splash__identity">
            <Image
              className="splash__logo"
              src="/cone-theory-logo.png"
              alt="Cone Theory"
              width={1633}
              height={2314}
              priority
              sizes="(max-width: 680px) 64vw, 330px"
            />
            <p className="splash__tagline">Built on angles. Made for cravings.</p>
          </div>
          <button className="splash__skip" type="button" onClick={closeSplash}>
            Enter site <span aria-hidden="true">↗</span>
          </button>
          <div className="splash__progress" aria-hidden="true" />
        </section>
      ) : null}

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <nav className="site-nav site-nav--left" aria-label="Primary navigation">
          <a href="#menu">Menu</a>
          <Link href="/story">Our story</Link>
        </nav>
        <a className="brand" href="#top" aria-label="Cone Theory home">
          <span className="brand__mark" aria-hidden="true">
            <Image
              src="/cone-theory-header-logo.png"
              alt=""
              width={847}
              height={1013}
              priority
            />
          </span>
          <Image
            className="brand__wordmark"
            src="/cone-theory-wordmark.png"
            alt="Cone Theory"
            width={2906}
            height={395}
            priority
          />
        </a>
        <div className="header-right">
          <nav className="site-nav site-nav--right" aria-label="Secondary navigation">
            <a href="#flavours">Flavours</a>
            <button type="button" onClick={openSplash}>Replay splash</button>
          </nav>
          <div className="header-actions">
            <button className="splash-trigger" type="button" onClick={openSplash} aria-label="Replay brand splash">
              <span aria-hidden="true">◆</span>
            </button>
            <a className="button button--compact" href="#menu">
              Show menu
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero__copy">
            <p className="eyebrow">Small-batch ice cream / big-idea flavour</p>
            <h1>
              <span>Built on</span>
              <span className="accent">angles.</span>
              <span>Made for</span>
              <span className="outline">cravings.</span>
            </h1>
            <p className="hero__lede">
              Real ingredients. Real good. A high-tension approach to indulgence,
              where technical precision meets culinary art.
            </p>
            <div className="hero__actions">
              <a className="button" href="#menu">
                View menu
              </a>
              <button className="button button--outline" type="button" onClick={openSplash}>
                Replay splash <span aria-hidden="true">◆</span>
              </button>
            </div>
          </div>
          <div className="hero__art" ref={heroArtRef} aria-label="Cone Theory geometric soft-serve logo">
            <span className="hero__coordinate">CT / 01</span>
            <span className="hero__orbit hero__orbit--one" aria-hidden="true" />
            <span className="hero__orbit hero__orbit--two" aria-hidden="true" />
            <Image
              src="/cone-theory-logo.png"
              alt="Cone Theory geometric ice-cream mark"
              width={1633}
              height={2314}
              priority
              sizes="(max-width: 680px) 92vw, 38vw"
            />
          </div>
        </section>

        <div className="angle-ticker" aria-hidden="true">
          <div className="angle-ticker__track">
            {[0, 1].map((groupIndex) => (
              <div className="angle-ticker__group" key={groupIndex}>
                {tickerPhrases.map((phrase, phraseIndex) => (
                  <Fragment key={`${groupIndex}-${phraseIndex}`}>
                    <span>{phrase}</span>
                    <i>◆</i>
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="theory section-pad reveal" id="menu">
          <div className="section-heading">
            <p className="eyebrow">The scoop scale / 01</p>
            <h2>
              The theory,
              <span>by the scoop.</span>
            </h2>
            <p className="section-note">Calculated indulgence, perfectly portioned.</p>
          </div>
          <div className="menu-showcase">
            <div className="menu-photo-shell cut-shell">
              <div className="menu-photo cut-shell__inner">
                <Image
                  src="/flavour-cherry.jpg"
                  alt="A pink ice-cream cone—the current Cone Theory proof"
                  fill
                  sizes="(max-width: 980px) 100vw, 38vw"
                />
                <span>Today&apos;s proof / 02</span>
              </div>
            </div>
            <div className="menu-card-shell cut-shell">
              <div className="menu-card cut-shell__inner">
                <div className="menu-card__label">{"/// Menu"}</div>
                {scoopMenu.map(([name, price]) => (
                  <div className="menu-row" key={name}>
                    <span>{name}</span>
                    <i aria-hidden="true" />
                    <strong>{price}</strong>
                  </div>
                ))}
                <div className="menu-card__index">01 ///</div>
              </div>
            </div>
          </div>
        </section>

        <section className="flavours section-pad" id="flavours">
          <div className="flavours__intro reveal">
            <p className="eyebrow">Current hypotheses / 03 flavours</p>
            <h2>Proof tastes better frozen.</h2>
            <p>
              Familiar ingredients, reworked with a little nerve. Every flavour starts
              with one question: how good can a scoop get?
            </p>
          </div>
          <div className="flavour-grid">
            {flavors.map((flavor) => (
              <article className={`flavour-card flavour-card--${flavor.color} reveal`} key={flavor.name}>
                <div className="flavour-card__inner">
                  <div className="flavour-card__visual">
                    <Image
                      src={flavor.image}
                      alt={flavor.alt}
                      fill
                      sizes="(max-width: 980px) 76vw, 30vw"
                    />
                    <span>{flavor.index}</span>
                    <i aria-hidden="true">View flavour</i>
                  </div>
                  <div className="flavour-card__body">
                    <p className="flavour-card__tag">{flavor.tag}</p>
                    <h3>{flavor.name}</h3>
                    <p>{flavor.note}</p>
                    <a href="#find-us" aria-label={`Find out where to taste ${flavor.name}`}>
                      Taste this angle <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="story section-pad" id="story">
          <div className="story__statement reveal">
            <p className="eyebrow">Our method / no shortcuts</p>
            <h2>Dessert, engineered for delight.</h2>
          </div>
          <div className="story__copy reveal">
            <p className="story__lead">
              Cone Theory is where exacting craft meets the beautiful chaos of a proper craving.
            </p>
            <p>
              We build flavour in layers: thoughtful sourcing, tight recipes, slow churns,
              and just enough surprise. The result is ice cream with structure, character,
              and absolutely no interest in playing it safe.
            </p>
            <div className="principles">
              <div><span>01</span><strong>Real ingredients</strong><i aria-hidden="true">↗</i></div>
              <div><span>02</span><strong>Small batches</strong><i aria-hidden="true">↗</i></div>
              <div><span>03</span><strong>Zero dull scoops</strong><i aria-hidden="true">↗</i></div>
            </div>
            <Link className="button story__maker-link" href="/story">
              Meet the collaborators <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="find-us section-pad" id="find-us">
          <div className="find-us__content reveal">
            <p className="eyebrow">Next coordinates / coming soon</p>
            <h2>Follow the cherry.</h2>
            <p>
              New flavours, tasting drops, and our next serving spot—announced where the
              cravings are loudest.
            </p>
            <div className="find-us__actions">
              <a className="button button--cream" href="#menu">See the scoop scale</a>
              <button className="text-button" type="button" onClick={openSplash}>Replay splash <span>◆</span></button>
            </div>
          </div>
          <Image
            src="/cone-theory-logo.png"
            alt=""
            aria-hidden="true"
            width={1633}
            height={2314}
            sizes="(max-width: 680px) 90vw, 52vw"
          />
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top" className="site-footer__brand" aria-label="Back to the top">
          <Image src="/cone-theory-wordmark.png" alt="Cone Theory" width={2906} height={395} />
        </a>
        <div className="site-footer__meta">
          <p>© 2026 Cone Theory.<br />All rights reserved. Precision chilled.</p>
          <div className="site-footer__links">
            <a href="#flavours">Flavours</a>
            <Link href="/story">Our story</Link>
            <button type="button" onClick={openSplash}>Replay splash</button>
          </div>
        </div>
        <p className="photo-credits">
          Photography via Wikimedia Commons: <a href="https://commons.wikimedia.org/wiki/File:Strawberry_ice-cream.jpg" target="_blank" rel="noreferrer">Zuxra.bmr (CC0)</a>, <a href="https://commons.wikimedia.org/wiki/File:Cherry_ice_cream_cone.jpg" target="_blank" rel="noreferrer">Jessica Rossi (CC BY-SA 2.0)</a>, and <a href="https://commons.wikimedia.org/wiki/File:Vanilla_bean_ice_cream_(3086700978).jpg" target="_blank" rel="noreferrer">a.pasquier (CC BY-SA 2.0)</a>.
        </p>
      </footer>
    </>
  );
}
