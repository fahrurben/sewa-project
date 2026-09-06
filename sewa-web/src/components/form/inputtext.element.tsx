import type { FieldError, Control } from "react-hook-form";

import { Controller } from "react-hook-form";
import { TextInput } from "@astryxdesign/core/TextInput";

const InputText = ({
  name,
  label,
  placeholder,
  control,
  error,
  errorMsg,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  control: Control;
  error?: boolean;
  errorMsg?: string;
  type?: string;
  required?: boolean;
}) => {
  let status =
    error === true
      ? {
          type: "error",
          message: errorMsg,
        }
      : null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          type={type}
          label={label}
          placeholder={placeholder}
          isRequired={required}
          status={status}
          {...field}
        />
      )}
    />
  );
};

export default InputText;
