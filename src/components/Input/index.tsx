import type React from "react";
import { mergeClassnames } from "../../utils/tailwind";

interface InputProps extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label?: string;
  labelClassName?: string;
}

export default function Input({
  className,
  label,
  labelClassName,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span
          className={mergeClassnames(
            "text-base font-medium text-gray-700",
            labelClassName,
          )}
        >
          {label}
        </span>
      )}

      <input
        {...props}
        className={mergeClassnames(
          "border border-gray-400 rounded-md px-2 py-1 max-w-64",
          className,
        )}
      />
    </div>
  );
}
