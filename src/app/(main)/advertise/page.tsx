import { AdvertisePage } from "@/components/(app)/(pages)/advertise/advertise-page-comp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise with Alentah",
  description:
    "Explore advertising, sponsored content, promotional campaigns, and partnership opportunities with Alentah, a modern publication covering AI, technology, software, robotics, and emerging technologies.",
  alternates: {
    canonical: "/advertise",
  },
  openGraph: {
    title: "Advertise with Alentah",
    description:
      "Explore advertising, sponsored content, promotional campaigns, and partnership opportunities with Alentah.",
    url: "/advertise",
    siteName: "Alentah",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advertise with Alentah",
    description:
      "Explore advertising, sponsored content, promotional campaigns, and partnership opportunities with Alentah.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <AdvertisePage />;
}
