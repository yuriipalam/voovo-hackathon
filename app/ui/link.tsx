import { cn } from "@/lib/utils";
import { Link as RemixLink } from "@remix-run/react";

const Link = ({
  className,
  ...props
}: React.ComponentProps<typeof RemixLink>) => {
  return (
    <RemixLink
      {...props}
      className={cn(
        "text-foreground hover:text-primary hover:underline",
        className
      )}
    />
  );
};

export { Link };
