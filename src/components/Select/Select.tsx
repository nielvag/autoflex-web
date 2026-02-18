import {
  Content,
  Icon,
  Item,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import { useMemo, useState } from "react";
import { mergeClassnames } from "../../utils/tailwind";

interface SelectProps {
  value?: string;
  onChanceValue: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  triggerClassName?: string;
}

export default function Select({
  value,
  onChanceValue,
  options,
  placeholder,
  triggerClassName = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selectedLabelValue = useMemo(
    () => options.find((item) => item.value === value)?.label,
    [options, value],
  );

  return (
    <Root
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={(item) => onChanceValue(item)}
    >
      <Trigger
        className={mergeClassnames(
          "inline-flex h-8.75 items-center justify-center gap-1.25 bg-white px-3.75 text-base leading-none border input shadow-black/10 outline-none focus:outline-none focus:ring-0",
          triggerClassName,
        )}
        aria-label={selectedLabelValue}
      >
        <Value placeholder={placeholder || "Selecione"}>
          {selectedLabelValue}
        </Value>
        <Icon className=""></Icon>
      </Trigger>
      <Content className="overflow-hidden rounded-md bg-white ">
        <ScrollUpButton className="flex h-6.25 cursor-pointer items-center justify-center bg-white "></ScrollUpButton>
        <Viewport className="p-2 rounded-lg border border-gray-200">
          {options.map((opt) => (
            <Item
              value={opt.value}
              className="cursor-pointer hover:bg-gray-200 py-2 px-3"
            >
              {opt.label}
            </Item>
          ))}
        </Viewport>
        <ScrollDownButton className="flex h-6.25 cursor-pointer items-center justify-center bg-white "></ScrollDownButton>
      </Content>
    </Root>
  );
}
