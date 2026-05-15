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
    <section id={id} className={cn("py-32 relative", className)}>
      <div className={cn("container mx-auto", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
