import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function Section({
  id,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-24 relative overflow-hidden bg-bg-main", className)}>
      <div className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
