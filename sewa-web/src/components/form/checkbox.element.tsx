import type { Control } from "react-hook-form";

import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { Controller } from "react-hook-form";
import { Field } from "@astryxdesign/core";

const CheckBox = ({
  name,
  label,
  control,
  error,
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  control: Control;
  error: unknown;
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
        <Field>
          <CheckboxInput
            name={name}
            label={label}
            isRequired={required}
            {...field}
          />
        </Field>
      )}
    />
  );
};

export default CheckBox;
