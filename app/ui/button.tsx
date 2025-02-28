import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md ring-0 text-sm font-medium transition-[background-color,border-color] duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground active:bg-primary-dark ring-primary hover:bg-primary-darker",
        secondary:
          "bg-secondary text-secondary-foreground active:bg-secondary-dark ring-secondary/50 hover:bg-secondary-darker",
        outline:
          "border border-border bg-background text-foreground ring-border-darker/50 hover:border-border-darker hover:bg-secondary active:bg-background-darker",
        ghost:
          "ring-secondary/50 hover:bg-secondary active:bg-secondary-darker text-secondary-foreground",
        attractive:
          "bg-gradient-to-r from-primary active:ring-4 text-primary-foreground font-medium !duration-300 hover:drop-shadow-[0_5px_8px_#f97316bf] to-orange-500 !px-5 !rounded-full ring-primary/50",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80"
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        iconDefault: "size-10",
        iconSm: "size-9",
        iconLg: "size-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, asChild, children = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && (
          <div className="mr-2 size-3 animate-spin rounded-full border-2 border-x-accent/60 border-b-accent/60 border-t-accent/100 bg-transparent" />
        )}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
