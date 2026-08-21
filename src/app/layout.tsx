import type { Metadata } from "next";

import { ThemeProvider } from "@/components/(app)/(common)/theme/theme-provider";
import ExitIntentPopup from "@/components/(app)/(pages)/newsletter/exit-intent-popup";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8266173033916275"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ExitIntentPopup />

            {children}

            <Toaster />
            <Analytics />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
