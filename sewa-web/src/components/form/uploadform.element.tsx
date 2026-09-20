import React, { useState } from "react";

import { MEDIA_BASE_URL, MEDIA_UPLOAD_URL } from "../../common/constant.js";
import imgPlaceholder from "../../assets/300x200.svg";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import axios from "axios";
import { Field, FileInput, type InputStatus } from "@astryxdesign/core";

interface GenericSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  error: any;
  required?: boolean;
}

const UploadFormField = <T extends FieldValues>({
  name,
  label,
  control,
  error,
  required = false,
}: GenericSelectProps<T>) => {
  const [file, setFile] = useState(null);

  const status: InputStatus | undefined = error
    ? {
        type: "error",
        message: error?.message?.toString(),
      }
    : undefined;

  const handleFileChange = async (field, file) => {
    if (file) {
      setFile(file);
      const formData = new FormData();
      formData.append("image", file);
      let response = await axios.post(MEDIA_UPLOAD_URL, formData, {
        withCredentials: true,
      });
      field.onChange(response.data.image);
    }
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const imgSrc = field?.value
            ? MEDIA_BASE_URL + "/" + field.value
            : imgPlaceholder;

          return (
            <Field label={label} inputID={name}>
              <img
                src={imgSrc}
                alt="image"
                style={{ width: "200px", height: "100px" }}
              />
              <FileInput
                label={label}
                value={field.value}
                onChange={(file) => handleFileChange(field, file)}
                accept=".jpg,.png"
                description="JPG or PNG, up to 5 MB"
                maxSize={5 * 1024 * 1024}
                status={status}
              />
            </Field>
          );
        }}
      />
    </>
  );
};

export default UploadFormField;
