import React, { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

/**
 * Reusable Button with Tailwind variants.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      onClick,
      disabled = false,
      icon: Icon,
      className = "",
      type = "button",
      loading = false,
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
      secondary:
        "bg-slate-600 hover:bg-slate-700 text-white focus:ring-slate-500",
      outline:
        "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-500",
      danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    };

    const sizeClasses = {
      sm: "px-3 py-2 text-sm gap-1",
      md: "px-4 py-2.5 text-base gap-2",
      lg: "px-6 py-3 text-lg gap-2",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          <>
            {Icon && (
              <Icon size={size === "sm" ? 16 : size === "lg" ? 20 : 18} />
            )}
            {children}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
