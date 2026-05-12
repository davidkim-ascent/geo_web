import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "ui-button-base",
        outline: "ui-button-outline",
        cta: "ui-cta-button btn-filled-dark",
        ctaOutline: "ui-cta-button-outline btn-outline-dark",
        detail: "ui-detail-button ui-detail-button-dark",
        header: "ui-header-cta",
        submit: "ui-form-submit justify-center",
        bare: "bg-transparent p-0",
        icon: "inline-flex items-center justify-center rounded-md p-1",
        ghost: "ui-button-outline border-transparent bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        xs: "text-xs",
        sm: "text-sm",
        lg: "text-base",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
