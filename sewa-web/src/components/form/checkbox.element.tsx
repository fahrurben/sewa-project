import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { Controller } from "react-hook-form";
import { Field } from "@astryxdesign/core";

interface GenericCheckBoxProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  error: any;
  required?: boolean;
}

const CheckBox = <T extends FieldValues>({
  name,
  label,
  control,
  error,
  required = false,
}: GenericCheckBoxProps<T>) => {
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
        <Field label="" inputID={name}>
          <CheckboxInput label={label} isRequired={required} {...field} />
        </Field>
      )}
    />
  );
};

export default CheckBox;
