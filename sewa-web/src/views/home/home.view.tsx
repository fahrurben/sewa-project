import {
  Button,
  HStack,
  MetadataList,
  MetadataListItem,
  Skeleton,
  Stack,
  Theme,
  VStack,
} from "@astryxdesign/core";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { neutralTheme } from "@astryxdesign/theme-neutral";
import * as yup from "yup";
import HeaderNav from "../../components/layout/headernav.element";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetAllProvinceOptions,
  useGetAllRegencyOptions,
} from "../../hooks/use-lookup.api";
import SelectBox from "../../components/form/selectbox.element";
import InputNumeric from "../../components/form/inputnumeric.element";
import { API_URL, MEDIA_BASE_URL, PAGE_SIZE } from "../../common/constant";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import type { PropertyType } from "../../common/types";

const schema = yup
  .object({
    province_id: yup.string(),
    city_id: yup.string(),
    lease_rent_min: yup.number(),
    lease_rent_max: yup.number(),
  })
  .required();

type PropertyFilterType = yup.InferType<typeof schema>;

const Home = () => {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<PropertyFilterType>({
    resolver: yupResolver(schema),
  });

  const selectedProvince = watch("province_id");

  const { data: provincesOptions, isLoading: isLoadingProvince } =
    useGetAllProvinceOptions();
  const { data: regencyOptions, isLoading: isLoadingRegency } =
    useGetAllRegencyOptions(selectedProvince);

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const navigate = useNavigate();

  const fetchMoreData = async () => {
    try {
      let offset = (page - 1) * PAGE_SIZE;
      const formData = new FormData();
      formData.append("offset", offset);
      formData.append("limit", PAGE_SIZE);
      if (selectedProvince) {
        formData.append("province_id", selectedProvince);
      }

      const queryData = Object.fromEntries(formData.entries());
      console.log("Query JSON:", queryData);
      // Output example: { category: "electronics", minPrice: "50", inStock: "on" }

      // 2. Convert to a URL query string for API requests
      const queryString = new URLSearchParams(formData).toString();

      const url = `${API_URL}/properties/search?${queryString}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      const data = response.data.results;

      if (response.data.next === null) {
        setHasMore(false); // Stop infinite scroll if API returns empty array
      }

      // Append new data to existing items and increment page
      setItems((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit = async (values) => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0b0d]">
      <Theme theme={neutralTheme} mode="dark">
        <HeaderNav />
        <div className="flex justify-center w-full">
          <div className="flex justify-between w-[1200px] py-8">
            <Card className="w-3/12 h-80">
              <Heading level={3}>Filter</Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <SelectBox
                  name="province_id"
                  label="Province"
                  placeholder="-- Province --"
                  options={provincesOptions ?? []}
                  control={control}
                  error={errors.province_id}
                />
                <SelectBox
                  name="city_id"
                  label="City"
                  placeholder="-- City --"
                  options={regencyOptions ?? []}
                  control={control}
                  error={errors.city_id}
                />
                <InputNumeric
                  name="lease_rent_min"
                  label="Minimum"
                  control={control}
                  error={errors.lease_rent_min}
                />
                <InputNumeric
                  name="lease_rent_max"
                  label="Maximum"
                  control={control}
                  error={errors.lease_rent_max}
                />
                <HStack gap={2} hAlign="end" className="mt-4">
                  <Button label="Submit" type="submit" variant="primary" />
                </HStack>
              </form>
            </Card>
            <div className="w-9/12">
              <InfiniteScroll
                key={resetKey}
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <VStack gap={2} className="w-full mt-8">
                    <Skeleton className="w-full" height={16} index={0} />
                    <Skeleton className="w-full" height={16} index={1} />
                    <Skeleton className="w-full" height={16} index={2} />
                    <Skeleton className="w-full" height={16} index={3} />
                    <Skeleton className="w-full" height={16} index={4} />
                    <Skeleton className="w-full" height={16} index={5} />
                  </VStack>
                }
                className="w-full flex justify-start gap-6 px-6"
              >
                {items.map((item: PropertyType) => {
                  const propertyImage = MEDIA_BASE_URL + item.thumbnail;

                  const usFormat = new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                  return (
                    <Card key={item.id} className="mb-6 h-125">
                      <a href="#">
                        <img
                          src={propertyImage}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "200px",
                            borderRadius: "8px",
                          }}
                        />
                      </a>

                      <HStack gap={6} hAlign="around">
                        <Stack direction="vertical" gap={2} className="w-full">
                          <a href="#" className="text-lg font-bold">
                            {item.name}
                          </a>
                          <MetadataList>
                            <MetadataListItem label="Rental Cost">
                              {usFormat.format(item.rental_cost)}
                            </MetadataListItem>
                            <MetadataListItem label="Address">
                              {item.address}
                            </MetadataListItem>
                            <MetadataListItem label="Province">
                              {item.province_name}
                            </MetadataListItem>
                            <MetadataListItem label="City">
                              {item.city_name}
                            </MetadataListItem>
                            <MetadataListItem label="Postal Code">
                              {item.postal_code}
                            </MetadataListItem>
                            <MetadataListItem label="Type">
                              {item.type_label}
                            </MetadataListItem>
                            <MetadataListItem label="Furnishing Type">
                              {item.furnishing_type_label}
                            </MetadataListItem>
                          </MetadataList>
                        </Stack>
                      </HStack>
                    </Card>
                  );
                })}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </Theme>
    </div>
  );
};

export default Home;
