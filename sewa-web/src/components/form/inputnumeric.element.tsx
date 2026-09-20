import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { NumberInput, type InputStatus } from "@astryxdesign/core";

interface GenericInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  error: any;
  required?: boolean;
  isIntegerOnly?: boolean;
}

export const InputNumeric = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  error,
  required = false,
  isIntegerOnly = false,
}: GenericInputProps<T>) => {
  const status: InputStatus | undefined = error
    ? {
        type: "error",
        message: error?.message?.toString(),
      }
    : undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <NumberInput
          label={label}
          placeholder={placeholder}
          isRequired={required}
          status={status}
          isIntegerOnly={isIntegerOnly}
          {...field}
        />
      )}
    />
  );
};

export default InputNumeric;
