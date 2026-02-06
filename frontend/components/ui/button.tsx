import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-accent text-slate-900 hover:bg-accent/90",
  ghost: "border border-white/10 text-foreground hover:bg-white/5"
};

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
