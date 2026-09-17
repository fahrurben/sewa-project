import axios from "axios";
import { API_URL } from "../common/constant.js";
import { useQuery } from "@tanstack/react-query";
import { optionMapFn } from "../common/helper.js";

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

export { useGetAllAgreementTemplate };
