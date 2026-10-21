import { useMutation, useQuery } from "@tanstack/react-query";
import type { OnErrorCallback, OnSuccessCallback } from "../common/types";
import { API_URL } from "../common/constant";
import axios from "axios";

const useCheckoutApplication = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback;
  onError: OnErrorCallback;
}) => {
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const url = `${API_URL}/checkout/${id}`;
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

export { useCheckoutApplication };
