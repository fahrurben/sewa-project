import {
  Button,
  Field,
  FileInput,
  FormLayout,
  HStack,
  useToast,
} from "@astryxdesign/core";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import InputText from "../../../components/form/inputtext.element";

import { useEffect } from "react";
import { useUpdateProfile } from "../../../hooks/use-profile.api";
import SelectBox from "../../../components/form/selectbox.element";
import { GENDER_OPTIONS, ID_TYPE_OPTIONS } from "../../../common/constant";
import {
  useGetAllProvinceOptions,
  useGetAllRegencyOptions,
} from "../../../hooks/use-lookup.api";
import InputDate from "../../../components/form/inputdate.element";

const formDefaultValues = {
  first_name: "",
  last_name: "",
};

const Form = ({ initialValue }: { initialValue?: any }) => {
  const schema = yup.object({
    first_name: yup.string().max(255).required(),
    last_name: yup.string().min(5).required(),
    id_type: yup.string().required(),
    id_number: yup.string().required(),
    gender: yup.string().required(),
    birthday: yup.date().required(),
    province: yup.string().required(),
    city: yup.string().required(),
  });

  type UserProfile = yup.InferType<typeof schema>;

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm<UserProfile>({
    resolver: yupResolver(schema),
    defaultValues: formDefaultValues,
  });

  const toast = useToast();
  const navigate = useNavigate();

  const selectedProvince = watch("province");

  const { data: provincesOptions, isLoading: isLoadingProvince } =
    useGetAllProvinceOptions();
  const { data: regencyOptions, isLoading: isLoadingRegency } =
    useGetAllRegencyOptions(selectedProvince);

  const updateMutation = useUpdateProfile({
    onSuccess: () => {
      toast({
        body: "Profile Updated",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
      navigate(0);
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

  const onSubmit = (values: UserProfile) => {
    const formData: Record<string, unknown> = { ...values };
    formData.birthday = moment(values.birthday).format("YYYY-MM-DD");
    updateMutation.mutate({ formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout direction="horizontal-labels">
        <InputText
          name="first_name"
          label="First Name"
          control={control}
          error={errors.first_name}
        />
        <InputText
          name="last_name"
          label="Last Name"
          control={control}
          error={errors.last_name}
        />
        <SelectBox
          name="gender"
          label="Gender"
          placeholder="-- Gender --"
          options={GENDER_OPTIONS ?? []}
          control={control}
          error={errors.gender}
        />
        <SelectBox
          name="id_type"
          label="ID Type"
          placeholder="-- Province --"
          options={ID_TYPE_OPTIONS ?? []}
          control={control}
          error={errors.id_type}
        />
        <InputText
          name="id_number"
          label="ID Number"
          control={control}
          error={errors.id_number}
        />
        <InputDate
          name="birthday"
          label="Birthday"
          control={control}
          error={errors.birthday}
        />
        <SelectBox
          name="province"
          label="Province"
          placeholder="-- Province --"
          options={provincesOptions ?? []}
          control={control}
          error={errors.province}
        />
        <SelectBox
          name="city"
          label="City"
          placeholder="-- City --"
          options={regencyOptions ?? []}
          control={control}
          error={errors.city}
        />
      </FormLayout>
      <HStack gap={2} hAlign="end" className="mt-4">
        <Button label="Submit" type="submit" variant="primary" />
      </HStack>
    </form>
  );
};

export { Form };
