import {
  Heading,
  HStack,
  MetadataList,
  MetadataListItem,
  Skeleton,
  Stack,
  useToast,
  VStack,
} from "@astryxdesign/core";
import { Card } from "@astryxdesign/core/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useSearchParams } from "react-router";
import { API_URL, MEDIA_BASE_URL } from "../../common/constant";
import HeaderNav from "../../components/layout/headernav.element";
import useAuth from "../../hooks/userauthhook";

const MyRentView = () => {
  const { user } = useAuth(false);

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const show_success = params.get("show_success");
  const toast = useToast();

  useEffect(() => {
    if (show_success) {
      toast({
        body: "Checkout success, the property already rent",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    }
  }, [show_success]);

  const fetchMoreData = async () => {
    try {
      const url = `${API_URL}/renters`;
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
      <HeaderNav user={user} />
      <div className="flex justify-center w-full">
        <div className="w-[1200px] py-8">
          <div className="w-full">
            <Heading level={1}>My Rent</Heading>
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
              className="w-full gap-6 mt-8"
            >
              {items.map((item) => {
                const propertyImage = MEDIA_BASE_URL + item.property.thumbnail;

                const usFormat = new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
                return (
                  <Card key={item.id} className="flex w-full p-6 mb-8">
                    <a href={`property/details/${item.id}`}>
                      <img
                        src={propertyImage}
                        alt={item.property.name}
                        style={{
                          width: "100%",
                          height: "200px",
                          borderRadius: "8px",
                        }}
                      />
                    </a>

                    <HStack gap={6} hAlign="around" className="ml-8 w-full">
                      <Stack direction="vertical" gap={2} className="w-full">
                        <a
                          href={`property/details/${item.property.id}`}
                          className="text-lg font-bold"
                        >
                          {item.property.name}
                        </a>
                        <MetadataList>
                          <MetadataListItem label="Rental Cost">
                            {usFormat.format(item.property.rental_cost)}
                          </MetadataListItem>
                          <MetadataListItem label="Address">
                            {item.property.address}
                          </MetadataListItem>
                          <MetadataListItem label="Province">
                            {item.property.province_name}
                          </MetadataListItem>
                          <MetadataListItem label="City">
                            {item.property.city_name}
                          </MetadataListItem>
                          <MetadataListItem label="Postal Code">
                            {item.property.postal_code}
                          </MetadataListItem>
                          <MetadataListItem label="Type">
                            {item.property.type_label}
                          </MetadataListItem>
                          <MetadataListItem label="Furnishing Type">
                            {item.property.furnishing_type_label}
                          </MetadataListItem>
                        </MetadataList>
                      </Stack>
                      <Stack
                        direction="vertical"
                        gap={2}
                        className="w-full pt-8"
                      >
                        <MetadataList>
                          <MetadataListItem label="Land Area">
                            {usFormat.format(item.property.land_area) + " m2"}
                          </MetadataListItem>
                          <MetadataListItem label="Building Aree">
                            {usFormat.format(item.property.building_area) +
                              " m2"}
                          </MetadataListItem>
                          <MetadataListItem label="Total Rooms">
                            {item.property.total_rooms}
                          </MetadataListItem>
                          <MetadataListItem label="Total Bathrooms">
                            {item.property.total_bathrooms}
                          </MetadataListItem>
                          <MetadataListItem label="Total Bathrooms">
                            {item.property.total_bathrooms}
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
    </div>
  );
};

export default MyRentView;
