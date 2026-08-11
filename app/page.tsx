"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const flavors = [
  {
    index: "01",
    name: "Pink Salt Strawberry",
    note: "Bright berry, a pinch of sea salt, and a finish that keeps pulling you back in.",
    tag: "House signature",
    color: "rose",
  },
  {
    index: "02",
    name: "Dark Cherry Geometry",
    note: "Deep cherry folded through silky cream—sharp at the edges, lush at the centre.",
    tag: "Seasonal angle",
    color: "cherry",
  },
  {
    index: "03",
    name: "Vanilla Bean Baseline",
    note: "Madagascan vanilla, slow-churned into the quiet classic every theory needs.",
    tag: "Always in rotation",
    color: "vanilla",
  },
];

const scoopMenu = [
  ["Single angle", "₹90"],
  ["Double facet", "₹150"],
  ["Triple dimension", "₹200"],
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeenIntro = window.sessionStorage.getItem("cone-theory-intro") === "seen";

    if (reduceMotion || hasSeenIntro) {
      const frame = window.requestAnimationFrame(() => setShowSplash(false));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("intro-open", showSplash);
    return () => document.body.classList.remove("intro-open");
  }, [showSplash]);

  const closeSplash = useCallback(() => {
    window.sessionStorage.setItem("cone-theory-intro", "seen");
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && (
        <section className="splash" aria-label="Cone Theory introduction">
          <video
            className="splash__video"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={closeSplash}
          >
            <source src="/cone-theory-intro.mp4" type="video/mp4" />
          </video>
          <button className="splash__skip" type="button" onClick={closeSplash}>
            Skip intro <span aria-hidden="true">↗</span>
          </button>
          <div className="splash__fallback" aria-hidden="true">
            Cone Theory
          </div>
        </section>
      )}

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Cone Theory home">
          <span className="brand__mark">
            <Image src="/cone-theory-logo.png" alt="" width={42} height={54} />
          </span>
          <span className="brand__name">Cone Theory</span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#menu">Menu</a>
          <a href="#story">Our story</a>
          <a className="site-nav__active" href="#flavours">
            Flavours
          </a>
          <a href="#find-us">Find us</a>
        </nav>
        <a className="button button--compact" href="#menu">
          Order now
        </a>
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
              <a className="button button--outline" href="#story">
                Our story
              </a>
            </div>
          </div>
          <div className="hero__art" aria-label="Cone Theory geometric soft-serve logo">
            <span className="hero__coordinate">CT / 01</span>
            <Image
              src="/cone-theory-logo.png"
              alt="Cone Theory"
              width={1633}
              height={2314}
              priority
              sizes="(max-width: 680px) 100vw, 42vw"
            />
          </div>
        </section>

        <div className="section-rule" aria-hidden="true">
          <span />
          <i>◆</i>
          <span />
        </div>

        <section className="theory section-pad" id="menu">
          <div className="section-heading">
            <p className="eyebrow">The scoop scale / 01</p>
            <h2>
              The theory,
              <span>by the scoop.</span>
            </h2>
            <p className="section-note">Calculated indulgence, perfectly portioned.</p>
          </div>
          <div className="menu-card">
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
        </section>

        <section className="flavours section-pad" id="flavours">
          <div className="flavours__intro">
            <p className="eyebrow">Current hypotheses / 03 flavours</p>
            <h2>Proof tastes better frozen.</h2>
            <p>
              Familiar ingredients, reworked with a little nerve. Every flavour starts
              with one question: how good can a scoop get?
            </p>
          </div>
          <div className="flavour-grid">
            {flavors.map((flavor) => (
              <article className="flavour-card" key={flavor.name}>
                <div className={`flavour-card__visual flavour-card__visual--${flavor.color}`}>
                  <span>{flavor.index}</span>
                </div>
                <div className="flavour-card__body">
                  <p className="flavour-card__tag">{flavor.tag}</p>
                  <h3>{flavor.name}</h3>
                  <p>{flavor.note}</p>
                  <a href="#find-us">Taste this angle <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="story section-pad" id="story">
          <div className="story__statement">
            <p className="eyebrow">Our method / no shortcuts</p>
            <h2>Dessert, engineered for delight.</h2>
          </div>
          <div className="story__copy">
            <p className="story__lead">
              Cone Theory is where exacting craft meets the beautiful chaos of a proper
              craving.
            </p>
            <p>
              We build flavour in layers: thoughtful sourcing, tight recipes, slow churns,
              and just enough surprise. The result is ice cream with structure, character,
              and absolutely no interest in playing it safe.
            </p>
            <div className="principles">
              <div><span>01</span><strong>Real ingredients</strong></div>
              <div><span>02</span><strong>Small batches</strong></div>
              <div><span>03</span><strong>Zero dull scoops</strong></div>
            </div>
          </div>
        </section>

        <section className="find-us section-pad" id="find-us">
          <p className="eyebrow">Next coordinates / coming soon</p>
          <h2>Follow the cherry.</h2>
          <p>
            New flavours, tasting drops, and our next serving spot—announced where the
            cravings are loudest.
          </p>
          <a className="button button--cream" href="#top">
            Stay in the loop
          </a>
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
        <a href="#top" className="site-footer__brand">Cone<br />Theory</a>
        <div className="site-footer__meta">
          <p>© 2026 Cone Theory.<br />All rights reserved. Precision chilled.</p>
          <div>
            <a href="#flavours">Flavours</a>
            <a href="#story">Our story</a>
            <a href="#find-us">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
