import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary";

type ButtonProps = {
    variant?: Variant
} & ComponentProps<"button">

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
    return <button 
        {...props}
        className={twMerge(
            "transition-colors rounded px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed", 
            getVariantStyle(variant), 
            className
        )}
    />
}

function getVariantStyle(variant: Variant) {
    switch (variant) {
        case "primary":
            return "bg-orange-600 text-amber-50 hover:bg-orange-500";
        case "secondary":
            return "bg-zinc-700 hover:bg-zinc-600 text-zinc-400";
        default:
          throw new Error(`Invalid variant: ${variant satisfies never}`)
    }
}
