import { cn } from "@/lib/utils";
import * as React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-360", "px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 ", className)}
      {...props}
    >
      {children}
    </div>
  );
}
