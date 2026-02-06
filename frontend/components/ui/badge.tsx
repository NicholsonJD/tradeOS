import { cn } from "@/lib/utils";

const variants = {
  default: "bg-muted text-foreground",
  success: "bg-success/20 text-success",
  danger: "bg-danger/20 text-danger",
  accent: "bg-accent/20 text-accent"
};

export function Badge({
  variant = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
