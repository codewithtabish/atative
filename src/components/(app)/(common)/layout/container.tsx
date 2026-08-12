import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-360",
        "border-x border-border/60",
        "px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}