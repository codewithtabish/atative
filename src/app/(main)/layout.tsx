import AtativeFooter from "@/components/(app)/(common)/footer/full-footer";
import { Container } from "@/components/(app)/(common)/layout/container";
import FullNavbar from "@/components/(app)/(common)/navbars/full-navbar";
import { Metadata } from "next";

const siteUrl = "https://www.alentah.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Alentah — Technology, AI, Science & More",
    template: "%s | Alentah",
  },

  description:
    "Explore the latest news, insights, guides, reviews, and ideas across technology, artificial intelligence, science, software, robotics, productivity, business, culture, and emerging trends.",

  applicationName: "Alentah",

  authors: [
    {
      name: "Alentah",
      url: siteUrl,
    },
  ],

  creator: "Alentah",
  publisher: "Alentah",

  category: "technology",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/images/favicons/favicon.ico",
        sizes: "any",
      },
      {
        url: "/images/favicons/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],

    apple: [
      {
        url: "/images/favicons/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },

  manifest: "/images/favicons/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Alentah",

    title: "Alentah — Technology, AI, Science & More",

    description:
      "Explore the latest news, insights, guides, reviews, and ideas across technology, artificial intelligence, science, software, robotics, productivity, business, culture, and emerging trends.",

    images: [
      {
        url: "/images/og/alentah-og.png",
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

    images: ["/images/og/alentah-og.png"],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <FullNavbar />
      <main>{children}</main>
      <AtativeFooter />
    </Container>
  );
}
