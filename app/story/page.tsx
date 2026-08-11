import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story — Cone Theory",
  description:
    "Meet Daniel Dencil and Joshua JJ Wonder, the design-and-development collaborators behind Cone Theory.",
  alternates: {
    canonical: "/story",
  },
  openGraph: {
    title: "Our Story — Cone Theory",
    description:
      "One original design vision, one production build, and the shared story behind Cone Theory.",
    url: "/story",
    images: [
      {
        url: "/og-v3.jpg",
        width: 1200,
        height: 630,
        alt: "Cone Theory — built on angles, made for cravings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story — Cone Theory",
    description:
      "Meet Daniel Dencil and Joshua JJ Wonder, the collaborators behind Cone Theory.",
    images: [{ url: "/og-v3.jpg", alt: "Cone Theory — built on angles, made for cravings" }],
  },
};

const journey = [
  {
    index: "01",
    title: "A shared beginning",
    copy: "Before Cone Theory, Daniel and Joshua studied in the same department at the same university—a friendship shaped by curiosity, creativity, and complementary strengths.",
  },
  {
    index: "02",
    title: "The visual theory",
    copy: "Daniel developed the original concept, UI/UX, logo, wordmark, assets, colour palette, layouts, and geometric art direction that give Cone Theory its identity.",
  },
  {
    index: "03",
    title: "Into the browser",
    copy: "Joshua translated that system into a responsive Next.js experience, engineering its motion, interactions, accessibility, performance, and production behavior.",
  },
  {
    index: "04",
    title: "One live product",
    copy: "Design and development came together in a distinctive digital experience, verified through GitHub and shipped to production on Vercel.",
  },
];

const values = [
  ["01", "Originality", "A visual identity with its own point of view—not another template."],
  ["02", "Clarity", "Bold creative choices supported by intuitive, accessible interaction."],
  ["03", "Craft", "Colour, typography, motion, and code treated as one connected system."],
  ["04", "Collaboration", "Different disciplines, shared ownership, and one coherent result."],
];

export default function StoryPage() {
  return (
    <>
      <a className="skip-link" href="#story-main">
        Skip to content
      </a>

      <header className="site-header story-site-header">
        <nav className="site-nav site-nav--left" aria-label="Primary navigation">
          <Link href="/#menu">Menu</Link>
          <Link href="/story" aria-current="page">
            Our story
          </Link>
        </nav>

        <Link className="brand" href="/" aria-label="Cone Theory home">
          <span className="brand__mark" aria-hidden="true">
            <Image src="/cone-theory-header-logo.png" alt="" width={847} height={1013} priority />
          </span>
          <Image
            className="brand__wordmark"
            src="/cone-theory-wordmark.png"
            alt="Cone Theory"
            width={2906}
            height={395}
            priority
          />
        </Link>

        <div className="header-right">
          <nav className="site-nav site-nav--right" aria-label="Secondary navigation">
            <Link href="/#flavours">Flavours</Link>
            <Link href="/#story">Method</Link>
          </nav>
          <div className="header-actions">
            <Link className="story-home-trigger" href="/" aria-label="Back to Cone Theory home">
              <span aria-hidden="true">←</span>
            </Link>
            <Link className="button button--compact" href="/#menu">
              Show menu
            </Link>
          </div>
        </div>
      </header>

      <main className="story-page" id="story-main">
        <section className="story-hero">
          <div className="story-hero__copy">
            <p className="eyebrow">Two minds / one sweet theory</p>
            <h1>
              <span>Designed from</span>
              <span className="accent">instinct.</span>
              <span>Built with</span>
              <span className="outline">intention.</span>
            </h1>
            <p className="story-hero__lede">
              Cone Theory brings together Daniel Dencil&apos;s original creative vision and
              Joshua JJ Wonder&apos;s full-stack engineering—two friends, two disciplines,
              and one shared build.
            </p>
            <div className="story-hero__actions">
              <a className="button" href="#collaborators">
                Meet the collaborators
              </a>
              <Link className="button button--outline" href="/">
                Explore Cone Theory
              </Link>
            </div>
          </div>

          <div className="story-hero__art">
            <span className="story-hero__coordinate">CT / STORY / 01 + 02</span>
            <span className="story-hero__diamond story-hero__diamond--one" aria-hidden="true" />
            <span className="story-hero__diamond story-hero__diamond--two" aria-hidden="true" />
            <Image
              src="/cone-theory-logo.png"
              alt="Cone Theory geometric ice-cream mark"
              width={1633}
              height={2314}
              priority
              sizes="(max-width: 680px) 76vw, 34vw"
            />
            <div className="story-hero__role story-hero__role--design">
              <span>01 / Design</span>
              <strong>Daniel</strong>
            </div>
            <div className="story-hero__role story-hero__role--build">
              <span>02 / Build</span>
              <strong>Joshua</strong>
            </div>
          </div>
        </section>

        <div className="angle-ticker story-ticker" aria-hidden="true">
          <div className="angle-ticker__track">
            {[0, 1].map((groupIndex) => (
              <div className="angle-ticker__group" key={groupIndex}>
                <span>Same department</span><i>◆</i>
                <span>Shared idea</span><i>◆</i>
                <span>Design × development</span><i>◆</i>
                <span>Built together</span><i>◆</i>
              </div>
            ))}
          </div>
        </div>

        <section className="story-origin section-pad">
          <div className="story-origin__heading reveal">
            <p className="eyebrow">The collaboration / where it began</p>
            <h2>One idea, shaped together.</h2>
          </div>
          <div className="story-origin__copy reveal">
            <p className="story-origin__lead">
              Friends first. Creative partners next. Cone Theory lives where both
              perspectives meet.
            </p>
            <p>
              Daniel originated the concept and built its complete visual language:
              geometric forms, expressive typography, a distinctive colour system, and a
              UI with real personality. Joshua carried that language into production,
              preserving its character while making it responsive, accessible, fluid, and
              ready for the real world.
            </p>
            <div className="story-origin__equation">
              <span><strong>Daniel</strong> / creative direction</span>
              <i aria-hidden="true">×</i>
              <span><strong>Joshua</strong> / engineering</span>
              <i aria-hidden="true">=</i>
              <span><strong>Cone Theory</strong> / shared creation</span>
            </div>
          </div>
        </section>

        <section className="story-journey section-pad" aria-labelledby="journey-title">
          <div className="story-section-heading reveal">
            <p className="eyebrow">From classmates to collaborators / 04 stages</p>
            <h2 id="journey-title">From concept to launch.</h2>
          </div>
          <ol className="story-timeline">
            {journey.map((step) => (
              <li className="reveal" key={step.index}>
                <span>{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <i aria-hidden="true">↗</i>
              </li>
            ))}
          </ol>
        </section>

        <section className="story-collaborators section-pad" id="collaborators" aria-labelledby="collaborators-title">
          <div className="story-section-heading story-section-heading--cream reveal">
            <p className="eyebrow">The people behind the page / 01 + 02</p>
            <h2 id="collaborators-title">Meet the collaborators.</h2>
          </div>

          <div className="story-profile-grid">
            <article className="story-profile reveal">
              <div className="story-profile__inner">
                <div className="story-profile__portrait">
                  <Image
                    src="/collaborators/daniel-dencil.jpg"
                    alt="Daniel Dencil, UI/UX designer and Cone Theory concept creator"
                    fill
                    sizes="(max-width: 680px) 88vw, (max-width: 980px) 42vw, 520px"
                  />
                  <span>01 / Design</span>
                </div>
                <div className="story-profile__body">
                  <p className="story-profile__role">Creator · UI/UX designer · visual direction</p>
                  <h3>Daniel Dencil</h3>
                  <p>
                    Daniel is the creative originator of Cone Theory. His longstanding
                    passion for UI/UX and instinct for visual design shaped everything from
                    the angular logo and wordmark to the assets, palette, layouts, and
                    complete interface.
                  </p>
                  <p>
                    His design experience extends to real client work, including creating
                    a new logo and visual identity for a business. Here, he turned a bold
                    idea into a coherent visual world with energy, character, and a clear
                    point of view.
                  </p>
                  <div className="story-profile__links">
                    <a href="https://www.linkedin.com/in/daniel-dencil/" target="_blank" rel="noopener noreferrer">
                      Connect with Daniel <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href="https://www.behance.net/jker2"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Daniel Dencil on Behance (opens in a new tab)"
                    >
                      Daniel on Behance <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>

            <article className="story-profile reveal">
              <div className="story-profile__inner">
                <div className="story-profile__portrait">
                  <Image
                    src="/collaborators/joshua-jj-wonder.jpg"
                    alt="Joshua JJ Wonder, full-stack developer for Cone Theory"
                    fill
                    sizes="(max-width: 680px) 88vw, (max-width: 980px) 42vw, 520px"
                  />
                  <span>02 / Development</span>
                </div>
                <div className="story-profile__body">
                  <p className="story-profile__role">Full-stack developer · engineering · launch</p>
                  <h3>Joshua JJ Wonder</h3>
                  <p>
                    Joshua brought Cone Theory from design into the browser. He translated
                    Daniel&apos;s creative system into a responsive Next.js website and
                    engineered its motion, interactions, accessibility, frontend
                    architecture, and performance.
                  </p>
                  <p>
                    His approach combines technical structure with close attention to visual
                    detail, so the finished experience does more than resemble the original
                    design—it feels intuitive, alive, and ready for production on GitHub and
                    Vercel.
                  </p>
                  <div className="story-profile__links">
                    <a href="https://github.com/Triplejw" target="_blank" rel="noopener noreferrer">
                      Explore Joshua&apos;s work <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="story-values section-pad" aria-labelledby="values-title">
          <div className="story-section-heading reveal">
            <p className="eyebrow">What guided the work / shared principles</p>
            <h2 id="values-title">Different skills. Shared standards.</h2>
          </div>
          <div className="story-values__grid">
            {values.map(([index, title, copy]) => (
              <article className="reveal" key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="story-cta section-pad">
          <div className="story-cta__content reveal">
            <p className="eyebrow">The result / one shared creation</p>
            <h2>Daniel gave the idea its shape. Joshua gave that shape a working address.</h2>
            <p>
              Cone Theory is proof that thoughtful design and thoughtful engineering are
              better together.
            </p>
            <div className="story-cta__actions">
              <Link className="button button--cream" href="/">
                Return to the experience
              </Link>
              <Link className="story-cta__text-link" href="/#flavours">
                Discover the flavours <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <Image
            src="/cone-theory-logo.png"
            alt=""
            aria-hidden="true"
            width={1633}
            height={2314}
            sizes="(max-width: 680px) 90vw, 48vw"
          />
        </section>
      </main>

      <footer className="site-footer story-footer">
        <Link href="/" className="site-footer__brand" aria-label="Cone Theory home">
          <Image src="/cone-theory-wordmark.png" alt="Cone Theory" width={2906} height={395} />
        </Link>
        <div className="site-footer__meta">
          <p>
            © 2026 Cone Theory.<br />
            Designed by Daniel. Developed by Joshua.
          </p>
          <div className="site-footer__links">
            <Link href="/">Home</Link>
            <Link href="/#menu">Menu</Link>
            <Link href="/#flavours">Flavours</Link>
            <a href="#collaborators">Collaborators</a>
          </div>
        </div>
      </footer>
    </>
  );
}
