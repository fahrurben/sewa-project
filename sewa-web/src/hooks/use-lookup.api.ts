import axios from "axios";
import { API_URL } from "../common/constant.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { optionMapFn } from "../common/helper.js";

const useGetAllProvinceOptions = () => {
  return useQuery({
    queryKey: ["getAllProvince"],
    queryFn: async () => {
      const url = `${API_URL}/provinces`;

      const response = await axios.get(url);
      return response.data;
    },
    select: optionMapFn,
  });
};

const useGetAllRegencyOptions = (provinceId: string) => {
  return useQuery({
    queryKey: ["getAllRegency"],
    queryFn: async () => {
      const url = `${API_URL}/regencies?province_id=${provinceId}`;

      const response = await axios.get(url);
      return response.data;
    },
    select: optionMapFn,
    enabled: !!provinceId,
  });
};

export { useGetAllProvinceOptions, useGetAllRegencyOptions };
