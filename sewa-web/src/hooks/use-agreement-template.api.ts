import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../common/constant.js";
import type { OnErrorCallback, OnSuccessCallback } from "../common/types.js";

const useGetAllAgreementTemplate = () => {
  return useQuery({
    queryKey: ["getAllAgreementTemplate"],
    queryFn: async () => {
      const url = `${API_URL}/agreement-templates/get_all`;

      const response = await axios.get(url, {
        withCredentials: true,
      });
      return response.data;
    },
  });
};

const useCreateAgreementTemplate = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback;
  onError: OnErrorCallback;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      const url = `${API_URL}/agreement-templates`;
      return axios.post(url, formData, {
        withCredentials: true,
      });
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

const useGetAgreementTemplate = (id?: number | null) => {
  return useQuery({
    queryKey: ["getProperty", id],
    queryFn: async () => {
      const url = `${API_URL}/agreement-templates/${id}`;

      const response = await axios.get(url, {
        withCredentials: true,
      });
      return response.data;
    },
    enabled: !!id,
  });
};

const useUpdateAgreementTemplate = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback;
  onError: OnErrorCallback;
}) => {
  return useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: Record<string, unknown>;
    }) => {
      const url = `${API_URL}/agreement-templates/${id}`;
      return axios.patch(url, formData, {
        withCredentials: true,
      });
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

const useDeleteAgreementTemplate = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback;
  onError: OnErrorCallback;
}) => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      const url = `${API_URL}/agreement-templates/${id}`;
      return axios.delete(url, {
        withCredentials: true,
      });
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

export {
  useCreateAgreementTemplate,
  useDeleteAgreementTemplate,
  useGetAllAgreementTemplate,
  useUpdateAgreementTemplate,
  useGetAgreementTemplate,
};
