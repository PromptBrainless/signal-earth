import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonStyles = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:bg-accent/90",
        quiet: "border border-line bg-raised text-fg hover:border-accent",
        ghost: "text-muted hover:bg-raised hover:text-fg",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "quiet", block: false },
  },
);

export function Button({
  variant,
  block,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>) {
  return (
    <button type={type} className={cn(buttonStyles({ variant, block }), className)} {...props} />
  );
}

export function Pill({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs",
        tone === "accent"
          ? "border-accent/40 bg-accent/15 text-accent"
          : "border-line bg-raised text-muted",
      )}
    >
      {children}
    </span>
  );
}
