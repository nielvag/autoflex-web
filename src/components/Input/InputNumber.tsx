import { mergeClassnames } from "../../utils/tailwind";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

interface InputProps extends NumericFormatProps {
  label?: string;
  labelClassName?: string;
  isCurrency?: boolean;
}

export default function InputNumber({
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

      <NumericFormat
        {...props}
        className={mergeClassnames("input", className)}
      />
    </div>
  );
}
