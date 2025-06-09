
import * as React from "react"
import { cn } from "@/lib/utils"

export interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  isValid?: boolean
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, type, hasError, isValid, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary",
          "hover:border-primary/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-destructive bg-destructive/5 focus-visible:ring-destructive focus-visible:border-destructive",
          isValid && "border-green-500 bg-green-50 dark:bg-green-950/20 focus-visible:ring-green-500",
          "md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
EnhancedInput.displayName = "EnhancedInput"

export { EnhancedInput }
