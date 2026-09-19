import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { Controller } from "react-hook-form";
import { Selector, type SelectorOptionType } from "@astryxdesign/core";

interface GenericSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  options: SelectorOptionType[];
  placeholder?: string;
  control: Control<T>;
  error: any;
  required?: boolean;
}

const SelectBox = <T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  control,
  error,
  required = false,
}: GenericSelectProps<T>) => {
  const status = error
    ? {
        type: "error",
        message: error.message.toString(),
      }
    : null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Selector
          label={label}
          options={options}
          placeholder={placeholder}
          {...field}
        />
      )}
    />
  );
};

export default SelectBox;
