import { ThemeProvider } from "@/components/(app)/(common)/theme/theme-provider";
import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import { Toaster } from "sonner";

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

const siteUrl = "https://atative.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "ATATIVE — Ideas, Guides, Trends & Insights",
    template: "%s | ATATIVE",
  },

  description:
    "ATATIVE is a modern digital publication covering technology, lifestyle, culture, entertainment, science, productivity, business, guides, reviews, and the ideas shaping everyday life.",

  applicationName: "ATATIVE",

  authors: [
    {
      name: "ATATIVE",
      url: siteUrl,
    },
  ],

  creator: "ATATIVE",
  publisher: "ATATIVE",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ATATIVE",

    title: "ATATIVE — Ideas, Guides, Trends & Insights",

    description:
      "ATATIVE is a modern digital publication covering technology, lifestyle, culture, entertainment, science, productivity, business, guides, reviews, and the ideas shaping everyday life.",

    images: [
      {
        url: "/images/og/atative-og.png",
        width: 1200,
        height: 630,
        alt: "ATATIVE — Ideas, Guides, Trends & Insights",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "ATATIVE — Ideas, Guides, Trends & Insights",

    description:
      "ATATIVE is a modern digital publication covering technology, lifestyle, culture, entertainment, science, productivity, business, guides, reviews, and the ideas shaping everyday life.",

    images: ["/images/og/atative-og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "ATATIVE",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/favicons/web-app-manifest-512x512.png`,
        width: 512,
        height: 512,
      },
    },

    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "ATATIVE",
      description:
        "A modern digital publication covering technology, lifestyle, culture, entertainment, science, productivity, business, guides, reviews, and ideas.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
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
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
