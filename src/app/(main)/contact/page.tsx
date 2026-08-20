import type { Metadata } from "next";

import { ContactInformation } from "@/components/(app)/(pages)/contact/contact-form-information";
import { ContactForm } from "@/components/(app)/(pages)/contact/contact-from";
import { ContactMap } from "@/components/(app)/(pages)/contact/contact-map";

import { Container } from "@/components/(app)/(common)/layout/container";
import "leaflet/dist/leaflet.css";

const siteUrl = "https://www.alentah.com";

export const metadata: Metadata = {
  title: "Contact Alentah — Get in Touch",
  description:
    "Contact Alentah for questions, story ideas, partnerships, advertising inquiries, and other editorial or technology-related conversations.",

  alternates: {
    canonical: `${siteUrl}/contact`,
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/contact`,
    siteName: "Alentah",
    title: "Contact Alentah — Get in Touch",
    description:
      "Contact Alentah for questions, story ideas, partnerships, advertising inquiries, and other editorial or technology-related conversations.",
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
    title: "Contact Alentah — Get in Touch",
    description:
      "Contact Alentah for questions, story ideas, partnerships, advertising inquiries, and other editorial or technology-related conversations.",
    images: [`${siteUrl}/images/og/alentah-og.png`],
  },
};

export default function ContactPage() {
  return (
    <main>
      <Container>
        <div className="space-y-20 py-16 sm:space-y-24 sm:py-20 lg:space-y-28 lg:py-24">
          <section aria-labelledby="contact-page-title">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Contact Alentah
              </p>

              <h1
                id="contact-page-title"
                className="max-w-5xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
              >
                Let&apos;s start a conversation.
              </h1>

              <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
                Have a question, story idea, partnership opportunity, advertising inquiry, or simply
                want to reach the Alentah team? We&apos;d love to hear from you.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="contact-form-title"
            className="grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-20 xl:gap-28"
          >
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Send a message
                </p>

                <h2
                  id="contact-form-title"
                  className="text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl"
                >
                  Tell us what&apos;s on your mind.
                </h2>
              </div>

              <ContactForm />
            </div>

            <aside
              aria-label="Alentah contact information"
              className="lg:border-l lg:border-border lg:pl-10 xl:pl-14"
            >
              <ContactInformation />
            </aside>
          </section>

          <section aria-labelledby="location-title" className="space-y-8">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-12">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Our location
                </p>

                <h2
                  id="location-title"
                  className="text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl"
                >
                  Where we&apos;re based
                </h2>
              </div>

              <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end">
                Alentah is an independent digital publication based in Mardan, Khyber Pakhtunkhwa,
                Pakistan.
              </p>
            </div>

            <ContactMap />
          </section>
        </div>
      </Container>
    </main>
  );
}
