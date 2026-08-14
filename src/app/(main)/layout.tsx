import FullNavbar from "@/components/(app)/(common)/navbars/full-navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FullNavbar />
      <main>{children}</main>
    </>
  );
}
