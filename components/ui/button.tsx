import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type ComponentVariant = "primary" | "secondary" | "ghost" | "outline";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const buttonVariantClasses: Record<ComponentVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_16px_32px_-20px_hsl(var(--primary)/0.85)] hover:bg-primary/90 hover:shadow-[0_18px_34px_-20px_hsl(var(--primary)/0.95)]",
  secondary:
    "border border-border bg-surface text-foreground hover:border-primary/30 hover:bg-primary/10",
  ghost: "bg-transparent text-foreground hover:bg-primary/10 hover:text-foreground",
  outline:
    "border border-border bg-transparent text-foreground hover:border-primary/30 hover:bg-primary/10",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[8px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          buttonVariantClasses[variant],
          buttonSizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
