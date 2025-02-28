import { Toaster as Sonner } from "sonner";
import { toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  // The useTheme hook might useful.
  // const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      richColors
      closeButton
      position="bottom-left"
      toastOptions={{
        classNames: {
          closeButton: "right-0 left-auto translate-x-[35%] -translate-y-[35%]",
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      }}
      {...props}
    />
  );
};

export { Toaster as Sonner };
export { toast };
