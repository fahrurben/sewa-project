import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import {
  HStack,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
} from "@astryxdesign/core/Layout";
import { Heading } from "@astryxdesign/core/Text";
import { useToast } from "@astryxdesign/core/Toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import {
  API_URL,
  GENDER_OPTIONS,
  ID_TYPE_OPTIONS,
} from "../../common/constant";
import InputText from "../../components/form/inputtext.element";
import {
  useGetAllProvinceOptions,
  useGetAllRegencyOptions,
} from "../../hooks/use-lookup.api";
import SelectBox from "../../components/form/selectbox.element";
import InputDate from "../../components/form/inputdate.element";
import moment from "moment";

const schema = yup
  .object({
    first_name: yup.string().max(255).required(),
    last_name: yup.string().max(255).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    id_type: yup.string().required(),
    id_number: yup.string().required(),
    gender: yup.string().required(),
    birthday: yup.date().required(),
    province: yup.string().required(),
    city: yup.string().required(),
  })
  .required();

type UserProfileType = yup.InferType<typeof schema>;

const RegisterView = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<UserProfileType>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      id_number: "",
    },
  });
  const navigate = useNavigate();
  const toast = useToast();

  let selectedProvince = watch("province");

  const { data: provincesOptions, isLoading: isLoadingProvince } =
    useGetAllProvinceOptions();
  const { data: regencyOptions, isLoading: isLoadingRegency } =
    useGetAllRegencyOptions(selectedProvince);

  const isLoading = isLoadingProvince || isLoadingRegency;

  const mutation = useMutation({
    mutationFn: (formData) => {
      const url = `${API_URL}/register/TE`;
      return axios.post(url, formData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      reset();

      toast({
        body: "Register success, you can login now",
        type: "info",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    },
    onError: () => {
      toast({
        body: "Wrong username or password",
        type: "error",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    },
  });

  const onSubmit = (values) => {
    const formData: Record<string, unknown> = { ...values };
    formData.birthday = moment(values.birthday).format("YYYY-MM-DD");
    mutation.mutate({ ...formData });
  };

  return (
    <div className="flex justify-center items-center min-h-lvh bg-[#0b0b0d]">
      <Card width={380}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Layout
            header={
              <LayoutHeader hasDivider>
                <Heading level={3}>Register</Heading>
              </LayoutHeader>
            }
            content={
              <LayoutContent>
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
                <InputText
                  name="email"
                  label="Email"
                  control={control}
                  placeholder="you@example.com"
                  error={errors.email}
                />
                <InputText
                  name="password"
                  label="Password"
                  type="password"
                  control={control}
                  error={errors.password}
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
                  placeholder="-- ID Type --"
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
              </LayoutContent>
            }
            footer={
              <LayoutFooter hasDivider>
                <HStack gap={2} hAlign="end">
                  <Button label="Submit" type="submit" variant="primary" />
                </HStack>
              </LayoutFooter>
            }
          />
        </form>
      </Card>
    </div>
  );
};

export default RegisterView;
