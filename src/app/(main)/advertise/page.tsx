import { AdvertisePage } from "@/components/(app)/(pages)/advertise/advertise-page-comp";

import type { Metadata } from "next";

const siteUrl = "https://atative.com";

export const metadata: Metadata = {
  title: "Advertise with Alentah",

  description:
    "Explore advertising, sponsored content, promotional campaigns, and partnership opportunities with Alentah, a modern publication covering AI, technology, software, robotics, and emerging technologies.",

  alternates: {
    canonical: `${siteUrl}/advertise`,
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/advertise`,
    siteName: "Alentah",
    title: "Advertise with Alentah",

    description:
      "Explore advertising, sponsored content, promotional campaigns, and partnership opportunities with Alentah.",

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
    title: "Advertise with Alentah",

    description:
      "Explore advertising, sponsored content, promotional campaigns, and partnership opportunities with Alentah.",

    images: [`${siteUrl}/images/og/alentah-og.png`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <AdvertisePage />;
}
