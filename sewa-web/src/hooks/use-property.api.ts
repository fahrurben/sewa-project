import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../common/constant";
import type { OnErrorCallback, OnSuccessCallback } from "../common/types";

const useCreateProperty = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback;
  onError: OnErrorCallback;
}) => {
  return useMutation({
    mutationFn: (formData: Record<string, unknown>) => {
      const url = `${API_URL}/properties`;
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

const useGetProperty = (id?: number | null) => {
  return useQuery({
    queryKey: ["getProperty", id],
    queryFn: async () => {
      const url = `${API_URL}/properties/${id}`;

      const response = await axios.get(url, {
        withCredentials: true,
      });
      return response.data;
    },
    enabled: !!id,
  });
};

const useUpdateProperty = ({
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
      const url = `${API_URL}/properties/${id}`;
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

const useDeleteProperty = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback;
  onError: OnErrorCallback;
}) => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      const url = `${API_URL}/properties/${id}`;
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
  useCreateProperty,
  useDeleteProperty,
  useGetProperty,
  useUpdateProperty,
};
