import { useMutation, useQuery } from "@tanstack/react-query";
import type { OnErrorCallback, OnSuccessCallback } from "../common/types";
import { API_URL } from "../common/constant";
import axios from "axios";

const useGetApplicationList = () => {
  return useQuery({
    queryKey: ["getApplicationList"],
    queryFn: async () => {
      const url = `${API_URL}/applications`;

      const response = await axios.get(url, {
        withCredentials: true,
      });
      return response.data;
    },
  });
};

const useCreateApplication = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback;
  onError: OnErrorCallback;
}) => {
  return useMutation({
    mutationFn: ({ formData }: { formData: Record<string, unknown> }) => {
      const url = `${API_URL}/applications`;
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

export { useCreateApplication, useGetApplicationList };
