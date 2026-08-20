import { PrivacyPolicy } from "@/components/(app)/(pages)/privacy/privacy-policy-comp";

import type { Metadata } from "next";

const siteUrl = "https://www.alentah.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Alentah",

  description:
    "Learn how Alentah collects, uses, protects, and manages personal information, cookies, analytics, advertising, accounts, comments, newsletters, and third-party services.",

  alternates: {
    canonical: `${siteUrl}/privacy`,
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/privacy`,
    siteName: "Alentah",
    title: "Privacy Policy | Alentah",

    description:
      "Learn how Alentah collects, uses, protects, and manages personal information, cookies, analytics, advertising, accounts, comments, newsletters, and third-party services.",

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
    title: "Privacy Policy | Alentah",

    description:
      "Learn how Alentah collects, uses, protects, and manages personal information, cookies, analytics, advertising, accounts, comments, newsletters, and third-party services.",

    images: [`${siteUrl}/images/og/alentah-og.png`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
