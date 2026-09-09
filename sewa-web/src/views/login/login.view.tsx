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
import { TextInput } from "@astryxdesign/core/TextInput";
import { Controller, useForm } from "react-hook-form";
import InputText from "../../components/form/inputtext.element";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../common/constant";
import { useNavigate } from "react-router";

type LoginData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

const Login = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData) => {
      const url = `${API_URL}/login`;
      return axios.post(url, formData, {
        withCredentials: true,
      });
    },
    onSuccess: (data) => {
      alert("Success");
      navigate("/tenant/");
    },
    onError: (error) => {
      alert("Failed");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-lvh">
      <Card width={380}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Layout
            header={
              <LayoutHeader hasDivider>
                <Heading level={3}>Login</Heading>
              </LayoutHeader>
            }
            content={
              <LayoutContent>
                <InputText
                  name="email"
                  label="Email"
                  control={control}
                  placeholder="you@example.com"
                  error={errors.email ? true : false}
                  errorMsg={errors.email?.message?.toString()}
                />
                <InputText
                  name="password"
                  label="Password"
                  type="password"
                  control={control}
                  error={errors.password ? true : false}
                  errorMsg={errors.password?.message?.toString()}
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

export default Login;
