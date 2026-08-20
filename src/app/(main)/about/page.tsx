import type { Metadata } from "next";

import { AboutPage } from "@/components/(app)/(pages)/about/about-page-comp";

const siteUrl = "https://www.alentah.com";

export const metadata: Metadata = {
  title: "About Alentah",

  description:
    "Learn about Alentah, a modern technology publication covering artificial intelligence, robotics, software, AI tools, productivity, creativity, and emerging technologies.",

  alternates: {
    canonical: `${siteUrl}/about`,
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/about`,
    siteName: "Alentah",
    title: "About Alentah",

    description:
      "Learn about Alentah, a modern technology publication covering artificial intelligence, robotics, software, AI tools, productivity, creativity, and emerging technologies.",

    images: [
      {
        url: `${siteUrl}/images/og/alentah-og.png`,
        width: 1200,
        height: 630,
        alt: "Alentah — Technology, AI, Science & More",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Alentah",

    description:
      "Learn about Alentah, a modern technology publication covering artificial intelligence, robotics, software, AI tools, productivity, creativity, and emerging technologies.",

    images: [`${siteUrl}/images/og/alentah-og.png`],
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
