import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "glow" | "success";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-bold rounded-full transition-colors select-none";

  const variants = {
    primary:
      "bg-primary text-white border border-primary/75 shadow-primary/20 shadow-sm",
    secondary:
      "bg-bg-surface text-text-muted border border-border-subtle hover:text-text-main",
    outline:
      "bg-transparent text-text-main border border-border-main",
    glow:
      "bg-primary text-white shadow-lg shadow-primary/25 border border-white/20",
    success:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
  };

  const sizes = {
    sm: "px-2.5 py-1 text-[11px] gap-1",
    md: "px-4 py-1.5 text-xs gap-1.5",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
}
