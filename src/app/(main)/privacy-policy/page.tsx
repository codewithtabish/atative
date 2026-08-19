import { PrivacyPolicy } from "@/components/(app)/(pages)/privacy/privacy-policy-comp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Alentah",
  description:
    "Learn how Alentah collects, uses, protects, and manages personal information, cookies, analytics, advertising, accounts, comments, newsletters, and third-party services.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
