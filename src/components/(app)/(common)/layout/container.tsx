import { cn } from "@/lib/utils";
import * as React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-360", "px-[clamp(1rem,4vw,3rem)]", className)}
      {...props}
    >
      {children}
    </div>
  );
}
