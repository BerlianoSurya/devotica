import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Color =
  | "primary"
  | "secondary"
  | "destructive"
  | "muted"
  | "accent";
export type ClickEffect =
  | "none"
  | "ripple"
  | "bounce"
  | "scale"
  | "shake"
  | "pulse";
export type HoverEffect =
  | "none"
  | "lift"
  | "glow"
  | "scale"
  | "rotate"
  | "slide"
  | "shimmer";

type SizeStyle = {
  iconSize?: number;
};

export const sizeStyles: Record<Size, SizeStyle> = {
  xs: { iconSize: 14 },
  sm: { iconSize: 16 },
  md: { iconSize: 16 },
  lg: { iconSize: 20 },
  xl: { iconSize: 24 },
};

export const spinnerSizeMap: Record<Size, number> = {
  xs: 14,
  sm: 16,
  md: 16,
  lg: 20,
  xl: 24,
};

export const defaultIconSizes: Record<Size, number> = {
  xs: 14,
  sm: 16,
  md: 16,
  lg: 20,
  xl: 24,
};

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 px-6",
        xl: "h-12 px-8 text-base",
      },
      color: {
        primary: "",
        secondary: "",
        destructive: "",
        muted: "",
        accent: "",
      },
      isCircle: {
        true: "rounded-full",
        false: "",
      },
      isIconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        isIconOnly: true,
        size: "xs",
        className: "w-7 h-7 px-0",
      },
      {
        isIconOnly: true,
        size: "sm",
        className: "w-8 h-8 px-0",
      },
      {
        isIconOnly: true,
        size: "md",
        className: "w-9 h-9 px-0",
      },
      {
        isIconOnly: true,
        size: "lg",
        className: "w-10 h-10 px-0",
      },
      {
        isIconOnly: true,
        size: "xl",
        className: "w-12 h-12 px-0",
      },
      {
        color: "primary",
        variant: "default",
        className: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      {
        color: "secondary",
        variant: "default",
        className:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      {
        color: "destructive",
        variant: "default",
        className:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      {
        color: "muted",
        variant: "default",
        className: "bg-muted text-muted-foreground hover:bg-muted/80",
      },
      {
        color: "accent",
        variant: "default",
        className: "bg-accent text-accent-foreground hover:bg-accent/80",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      color: "primary",
      isCircle: false,
      isIconOnly: false,
    },
  }
);

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconSize?: number;
  isIconOnly?: boolean;
  isCircle?: boolean;
  isDisabled?: boolean;
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  color?: Color;
  clickEffect?: ClickEffect;
  hoverEffect?: HoverEffect;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant,
      size = "md",
      color = "primary",
      asChild = false,
      loading = false,
      icon,
      iconSize,
      isIconOnly = false,
      isCircle = false,
      isDisabled = false,
      isLeftIcon = true,
      isRightIcon = false,
      clickEffect = "none",
      hoverEffect = "none",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const actualIconSize = iconSize || (size ? defaultIconSizes[size] : 16);
    const spinnerSize = size ? spinnerSizeMap[size] : 16;
    const isButtonDisabled = disabled || isDisabled || loading;
    const iconPosition = isRightIcon ? "right" : "left";
    const renderIcon = () => {
      if (loading) {
        return <Loader2 className="animate-spin" size={spinnerSize} />;
      }
      if (icon) {
        return React.cloneElement(icon as React.ReactElement, {
          size: actualIconSize,
        });
      }
      return null;
    };

    const iconElement = renderIcon();
    const getEffectClasses = () => {
      const classes = [];
      if (isButtonDisabled) return "";
      switch (clickEffect) {
        case "ripple":
          classes.push("click-ripple");
          break;
        case "bounce":
          classes.push("click-bounce");
          break;
        case "scale":
          classes.push("click-scale");
          break;
        case "shake":
          classes.push("click-shake");
          break;
        case "pulse":
          classes.push("click-pulse");
          break;
      }
      switch (hoverEffect) {
        case "lift":
          classes.push("hover-lift");
          break;
        case "glow":
          classes.push("hover-glow");
          break;
        case "scale":
          classes.push("hover-scale");
          break;
        case "rotate":
          classes.push("hover-rotate");
          break;
        case "slide":
          classes.push("hover-slide");
          break;
        case "shimmer":
          classes.push("hover-shimmer");
          break;
      }

      return classes.join(" ");
    };

    const renderButtonContent = () => {
      if (isIconOnly) {
        return iconElement;
      }

      if (!iconElement) {
        return children;
      }

      if (iconPosition === "right") {
        return (
          <>
            {children}
            <span className={cn("flex items-center", children && "ml-2")}>
              {iconElement}
            </span>
          </>
        );
      }

      return (
        <>
          <span className={cn("flex items-center", children && "mr-2")}>
            {iconElement}
          </span>
          {children}
        </>
      );
    };

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            color,
            isCircle,
            isIconOnly,
            className,
          }),
          getEffectClasses()
        )}
        ref={ref}
        disabled={isButtonDisabled}
        {...props}
      >
        {renderButtonContent()}
      </Comp>
    );
  }
);
CustomButton.displayName = "CustomButton";

export { CustomButton, buttonVariants };
