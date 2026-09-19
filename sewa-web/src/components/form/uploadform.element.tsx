import React, { useState } from "react";

import { MEDIA_BASE_URL, MEDIA_UPLOAD_URL } from "../../common/constant.js";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import axios from "axios";
import { Field, FileInput } from "@astryxdesign/core";

interface GenericSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  value: any;
  control: Control<T>;
  required?: boolean;
}

const UploadFormField = <T extends FieldValues>({
  name,
  label,
  control,
  value,
  required = false,
}: GenericSelectProps<T>) => {
  const [file, setFile] = useState(null);

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
        render={({ field }) => (
          <Field label={label} inputID={name}>
            <img
              src={MEDIA_BASE_URL + "/" + field.value}
              alt="image"
              style={{ width: "200px", height: "100px" }}
            />
            <FileInput
              label={label}
              value={value}
              onChange={(file) => handleFileChange(field, file)}
              accept=".jpg,.png"
              description="JPG or PNG, up to 5 MB"
              maxSize={5 * 1024 * 1024}
            />
          </Field>
        )}
      />
    </>
  );
};

export default UploadFormField;
