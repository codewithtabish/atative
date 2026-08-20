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
  },

  twitter: {
    card: "summary_large_image",
    title: "Alentah — Technology, AI, Science & More",
    description:
      "Explore the latest news, insights, guides, reviews, and ideas across technology, artificial intelligence, science, software, robotics, productivity, business, culture, and emerging trends.",
  },
};

const HomeScreen = () => {
  return <HomePageComp />;
};

export default HomeScreen;
