import React from "react";

export const Textarea = React.forwardRef(
  ({ className = "", disabled = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={`
          flex w-full rounded-md border border-border bg-background px-3 py-2
          text-sm text-foreground placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
          disabled:cursor-not-allowed disabled:opacity-50
          transition-colors
          ${className}
        `}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
