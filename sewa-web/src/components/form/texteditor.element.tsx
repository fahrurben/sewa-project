import { Field, type InputStatus } from "@astryxdesign/core";
import type { TextInputType } from "@astryxdesign/core/TextInput";
import { useEffect, useRef } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useQuill } from "react-quilljs";

interface GenericInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  setValue: any;
  error: any;
  type?: TextInputType;
  required?: boolean;
}

export const TextEditor = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  setValue,
  error,
  type = "text",
  required = false,
}: GenericInputProps<T>) => {
  const theme = "snow";

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link"],
      [{ color: [] }],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "header",
    "link",
    "color",
  ];

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

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
      render={({ field }) => {
        const hasRun = useRef(false);

        useEffect(() => {
          if (quill) {
            quill.on("text-change", () => {
              // Use rootHTML or getContents() depending on your storage needs
              const htmlContent = quill.root.innerHTML;

              // Strip out the empty placeholder markup if user clears the text
              if (htmlContent === "<p><br></p>") {
                setValue(name, "");
              } else {
                setValue(name, htmlContent);
              }
            });
          }
        }, [quill, setValue]);

        useEffect(() => {
          if (quill && !hasRun.current) {
            if (field.value) {
              quill.clipboard.dangerouslyPasteHTML(field.value);

              hasRun.current = true;
            }
          }
        }, [field.value]);

        return (
          <Field label={label} inputID={name}>
            <>
              <div style={{ height: 250 }} className="pb-12">
                <div ref={quillRef} />
              </div>
            </>
          </Field>
        );
      }}
    />
  );
};

export default TextEditor;
