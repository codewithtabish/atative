import { Container } from "../../(common)/layout/container";

interface SectionMeta {
  id: string;
  number: string;
  title: string;
}

const SECTIONS: SectionMeta[] = [
  { id: "privacy-section-01", number: "01", title: "Introduction" },
  { id: "privacy-section-02", number: "02", title: "Information We Collect" },
  { id: "privacy-section-03", number: "03", title: "How We Use Information" },
  { id: "privacy-section-04", number: "04", title: "Accounts and Authentication" },
  { id: "privacy-section-05", number: "05", title: "Comments and User-Provided Content" },
  { id: "privacy-section-06", number: "06", title: "Public Information and Search Engines" },
  { id: "privacy-section-07", number: "07", title: "Newsletter" },
  { id: "privacy-section-08", number: "08", title: "Contact Form" },
  { id: "privacy-section-09", number: "09", title: "Cookies and Similar Technologies" },
  { id: "privacy-section-10", number: "10", title: "Cookie Preferences and Controls" },
  { id: "privacy-section-11", number: "11", title: "Analytics" },
  { id: "privacy-section-12", number: "12", title: "Advertising" },
  { id: "privacy-section-13", number: "13", title: "Third-Party Service Providers" },
  { id: "privacy-section-14", number: "14", title: "International Data Processing" },
  { id: "privacy-section-15", number: "15", title: "Third-Party Links" },
  { id: "privacy-section-16", number: "16", title: "Embedded Content" },
  { id: "privacy-section-17", number: "17", title: "Data Retention" },
  { id: "privacy-section-18", number: "18", title: "Data Security" },
  { id: "privacy-section-19", number: "19", title: "Security Incidents" },
  { id: "privacy-section-20", number: "20", title: "Your Privacy Rights" },
  { id: "privacy-section-21", number: "21", title: "Access and Correction Requests" },
  { id: "privacy-section-22", number: "22", title: "Account and Data Deletion" },
  { id: "privacy-section-23", number: "23", title: "Children's Privacy" },
  { id: "privacy-section-24", number: "24", title: "Data Sharing" },
  { id: "privacy-section-25", number: "25", title: "User Choices" },
  { id: "privacy-section-26", number: "26", title: "Legal and Business Operations" },
  { id: "privacy-section-27", number: "27", title: "Changes to This Privacy Policy" },
];

function SectionNumber({ number }: { number: string }) {
  return (
    <span className="font-mono text-sm font-semibold tracking-widest text-primary">{number}</span>
  );
}

function PrivacySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 border-t border-border py-10 md:py-14"
    >
      <div className="mb-6 flex items-baseline gap-4">
        <SectionNumber number={number} />
        <h2
          id={`${id}-heading`}
          className="text-xl font-semibold tracking-tight text-foreground md:text-2xl"
        >
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
        {children}
      </div>
    </section>
  );
}

function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground transition-colors">
      <h3 className="mb-2 text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <Container>
      <main className="pb-20 pt-16 md:pb-28 md:pt-24">
        <article className="mx-auto max-w-3xl">
          {/* Hero */}
          <header className="mb-16">
            <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-primary">
              Privacy & Trust
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
              Learn how Alentah collects, uses, protects, and manages personal information when you
              use our website and services.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: <time dateTime="2026-08-19">August 19, 2026</time>
            </p>
          </header>

          {/* Quick Summary */}
          <div className="mb-16 grid gap-4 sm:grid-cols-3">
            <SummaryCard title="Transparency">
              We explain what information may be collected and why, so you can make informed choices
              about using our services.
            </SummaryCard>
            <SummaryCard title="Your choices">
              You can request access, correction, deletion, and exercise other applicable privacy
              rights depending on your location.
            </SummaryCard>
            <SummaryCard title="International">
              Alentah is based in Pakistan and serves an international audience. Privacy rights and
              requirements may vary depending on where you are located.
            </SummaryCard>
          </div>

          {/* Table of Contents */}
          <nav
            aria-label="Privacy Policy contents"
            className="mb-16 rounded-2xl border border-border bg-muted/50 p-6 md:p-8"
          >
            <h2 className="mb-6 text-lg font-semibold text-foreground">Table of contents</h2>
            <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex items-start gap-3 rounded-md p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <span className="mt-0.5 font-mono text-xs font-medium text-primary opacity-60 group-hover:opacity-100">
                      {section.number}
                    </span>
                    <span className="leading-snug">{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="space-y-0">
            <PrivacySection id="privacy-section-01" number="01" title="Introduction">
              <p>
                Alentah (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website{" "}
                <a
                  href="https://www.alentah.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
                >
                  https://www.alentah.com/
                </a>{" "}
                (the &quot;Website&quot;). This Privacy Policy explains how we collect, use,
                protect, and manage personal information when you visit our Website, create an
                account, subscribe to our newsletter, submit a contact form, leave a comment, or
                otherwise interact with our services.
              </p>
              <p>
                This policy is designed for a Pakistan-based digital publication serving an
                international audience. Applicable privacy rights and requirements may depend on
                your location. We are committed to transparency about our data practices while
                acknowledging that specific legal obligations vary by jurisdiction.
              </p>
              <p>
                This Privacy Policy is effective as of <strong>August 19, 2026</strong>.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-02" number="02" title="Information We Collect">
              <p>We may collect or process the following categories of information:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Account information:</strong> When you create an account, we may collect
                  your email address, first name, last name, profile image, username, and Clerk user
                  ID.
                </li>
                <li>
                  <strong>Contact form submissions:</strong> When you contact us, we collect your
                  name, email address, and message.
                </li>
                <li>
                  <strong>Newsletter subscriptions:</strong> We collect your email address only.
                </li>
                <li>
                  <strong>Comments:</strong> When signed-in users leave comments, we process comment
                  content, associated account information, and timestamps.
                </li>
                <li>
                  <strong>Analytics data:</strong> Through Google Analytics, we may receive
                  information about website traffic, page views, general usage patterns, visitor
                  interactions, and technical or device information where provided by the analytics
                  service.
                </li>
                <li>
                  <strong>Advertising data:</strong> Through Google AdSense, we may receive or
                  process cookies, browser information, device information, usage information, and
                  advertising identifiers or related technologies where applicable.
                </li>
              </ul>
            </PrivacySection>

            <PrivacySection id="privacy-section-03" number="03" title="How We Use Information">
              <p>We may use the information we collect to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Provide, operate, and maintain the Website</li>
                <li>Authenticate users and manage accounts</li>
                <li>Operate and moderate comments</li>
                <li>Deliver newsletters and email communications</li>
                <li>Respond to contact inquiries and follow up on requests</li>
                <li>Analyze usage and improve our services</li>
                <li>Deliver relevant advertising</li>
                <li>Maintain security and prevent spam or fraud</li>
                <li>Comply with applicable legal obligations</li>
                <li>Enforce our policies and agreements</li>
              </ul>
            </PrivacySection>

            <PrivacySection id="privacy-section-04" number="04" title="Accounts and Authentication">
              <p>
                Alentah uses <strong>Clerk</strong> for authentication and account functionality.
                Users may authenticate through <strong>Google</strong>. The following information
                may be associated with a user account: email address, first name, last name, profile
                image, Clerk user ID, and username.
              </p>
              <p>
                Google authentication may involve Google and Clerk processing information according
                to their respective privacy policies and terms of service. We encourage you to
                review those policies to understand how they handle your information.
              </p>
            </PrivacySection>

            <PrivacySection
              id="privacy-section-05"
              number="05"
              title="Comments and User-Provided Content"
            >
              <p>
                Only signed-in users can comment. Our comment system may process comment content,
                associated account information, timestamps, and information reasonably necessary to
                operate and moderate comments.
              </p>
              <p>
                Users can delete their accounts. When a user deletes their account, their comments
                are deleted along with their account. We do not claim that deleted information is
                absolutely unrecoverable.
              </p>
            </PrivacySection>

            <PrivacySection
              id="privacy-section-06"
              number="06"
              title="Public Information and Search Engines"
            >
              <p>
                Some information voluntarily made public by users may be visible to visitors. Public
                information may potentially be viewed by others, shared, copied, indexed by search
                engines, cached, or archived by third parties.
              </p>
              <p>
                Alentah cannot control independent third-party copies, caches, or archives. Private
                account information does not automatically become public.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-07" number="07" title="Newsletter">
              <p>
                Alentah offers newsletter functionality. Newsletter subscription collects{" "}
                <strong>email address only</strong>. Newsletter email delivery uses{" "}
                <strong>Resend</strong>. Users can unsubscribe at any time by following the
                unsubscribe link in any newsletter email or by contacting us directly.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-08" number="08" title="Contact Form">
              <p>
                The contact form collects your name, email address, and message. Contact submissions
                are stored in Alentah&apos;s database. <strong>Resend</strong> is used for relevant
                email delivery.
              </p>
              <p>
                Contact information may be used to respond to inquiries, communicate with the
                sender, follow up on requests, and maintain appropriate records.
              </p>
            </PrivacySection>

            <PrivacySection
              id="privacy-section-09"
              number="09"
              title="Cookies and Similar Technologies"
            >
              <p>Alentah may use cookies and similar technologies for the following purposes:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Essential website functionality</li>
                <li>Authentication and maintaining signed-in sessions</li>
                <li>Analytics</li>
                <li>Advertising</li>
                <li>Applicable preferences</li>
              </ul>
              <p>
                We do not provide a cookie table with exact cookie names, durations, or identifiers.
                Only general categories are described unless exact implementation details are
                verified.
              </p>
            </PrivacySection>

            <PrivacySection
              id="privacy-section-10"
              number="10"
              title="Cookie Preferences and Controls"
            >
              <p>
                Cookie requirements vary by jurisdiction. Alentah may implement or update consent
                controls as required by applicable law. Alentah has{" "}
                <strong>not finalized its consent-management implementation</strong>.
              </p>
              <p>
                Users can manage cookies through their browser or device controls. Google and other
                providers may offer additional privacy controls. We do not claim that a cookie
                banner already exists.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-11" number="11" title="Analytics">
              <p>
                Alentah uses <strong>Google Analytics</strong>. Analytics may help Alentah
                understand website traffic, page views, general usage patterns, visitor
                interactions, and technical or device information where provided by the analytics
                service.
              </p>
              <p>
                We do not claim that analytics are completely anonymous. We also do not claim that
                Alentah personally sees every piece of information Google Analytics may process.
                Google may process information under its own policies.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-12" number="12" title="Advertising">
              <p>
                Alentah may use <strong>Google AdSense</strong>. Advertising may involve cookies,
                similar technologies, browser information, device information, usage information,
                and advertising identifiers or related technologies where applicable.
              </p>
              <p>
                Advertising may be personalized or non-personalized depending on applicable
                circumstances. We do not claim that every advertisement is personalized. We do not
                claim that Alentah personally selects every advertisement.
              </p>
              <p>Alentah may work with additional advertising partners in the future.</p>
            </PrivacySection>

            <PrivacySection
              id="privacy-section-13"
              number="13"
              title="Third-Party Service Providers"
            >
              <p>We rely on the following third-party providers to operate our services:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Clerk</strong> — Authentication
                </li>
                <li>
                  <strong>Google</strong> — Google authentication and related services
                </li>
                <li>
                  <strong>Google Analytics</strong> — Analytics
                </li>
                <li>
                  <strong>Google AdSense</strong> — Advertising
                </li>
                <li>
                  <strong>Resend</strong> — Email delivery
                </li>
                <li>
                  <strong>Vercel</strong> — Deployment and hosting infrastructure
                </li>
                <li>
                  <strong>Amazon Web Services</strong> — Infrastructure and cloud services
                </li>
              </ul>
              <p>
                For AWS, we do not name a specific AWS product unless explicitly confirmed.
                Third-party providers may process information as necessary to provide their
                services.
              </p>
            </PrivacySection>

            <PrivacySection
              id="privacy-section-14"
              number="14"
              title="International Data Processing"
            >
              <p>
                Alentah is based in Pakistan and serves users internationally. Some providers may
                process information outside Pakistan.
              </p>
              <p>
                International processing may be subject to applicable laws, provider practices,
                contractual safeguards, or other legally recognized safeguards where applicable. We
                do not invent a specific transfer mechanism.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-15" number="15" title="Third-Party Links">
              <p>
                Alentah may link to external websites. Those services have their own privacy
                policies and terms. Alentah does not control third-party privacy practices. We
                encourage users to review external privacy policies before providing any personal
                information.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-16" number="16" title="Embedded Content">
              <p>
                Embedded third-party content has not been finalized. We do not currently claim to
                embed YouTube, X, Instagram, TikTok, or Vimeo.
              </p>
              <p>
                Alentah may include third-party content in the future, and such content may interact
                with third-party services.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-17" number="17" title="Data Retention">
              <p>
                We do not apply a fixed retention period to all information. Information may be
                retained for as long as reasonably necessary for:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Providing services</li>
                <li>Maintaining accounts</li>
                <li>Responding to inquiries</li>
                <li>Operating comments</li>
                <li>Newsletter management</li>
                <li>Security</li>
                <li>Legal obligations</li>
                <li>Dispute resolution</li>
                <li>Enforcing agreements</li>
              </ul>
              <p>
                Information may be deleted, anonymized, or otherwise disposed of when no longer
                reasonably necessary, where appropriate and legally permitted.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-18" number="18" title="Data Security">
              <p>
                Alentah uses reasonable technical and organizational safeguards designed to protect
                personal information.
              </p>
              <p>
                We do not claim 100% security, guaranteed security, military-grade encryption, zero
                breaches, absolute protection, specific encryption algorithms, or specific security
                certifications. No internet service can guarantee absolute security.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-19" number="19" title="Security Incidents">
              <p>
                While we implement reasonable safeguards designed to protect your information, no
                internet-based service can guarantee absolute security. In the event of a security
                incident, we will take steps consistent with applicable requirements.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-20" number="20" title="Your Privacy Rights">
              <p>
                Privacy rights vary depending on where you live and applicable law. Where
                applicable, rights may include:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your information</li>
                <li>Objection to certain processing</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p>
                We do not claim that every right applies to every user. The availability of these
                rights depends on your jurisdiction and the nature of the processing involved.
              </p>
            </PrivacySection>

            <PrivacySection
              id="privacy-section-21"
              number="21"
              title="Access and Correction Requests"
            >
              <p>
                Users can contact{" "}
                <a
                  href="mailto:privacy@alentah.com"
                  className="text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
                >
                  privacy@alentah.com
                </a>{" "}
                for access requests, correction requests, deletion requests, privacy questions, and
                other applicable privacy requests.
              </p>
              <p>Alentah may reasonably verify identity before processing certain requests.</p>
            </PrivacySection>

            <PrivacySection id="privacy-section-22" number="22" title="Account and Data Deletion">
              <p>
                Users may request account or data deletion through{" "}
                <a
                  href="mailto:privacy@alentah.com"
                  className="text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
                >
                  privacy@alentah.com
                </a>
                .
              </p>
              <p>
                Account deletion may be subject to identity verification, legal obligations,
                security requirements, and legitimate recordkeeping requirements. We do not promise
                immediate deletion in every circumstance.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-23" number="23" title="Children's Privacy">
              <p>
                Alentah is a general-audience publication. It is not specifically directed toward
                children. We do not invent a minimum account age. We do not claim that Alentah is a
                children&apos;s service. We do not make unsupported COPPA compliance claims.
              </p>
              <p>
                If you believe that personal information has been provided inappropriately by a
                child, please contact us at{" "}
                <a
                  href="mailto:privacy@alentah.com"
                  className="text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
                >
                  privacy@alentah.com
                </a>
                .
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-24" number="24" title="Data Sharing">
              <p>
                Information may be processed by service providers when reasonably necessary for
                authentication, hosting, infrastructure, email, analytics, advertising, security,
                and website operations.
              </p>
              <p>
                We do not use absolute &quot;never share&quot; language. We also do not claim:
                &quot;We sell your personal information.&quot; That is not an established Alentah
                practice.
              </p>
            </PrivacySection>

            <PrivacySection id="privacy-section-25" number="25" title="User Choices">
              <p>You have choices regarding your privacy:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Manage cookies and similar technologies through your browser or device controls
                </li>
                <li>Unsubscribe from newsletters at any time</li>
                <li>
                  Contact{" "}
                  <a
                    href="mailto:privacy@alentah.com"
                    className="text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
                  >
                    privacy@alentah.com
                  </a>{" "}
                  to exercise applicable privacy rights
                </li>
                <li>Review and update account information through Clerk where applicable</li>
              </ul>
            </PrivacySection>

            <PrivacySection
              id="privacy-section-26"
              number="26"
              title="Legal and Business Operations"
            >
              <p>
                Information may be processed for purposes including website operation,
                authentication, account management, comments, newsletter delivery, contact requests,
                analytics, advertising, security, spam and fraud prevention, service improvement,
                legal compliance, and enforcement of policies.
              </p>
              <p>
                We do not assign one specific legal basis to all processing. The appropriate basis
                depends on the specific context and applicable law.
              </p>
            </PrivacySection>

            <PrivacySection
              id="privacy-section-27"
              number="27"
              title="Changes to This Privacy Policy"
            >
              <p>
                Alentah may update this Privacy Policy when services change, features change, data
                practices change, providers change, or legal requirements change.
              </p>
              <p>
                We encourage you to review this page periodically for any changes. The &quot;Last
                updated&quot; date at the top of this page indicates when the policy was last
                revised.
              </p>
              <p>
                <strong>Last updated: August 19, 2026</strong>
              </p>
            </PrivacySection>
          </div>

          {/* Contact CTA */}
          <section className="mt-16 rounded-2xl bg-primary p-8 text-primary-foreground md:mt-20 md:p-12">
            <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-primary-foreground/80">
              Privacy questions
            </span>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Need help with your personal information?
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-primary-foreground/90">
              If you have questions about this Privacy Policy, want to exercise your privacy rights,
              or need help managing your data, our team is here to assist you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:privacy@alentah.com"
                className="inline-flex items-center justify-center rounded-lg bg-primary-foreground px-5 py-2.5 text-sm font-medium text-primary transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-foreground"
              >
                Contact privacy team
              </a>
              <a
                href="mailto:tabish@codewithtabish.com"
                className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/30 px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-foreground"
              >
                General contact
              </a>
              <a
                href="https://wa.me/923169000919"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/30 px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-foreground"
              >
                WhatsApp
              </a>
            </div>
          </section>

          {/* Final legal note */}
          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              This Privacy Policy describes Alentah&apos;s current practices and is provided for
              informational purposes. It does not replace professional legal advice where such
              advice is required.
            </p>
          </div>
        </article>
      </main>
    </Container>
  );
}
