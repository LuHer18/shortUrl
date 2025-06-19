import * as React from "react"
import { cn } from "../../lib/utils"
import { useFormContext } from "react-hook-form"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string // Hacemos que name sea requerido para react-hook-form
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, ...props }, ref) => {
    const formContext = useFormContext()
    const { register } = formContext || {}

    // Si estamos dentro de un FormProvider, usamos register
    if (formContext) {
      return (
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...register(name)}
          {...props}
        />
      )
    }

    // Si no estamos dentro de un FormProvider, usamos el ref normal
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        name={name}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input } 