import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "glass" | "bordered";
  hoverEffect?: boolean;
}

export function Card({
  className,
  variant = "surface",
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  const baseStyles =
    "rounded-3xl transition-all duration-300 relative overflow-hidden";

  const variants = {
    surface:
      "bg-bg-surface border border-border-subtle shadow-lg",
    glass:
      "glass-card border border-border-subtle shadow-xl backdrop-blur-xl",
    bordered:
      "bg-transparent border border-border-main",
  };

  const hoverStyles = hoverEffect
    ? "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
    : "";

  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
}
