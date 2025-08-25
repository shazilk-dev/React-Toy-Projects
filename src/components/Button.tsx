import clsx from "clsx";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled: cursor - not - allowed";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary",
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
