import AtativeFooter from "@/components/(app)/(common)/footer/full-footer";
import { Container } from "@/components/(app)/(common)/layout/container";
import FullNavbar from "@/components/(app)/(common)/navbars/full-navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <FullNavbar />
      <main>{children}</main>
      <AtativeFooter />
    </Container>
  );
}
