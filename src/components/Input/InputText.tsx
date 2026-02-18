import type React from "react";
import { mergeClassnames } from "../../utils/tailwind";

interface InputProps extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label?: string;
  labelClassName?: string;
}

export default function InputText({
  className,
  label,
  labelClassName,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className={mergeClassnames("input-label", labelClassName)}>
          {label}
        </span>
      )}

      <input {...props} className={mergeClassnames("input", className)} />
    </div>
  );
}
