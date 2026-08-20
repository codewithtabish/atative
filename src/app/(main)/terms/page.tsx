import TermsPageComp from "@/components/(app)/(pages)/terms/terms-page-comp";

import type { Metadata } from "next";

const siteUrl = "https://atative.com";

export const metadata: Metadata = {
  title: "Terms of Use | Alentah",

  description:
    "Read the Terms of Use governing your use of Alentah, including our content, accounts, intellectual property, and website usage policies.",

  alternates: {
    canonical: `${siteUrl}/terms`,
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/terms`,
    siteName: "Alentah",
    title: "Terms of Use | Alentah",

    description:
      "Read the Terms of Use governing your use of Alentah, including our content, accounts, intellectual property, and website usage policies.",

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
    title: "Terms of Use | Alentah",

    description:
      "Read the Terms of Use governing your use of Alentah, including our content, accounts, intellectual property, and website usage policies.",

    images: [`${siteUrl}/images/og/alentah-og.png`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const TermsPage = () => {
  return <TermsPageComp />;
};

export default TermsPage;
