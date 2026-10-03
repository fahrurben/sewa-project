import { useMutation } from "@tanstack/react-query";
import type { OnErrorCallback, OnSuccessCallback } from "../common/types";
import { API_URL } from "../common/constant";
import axios from "axios";

const useUpdateProfile = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback;
  onError: OnErrorCallback;
}) => {
  return useMutation({
    mutationFn: ({ formData }: { formData: Record<string, unknown> }) => {
      const url = `${API_URL}/update-profile`;
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

export { useUpdateProfile };
