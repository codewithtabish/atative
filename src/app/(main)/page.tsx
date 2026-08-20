import type { Metadata } from "next";

import { HomePageComp } from "@/components/(app)/(pages)/homepage/home-page-comp";

const siteUrl = "https://www.alentah.com";

export const metadata: Metadata = {
  title: "Alentah — Technology, AI, Science & More",

  description:
    "Explore the latest news, insights, guides, reviews, and ideas across technology, artificial intelligence, science, software, robotics, productivity, business, culture, and emerging trends.",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Alentah — Technology, AI, Science & More",

    description:
      "Explore the latest news, insights, guides, reviews, and ideas across technology, artificial intelligence, science, software, robotics, productivity, business, culture, and emerging trends.",

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

    title: "Alentah — Technology, AI, Science & More",

    description:
      "Explore the latest news, insights, guides, reviews, and ideas across technology, artificial intelligence, science, software, robotics, productivity, business, culture, and emerging trends.",

    images: [`${siteUrl}/images/og/alentah-og.png`],
  },
};

const HomeScreen = () => {
  return <HomePageComp />;
};

export default HomeScreen;
