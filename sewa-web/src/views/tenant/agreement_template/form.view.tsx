import { Button, FormLayout, HStack, useToast } from "@astryxdesign/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import InputText from "../../../components/form/inputtext.element";
import TextEditor from "../../../components/form/texteditor.element";
import UploadFormField from "../../../components/form/uploadform.element";
import {
  useCreateAgreementTemplate,
  useUpdateAgreementTemplate,
} from "../../../hooks/use-agreement-template.api";

const formDefaultValues = {
  title: "",
  content: "",
  sign_image: "",
};

const Form = ({
  id,
  initialValue,
}: {
  id?: number | null;
  initialValue?: any;
}) => {
  const schema = yup.object({
    title: yup.string().min(5).max(255).required(),
    content: yup.string().min(5).required(),
    sign_image: yup.mixed().required(),
  });

  type AgreementTemplateType = yup.InferType<typeof schema>;

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
    watch,
  } = useForm<AgreementTemplateType>({
    resolver: yupResolver(schema),
    defaultValues: formDefaultValues,
  });

  const toast = useToast();
  const navigate = useNavigate();

  const createMutation = useCreateAgreementTemplate({
    onSuccess: () => {
      toast({
        body: "Property created",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
      navigate("/tenant/agreement-template/");
    },
    onError: (error) => {
      const [[firstKey, firstValue]] = Object.entries(error.response.data);

      toast({
        body: `${firstKey} ${firstValue}`,
        type: "error",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    },
  });

  const updateMutation = useUpdateAgreementTemplate({
    onSuccess: () => {
      toast({
        body: "Agreement Template updated",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
      navigate("/tenant/agreement-template/");
    },
    onError: (error) => {
      const [[firstKey, firstValue]] = Object.entries(error.response.data);

      toast({
        body: `${firstKey} ${firstValue}`,
        type: "error",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    },
  });

  useEffect(() => {
    if (initialValue) {
      reset({ ...initialValue });
    }
  }, [initialValue]);

  const onSubmit = (values: AgreementTemplateType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("sign_image", values.sign_image);

    console.log(id);
    if (id) {
      updateMutation.mutate({ id, formData: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout direction="horizontal-labels">
        <InputText
          name="title"
          label="Name"
          control={control}
          error={errors.title}
        />
        <TextEditor
          name="content"
          label="Content"
          control={control}
          error={errors.content}
          setValue={setValue}
        />
        <UploadFormField
          name="sign_image"
          label="Sign Image"
          control={control}
          error={errors.sign_image}
        />
      </FormLayout>
      <HStack gap={2} hAlign="end" className="mt-4">
        <Button
          label="Cancel"
          variant="secondary"
          href="/tenant/agreement-template"
        />
        <Button label="Submit" type="submit" variant="primary" />
      </HStack>
    </form>
  );
};

export { Form };
