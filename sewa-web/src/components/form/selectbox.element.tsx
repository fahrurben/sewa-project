import type { Control } from "react-hook-form";

import { Controller } from "react-hook-form";
import { Selector } from "@astryxdesign/core";

const SelectBox = ({
  name,
  label,
  placeholder,
  options,
  control,
  error,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: Record<string, string>[];
  control: Control;
  error: unknown;
  type?: string;
  required?: boolean;
}) => {
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
          presentation="bottom-sheet"
          {...field}
        />
      )}
    />
  );
};

export default SelectBox;
