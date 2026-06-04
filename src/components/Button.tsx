import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "danger";

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
            return "bg-orange-600/40 border border-orange-700/60 hover:bg-orange-600/80 text-zinc-200";
        case "secondary":
            return "bg-blue-900/40 border border-blue-800/60 hover:bg-blue-800/80 text-zinc-200";
        case "danger":
            return "bg-red-950/40 border border-red-800/60 hover:bg-red-700/80 text-zinc-200 hover:text-white";
        default:
          throw new Error(`Invalid variant: ${variant satisfies never}`)
    }
}
