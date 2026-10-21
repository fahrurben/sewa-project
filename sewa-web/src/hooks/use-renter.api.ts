import { useMutation, useQuery } from "@tanstack/react-query";
import type { OnErrorCallback, OnSuccessCallback } from "../common/types";
import { API_URL } from "../common/constant";
import axios from "axios";

const useGetRenterList = () => {
  return useQuery({
    queryKey: ["getRenterList"],
    queryFn: async () => {
      const url = `${API_URL}/renter`;

      const response = await axios.get(url, {
        withCredentials: true,
      });
      return response.data;
    },
  });
};

export { useGetRenterList };
