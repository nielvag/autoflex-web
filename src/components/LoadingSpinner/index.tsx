import Spinner from "../../assets/icons/spinner.svg?react";
import { mergeClassnames } from "../../utils/tailwind";

export default function LoadingSpinner({
  classNames = "",
}: {
  classNames?: string;
}) {
  return (
    <Spinner
      className={mergeClassnames("w-6", classNames)}
      aria-label="Carregando"
      role="status"
    />
  );
}
