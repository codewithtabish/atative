// src/app/dashboard/layout.tsx
import DashboardSidebar from "@/components/(app)/(common)/dashboard-sidebar/dashboard-sidebar";
import { Container } from "@/components/(app)/(common)/layout/container";
import type { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <Container>{children}</Container>
      </main>
    </div>
  );
};

export default DashboardLayout;
