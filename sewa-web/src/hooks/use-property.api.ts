import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../common/constant";
import axios from "axios";
import type { OnSuccessCallback, OnErrorCallback } from "../common/types";

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

export { useCreateProperty };
