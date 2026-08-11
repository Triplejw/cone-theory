import type { Metadata } from "next";
import { Barlow_Condensed, League_Spartan, Montserrat } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
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
    images: [{ url: "/og.png", width: 1760, height: 900, alt: "Cone Theory brand card" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cone Theory — Built on angles. Made for cravings.",
    description: "Real ingredients. Real good. Precision-chilled ice cream with an angle.",
    images: ["/og.png"],
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
