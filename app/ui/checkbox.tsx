import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border ring-offset-background focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2",
  {
    variants: {
      variant: {
        default:
          "border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        secondary:
          "border-secondary-darker focus-visible:ring-secondary-darker data-[state=checked]:bg-secondary-darker data-[state=checked]:text-secondary-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxVariants>
>(({ className, variant, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
