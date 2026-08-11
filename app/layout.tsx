import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const leagueSpartan = localFont({
  src: "./fonts/league-spartan-latin.woff2",
  variable: "--font-league-spartan",
  weight: "100 900",
  display: "swap",
});

const montserrat = localFont({
  src: "./fonts/montserrat-latin.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});

const barlowCondensed = localFont({
  src: [
    {
      path: "./fonts/barlow-condensed-600-latin.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/barlow-condensed-700-latin.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cone-theory-wonder-enterprise.vercel.app"),
  title: "Cone Theory — Built on angles. Made for cravings.",
  description:
    "Small-batch ice cream where technical precision meets culinary art. Explore Cone Theory flavours, scoop sizes, and the method behind every craving.",
  icons: {
    icon: "/cone-theory-logo.png",
    shortcut: "/cone-theory-logo.png",
    apple: "/cone-theory-logo.png",
  },
  openGraph: {
    title: "Cone Theory — Built on angles. Made for cravings.",
    description: "Real ingredients. Real good. Precision-chilled ice cream with an angle.",
    images: [{ url: "/og-v2.jpg", width: 1200, height: 630, alt: "Cone Theory — built on angles, made for cravings" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cone Theory — Built on angles. Made for cravings.",
    description: "Real ingredients. Real good. Precision-chilled ice cream with an angle.",
    images: ["/og-v2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.variable} ${montserrat.variable} ${barlowCondensed.variable}`}>
        {children}
      </body>
    </html>
  );
}
