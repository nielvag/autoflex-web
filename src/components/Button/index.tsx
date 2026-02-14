import type React from "react";
import { mergeClassnames } from "../../utils/tailwind";

interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  variant?: "primary";
}

export default function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={mergeClassnames(
        "border border-gray-400 rounded-md px-2 py-1 max-w-64",
        variant === "primary" ? "bg-gray-900 text-gray-200" : "",
        className,
      )}
    />
  );
}
