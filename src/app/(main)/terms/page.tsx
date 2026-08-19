import TermsPageComp from "@/components/(app)/(pages)/terms/terms-page-comp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Alentah",
  description:
    "Read the Terms of Use governing your use of Alentah, including our content, accounts, intellectual property, and website usage policies.",
};

const TermsPage = () => {
  return <TermsPageComp />;
};

export default TermsPage;
