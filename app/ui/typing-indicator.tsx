import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface TypingIndicatorProps extends ComponentPropsWithoutRef<"div"> {
  size?: "sm" | "default";
}

const typingIndicatorVariants = cva(
  "animate-fast-pulse rounded-full bg-gray-500",
  {
    variants: {
      size: {
        default: "size-1.5",
        sm: "size-1"
      }
    },
    defaultVariants: { size: "default" }
  }
);

export function TypingIndicator(props: TypingIndicatorProps) {
  const { size, className, ...rest } = props;

  return (
    <div
      className={cn("flex", size === "sm" ? "gap-0.5" : "gap-1", className)}
      {...rest}
    >
      <div
        className={cn(
          typingIndicatorVariants({ size }),
          "[animation-delay:-0.3s]"
        )}
      />
      <div
        className={cn(
          typingIndicatorVariants({ size }),
          "[animation-delay:-0.15s]"
        )}
      />
      <div className={cn(typingIndicatorVariants({ size }))} />
    </div>
  );
}
