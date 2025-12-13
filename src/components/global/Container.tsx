import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <section className={cn("mx-auto w-full max-w-360 p-5", className)}>
      {children}
    </section>
  );
}
