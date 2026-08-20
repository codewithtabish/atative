import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  FileText,
  Mail,
  Megaphone,
  Phone,
  Scale,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Terms of Use — Alentah
 *
 * Reusable page-level component. Intended to be rendered from the
 * existing `/terms` route inside Alentah's app layout. Does not
 * render a header, footer, global container, or <html>/<body>.
 *
 * Recommended route metadata:
 *
 * import type { Metadata } from "next";
 *
 * export const metadata: Metadata = {
 *   title: "Terms of Use | Alentah",
 *   description:
 *     "Read the Terms of Use governing access to Alentah, including accounts, comments, content, advertising, intellectual property, acceptable use, and website services.",
 *   alternates: {
 *     canonical: "https://www.alentah.com/terms",
 *   },
 * };
 */

const LAST_UPDATED = "August 19, 2026";

type TocItem = {
  id: string;
  label: string;
};

const TOC: TocItem[] = [
  { id: "introduction", label: "Introduction" },
  { id: "acceptance", label: "Acceptance of These Terms" },
  { id: "eligibility", label: "Who May Use Alentah" },
  { id: "accounts", label: "Accounts and Authentication" },
  { id: "account-security", label: "Account Security" },
  { id: "comments", label: "Comments and User Content" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "intellectual-property", label: "Alentah Content and IP" },
  { id: "copyright", label: "Copyright Concerns" },
  { id: "newsletter", label: "Newsletter and Communications" },
  { id: "advertising", label: "Advertising and Direct Partnerships" },
  { id: "third-party", label: "Third-Party Services and Links" },
  { id: "editorial", label: "Editorial and Technology Information" },
  { id: "availability", label: "Website Availability" },
  { id: "privacy", label: "Privacy" },
  { id: "termination", label: "Account Suspension and Termination" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes", label: "Changes to These Terms" },
  { id: "general", label: "General Legal Provisions" },
  { id: "contact", label: "Contact Alentah" },
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

function ExternalTermLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-medium text-foreground underline underline-offset-4 decoration-muted-foreground/40 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
    >
      {children}
    </Link>
  );
}

export function TermsPageComp() {
  return (
    <main>
      {/* Hero */}
      <header className="border-b border-border/60 pb-10 pt-4 sm:pb-14 sm:pt-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Scale className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Legal</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            These Terms explain the rules that apply when you access and use Alentah, create an
            account, participate in discussions, and interact with our services.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </header>

      {/* Mobile TOC */}
      <div className="mx-auto max-w-3xl py-6 lg:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="toc" className="border-border/60">
            <AccordionTrigger className="text-sm font-medium">On this page</AccordionTrigger>
            <AccordionContent>
              <nav aria-label="Table of contents">
                <ul className="grid grid-cols-1 gap-2 pt-1 text-sm">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Content + sidebar */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 py-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-14">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <nav
            aria-label="Table of contents"
            className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              On this page
            </p>
            <ul className="mt-4 space-y-2.5 border-l border-border/60 text-sm">
              {TOC.map((item) => (
                <li key={item.id} className="pl-4">
                  <a
                    href={`#${item.id}`}
                    className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="mx-auto w-full max-w-3xl space-y-12">
          <Section id="introduction" title="Introduction">
            <p>
              Alentah is a digital publication covering artificial intelligence, AI tools, software,
              robotics, productivity, creativity, emerging technologies, and digital culture,
              through articles, guides, reviews, opinions, analysis, and interviews.
            </p>
            <p>
              These Terms of Use (&quot;Terms&quot;) describe the rules that apply when you visit
              Alentah, read its content, create an account, sign in, comment on articles, subscribe
              to the newsletter, contact Alentah, or otherwise use the website at{" "}
              <ExternalTermLink href="https://www.alentah.com/">alentah.com</ExternalTermLink>. We
              have tried to write them in plain language rather than dense legal jargon.
            </p>
          </Section>

          <Section id="acceptance" title="Acceptance of These Terms">
            <p>
              By accessing or using Alentah, you agree to these Terms and to any policies referenced
              in them, including our{" "}
              <ExternalTermLink href="/privacy-policy">Privacy Policy</ExternalTermLink>. If you do
              not agree with these Terms, please do not use Alentah where that choice is available
              to you.
            </p>
            <p>
              These Terms are intended to apply reasonably across jurisdictions. Nothing here is
              meant to claim that simply visiting a public webpage creates a binding contract in
              every legal system; where local law requires something different, that law governs on
              that point.
            </p>
          </Section>

          <Section id="eligibility" title="Who May Use Alentah">
            <p>
              Alentah is a general-audience publication. Anyone may use Alentah, subject to
              applicable law. You are responsible for making sure your use of Alentah complies with
              the laws that apply to you, including any laws relating to age, in your location.
            </p>
          </Section>

          <Section id="accounts" title="Accounts and Authentication">
            <p>
              Alentah uses <ExternalTermLink href="https://clerk.com/">Clerk</ExternalTermLink> to
              manage authentication, and currently supports signing in with Google through Clerk.
              Account information handled this way may include your email address, first name, last
              name, profile image, Clerk user ID, and username where applicable. Our{" "}
              <ExternalTermLink href="/privacy-policy">Privacy Policy</ExternalTermLink> explains
              how this information is processed in more detail.
            </p>
            <p>You agree that you will:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/60">
              <li>Only use an account you are authorized to use.</li>
              <li>
                Not impersonate another person or organization, or misrepresent your affiliation
                with one.
              </li>
              <li>Not use an account for fraud, abuse, or other deceptive purposes.</li>
            </ul>
            <p>
              Alentah may restrict or suspend accounts involved in serious violations of these
              Terms, as described in{" "}
              <a
                href="#termination"
                className="font-medium text-foreground underline underline-offset-4 hover:decoration-foreground"
              >
                Account Suspension and Termination
              </a>
              .
            </p>
          </Section>

          <Section id="account-security" title="Account Security">
            <p>
              We take reasonable measures to help protect our account systems. That said, we cannot
              guarantee that our systems, or any system, are completely secure — no service can
              promise &quot;100% security&quot; or that it is impossible to compromise.
            </p>
            <p>You also play a role in keeping your account secure. Please:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/60">
              <li>Protect access to the Google account you sign in with.</li>
              <li>Keep the devices you use to access Alentah secure.</li>
              <li>Avoid sharing account access unnecessarily.</li>
              <li>
                Let us know at{" "}
                <a
                  href="mailto:privacy@alentah.com"
                  className="font-medium text-foreground underline underline-offset-4 hover:decoration-foreground break-all"
                >
                  privacy@alentah.com
                </a>{" "}
                if you believe your account is being misused.
              </li>
            </ul>
          </Section>

          <Section id="comments" title="Comments and User Content">
            <p>
              Signed-in users can comment on Alentah articles. You are responsible for the comments
              and other content you submit. Comments must not be illegal, threatening, harassing,
              abusive, hateful, defamatory, fraudulent, spam, malicious, infringing on someone
              else&apos;s intellectual-property rights, impersonating another person, deceptive,
              disruptive to the website, or otherwise inappropriate for the discussion.
            </p>
            <p>
              We may review, moderate, restrict, or remove comments when we reasonably believe it is
              necessary to enforce these Terms, protect users, prevent abuse or spam, protect the
              platform, address legal concerns, or keep discussions useful. We do not claim to
              manually review every comment before it is published.
            </p>
            <p>
              If you delete your Alentah account, your comments are deleted along with it, in line
              with our established account-deletion practice — except for records we may need to
              retain where required or permitted by law.
            </p>
            <p>
              You retain ownership of content you lawfully own. By submitting a comment or other
              content to Alentah, you grant Alentah a non-exclusive license to host, store,
              reproduce, display, distribute, and otherwise use that content as necessary to
              operate, maintain, moderate, and improve the relevant Alentah feature. This does not
              transfer ownership of your content to Alentah, and it is not an unlimited commercial
              license to everything you have ever created.
            </p>
            <p>
              You should only submit content you have the right to submit, and it must not infringe
              copyright or trademarks, violate someone&apos;s privacy rights or applicable law,
              contain malicious code, impersonate another person, or intentionally misrepresent
              facts in a harmful way.
            </p>
          </Section>

          <Section id="acceptable-use" title="Acceptable Use">
            <p>
              You agree to use Alentah lawfully. You must not use Alentah to break applicable laws;
              attack, compromise, or introduce malware into the website; attempt unauthorized access
              or circumvent security; scrape content in ways that interfere with our operations;
              spam, harass, or impersonate others; commit fraud; interfere with the website&apos;s
              availability; or otherwise abuse comments or other features.
            </p>
            <p>
              This includes probing our systems without authorization, attempting to bypass
              authentication, exploiting vulnerabilities maliciously, interfering with our
              infrastructure, or attempting unauthorized data extraction. We do not publish
              technical details about how to attack the website.
            </p>
          </Section>

          <Section id="intellectual-property" title="Alentah Content and Intellectual Property">
            <p>
              Alentah owns, or has the right to use, its editorial content, branding, design,
              graphics, logos, text, layouts, and other original website materials, unless otherwise
              indicated. You may access and read Alentah&apos;s content for personal and lawful
              purposes.
            </p>
            <p>
              You must not reproduce, republish, scrape, systematically copy, redistribute, sell, or
              commercially exploit Alentah&apos;s content without appropriate authorization, except
              where permitted by law — for example, under applicable fair use or fair dealing
              principles. Third-party trademarks and content referenced on Alentah remain the
              property of their respective owners, and nothing in these Terms transfers ownership of
              Alentah&apos;s intellectual property to you.
            </p>
          </Section>

          <Section id="copyright" title="Copyright Concerns">
            <p>
              If you believe content on Alentah infringes your copyright, please contact us at{" "}
              <a
                href="mailto:tabish@codewithtabish.com"
                className="font-medium text-foreground underline underline-offset-4 hover:decoration-foreground break-all"
              >
                tabish@codewithtabish.com
              </a>{" "}
              with enough information for us to look into it, including: a description of the
              copyrighted work, a description of the allegedly infringing material, where that
              material appears on Alentah, your contact information, and any other information
              reasonably necessary to investigate the complaint.
            </p>
          </Section>

          <Section id="newsletter" title="Newsletter and Communications">
            <p>
              Alentah offers a newsletter that requires an email address to subscribe. Subscribing
              is voluntary, and you can unsubscribe at any time; unsubscribing from the newsletter
              does not delete your Alentah account. Our{" "}
              <ExternalTermLink href="/privacy-policy">Privacy Policy</ExternalTermLink> has more
              information about how newsletter data is processed.
            </p>
            <p>
              Our contact form may collect your name, email address, and message. Please provide
              accurate information, and do not use the contact form for spam, fraud, threats,
              malware, abusive communications, or other unlawful activity.
            </p>
          </Section>

          <Section id="advertising" title="Advertising and Direct Partnerships">
            <p>
              Alentah may display advertising through third-party services such as Google AdSense.
              Google AdSense is separate from Alentah&apos;s direct advertising partnerships, and
              not every advertisement is selected by Alentah or necessarily personalized.
              Advertising may involve third-party cookies or similar technologies, as described
              further in our{" "}
              <ExternalTermLink href="/privacy-policy">Privacy Policy</ExternalTermLink>.
            </p>
            <p>
              Separately, Alentah may offer direct advertising and promotional partnerships.
              Companies, brands, creators, organizations, or individuals may contact us — see our{" "}
              <ExternalTermLink href="/advertise">Advertise</ExternalTermLink> page — about
              opportunities to promote products, services, software, AI tools, or other offerings.
              These arrangements are commercial and may involve payment. We evaluate partnership
              requests based on relevance, editorial standards, audience fit, quality, and other
              business considerations, and we do not accept every proposal.
            </p>
            <p>
              If Alentah publishes sponsored or paid promotional content, we aim to present it
              transparently and identify it appropriately. We do not guarantee sales, revenue,
              traffic, conversions, search rankings, engagement, leads, or any other business result
              from an advertising arrangement, and we do not guarantee that commercial relationships
              never influence any editorial decision — we aim to maintain editorial standards when
              evaluating commercial partnerships.
            </p>
          </Section>

          <Section id="third-party" title="Third-Party Services and Links">
            <p>Alentah uses, or may use, a number of third-party services, including:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/60">
              <li>
                <span className="text-foreground">Clerk</span> and{" "}
                <span className="text-foreground">Google</span> for authentication.
              </li>
              <li>
                <span className="text-foreground">Google Analytics</span> for website analytics.
              </li>
              <li>
                <span className="text-foreground">Google AdSense</span> for third-party advertising.
              </li>
              <li>
                <span className="text-foreground">Resend</span> for email delivery.
              </li>
              <li>
                <span className="text-foreground">Vercel</span> for deployment and hosting.
              </li>
              <li>
                <span className="text-foreground">Amazon Web Services (AWS)</span> as part of our
                infrastructure.
              </li>
            </ul>
            <p>
              These providers operate under their own terms and privacy policies. Alentah may also
              link to external websites that we do not control. We encourage you to review the terms
              and privacy practices of any external website you visit, and we are not responsible
              for the content, availability, security, or privacy practices of websites outside our
              control — we do not claim that every external link is safe. Alentah may include
              third-party content or embeds in the future; such content would be governed by that
              third party&apos;s own terms and privacy practices.
            </p>
          </Section>

          <Section id="editorial" title="Editorial and Technology Information">
            <p>
              Alentah&apos;s articles, guides, reviews, opinions, and analysis are provided for
              general informational and educational purposes. Technology — including AI models, AI
              tools, software, robotics, and other products discussed on Alentah — can change
              quickly, and we do not guarantee that any article will always remain complete,
              current, error-free, or suitable for your specific situation.
            </p>
            <p>
              Product reviews reflect editorial analysis and opinion based on the information
              available to us, and where applicable, our own testing; we do not claim that every
              review is entirely objective or that every product has been personally tested. Nothing
              on Alentah is intended as professional legal, financial, medical, security,
              engineering, or other specialized advice — please evaluate products and information
              independently before making important decisions.
            </p>
          </Section>

          <Section id="availability" title="Website Availability">
            <p>
              We aim to provide a reliable website, but we do not guarantee uninterrupted
              availability or a specific uptime figure. Alentah may occasionally be temporarily
              unavailable, updated, maintained, modified, or interrupted due to infrastructure
              issues or events outside our reasonable control.
            </p>
          </Section>

          <Section id="privacy" title="Privacy">
            <p>
              Our <ExternalTermLink href="/privacy-policy">Privacy Policy</ExternalTermLink>{" "}
              explains how we collect, use, and protect information, including topics like cookies,
              analytics, advertising, third-party services, data retention, and your privacy rights,
              including how to request account or data deletion. It forms part of the agreement
              between you and Alentah alongside these Terms. We also maintain a separate{" "}
              <ExternalTermLink href="/accessibility">Accessibility</ExternalTermLink> page.
            </p>
          </Section>

          <Section id="termination" title="Account Suspension and Termination">
            <p>
              We may suspend, restrict, or terminate access to an account or feature where we
              reasonably believe it is necessary to protect the platform, prevent abuse, address
              serious violations of these Terms, protect other users, comply with law, or
              investigate security concerns. We do not promise that advance notice will always be
              given, and where applicable law limits our ability to terminate an account without
              cause, that law applies.
            </p>
            <p>
              You may request deletion of your account and associated data by contacting{" "}
              <a
                href="mailto:privacy@alentah.com"
                className="font-medium text-foreground underline underline-offset-4 hover:decoration-foreground break-all"
              >
                privacy@alentah.com
              </a>
              . Deletion may be subject to identity verification and any legal, security, or
              legitimate recordkeeping requirements that apply. Our{" "}
              <ExternalTermLink href="/privacy-policy">Privacy Policy</ExternalTermLink> has more
              detail on how we handle personal-data deletion.
            </p>
          </Section>

          <Section id="disclaimers" title="Disclaimers">
            <p>
              To the extent permitted by applicable law, Alentah provides the website and its
              content on an &quot;as available&quot; basis, without guaranteeing that the website
              will always be available, content will always be error-free or current, services will
              operate without interruption, or every feature will always function as expected.
              Nothing here is intended to exclude rights that cannot legally be excluded under the
              law that applies to you.
            </p>
          </Section>

          <Section id="liability" title="Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, Alentah is not responsible for
              indirect, incidental, consequential, or similar losses arising from your use of the
              website, except where such liability cannot legally be excluded. Nothing in this
              section is intended to limit liability beyond what applicable law allows.
            </p>
          </Section>

          <Section id="indemnification" title="Indemnification">
            <p>
              To the extent permitted by applicable law, you agree to be responsible for claims that
              reasonably arise from your unlawful use of Alentah, your violation of these Terms,
              your infringement of another person&apos;s rights, or your misuse of the platform.
            </p>
          </Section>

          <Section id="governing-law" title="Governing Law">
            <p>
              These Terms are generally governed by the laws applicable in Pakistan, where Alentah
              is based, subject to any mandatory rights and protections that may apply to you under
              the laws of your place of residence. If you have mandatory legal rights under your
              local law that cannot be waived by these Terms, those rights are not affected.
            </p>
          </Section>

          <Section id="changes" title="Changes to These Terms">
            <p>
              We may update these Terms from time to time — for example, as our features, services,
              business practices, or applicable law change. The current version will always be
              available on this page, along with the date it was last updated. We do not promise a
              specific advance-notice period for changes unless stated otherwise.
            </p>
          </Section>

          <Section id="general" title="General Legal Provisions">
            <p>
              <span className="font-medium text-foreground">Severability.</span> If any provision of
              these Terms is found invalid or unenforceable, the remaining provisions will continue
              to apply to the extent permitted by law.
            </p>
            <p>
              <span className="font-medium text-foreground">Entire agreement.</span> These Terms,
              together with the policies referenced in them, make up the agreement governing your
              use of the relevant Alentah services, subject to applicable law and without overriding
              any separately agreed commercial contract.
            </p>
            <p>
              <span className="font-medium text-foreground">No waiver.</span> If we do not
              immediately enforce a provision of these Terms, that does not necessarily mean we
              waive our right to enforce it later.
            </p>
            <p>
              <span className="font-medium text-foreground">Assignment.</span> We may assign these
              Terms as part of a reasonable business transfer; you may not assign your rights or
              obligations under these Terms without our consent.
            </p>
          </Section>

          <Section id="contact" title="Contact Alentah">
            <p>
              Questions about these Terms, or think you&apos;ve spotted an issue on the website?
              We&apos;d like to hear from you.
            </p>

            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  General
                </div>
                <a
                  href="mailto:tabish@codewithtabish.com"
                  className="mt-2 block break-all text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  tabish@codewithtabish.com
                </a>
              </div>

              <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Privacy
                </div>
                <a
                  href="mailto:privacy@alentah.com"
                  className="mt-2 block break-all text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  privacy@alentah.com
                </a>
              </div>

              <div className="rounded-lg border border-border/60 bg-muted/30 p-4 sm:col-span-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Phone / WhatsApp
                </div>
                <a
                  href="tel:+923169000919"
                  className="mt-2 inline-block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  +92 316 9000919
                </a>
              </div>
            </div>
          </Section>

          <Separator className="bg-border/60" />

          {/* Final navigation */}
          <nav
            aria-label="Related policies"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-4 text-sm"
          >
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Privacy Policy
            </Link>
            <Link
              href="/accessibility"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              <UserCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Accessibility
            </Link>
            <Link
              href="/advertise"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
              Advertise
            </Link>
            <a
              href="https://www.alentah.com/"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              alentah.com
            </a>
          </nav>
        </main>
      </div>
    </main>
  );
}

export default TermsPageComp;
