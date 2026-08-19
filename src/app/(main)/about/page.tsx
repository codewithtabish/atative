import { AboutPage } from "@/components/(app)/(pages)/about/about-page-comp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Alentah",
  description:
    "Learn about Alentah, a modern technology publication covering artificial intelligence, robotics, software, AI tools, productivity, creativity, and emerging technologies.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
