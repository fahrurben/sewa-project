import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { InputStatus } from "@astryxdesign/core";
import type { TextInputType } from "@astryxdesign/core/TextInput";
import { TextArea } from "@astryxdesign/core/TextArea";

interface GenericInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  error: any;
  type?: TextInputType;
  required?: boolean;
}

export const TextAreaInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  error,
  type = "text",
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
        <TextArea
          label={label}
          placeholder={placeholder}
          isRequired={required}
          maxLength={5000}
          rows={20}
          {...field}
        />
      )}
    />
  );
};

export default TextAreaInput;
