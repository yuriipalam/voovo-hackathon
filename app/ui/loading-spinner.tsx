import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps extends ComponentPropsWithoutRef<"div"> {}

export function LoadingSpinner({ className, ...props }: LoadingSpinnerProps) {
  return (
    <div
      {...props}
      className={cn(
        "h-8 w-8 animate-spin rounded-full border-4 border-x-gray-400 border-b-gray-400 border-t-primary bg-transparent",
        className
      )}
    />
  );
}
