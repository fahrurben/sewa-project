import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  DateInput,
  type DateInputFormat,
  type InputStatus,
} from "@astryxdesign/core";

interface GenericInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  error: any;
  format?: DateInputFormat;
  required?: boolean;
}

export const InputDate = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  error,
  format = "date",
  required = false,
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
        <DateInput
          label={label}
          placeholder={placeholder}
          isRequired={required}
          status={status}
          format={format}
          hasClear
          {...field}
        />
      )}
    />
  );
};

export default InputDate;
