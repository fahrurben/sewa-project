import { Card } from "@astryxdesign/core/Card";
import { HStack, Stack, VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import axios from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { API_URL, MEDIA_BASE_URL, PAGE_SIZE } from "../../../common/constant";
import type { PropertyType } from "../../../common/types";
import useAuth from "../../../hooks/userauthhook";
import { Icon, IconButton, Skeleton } from "@astryxdesign/core";
import { PlusIcon } from "@heroicons/react/24/outline";

const PropertyList = () => {
  useAuth();

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMoreData = async () => {
    try {
      let offset = (page - 1) * PAGE_SIZE;
      const url = `${API_URL}/properties?offset=${offset}&limit=${PAGE_SIZE}`;
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

  // Fetch initial batch on component mount

  return (
    <div className="py-8 px-6">
      <HStack gap={2}>
        <Heading level={1}>Property</Heading>
        <IconButton
          href="/tenant/property/create"
          label="Add"
          variant="primary"
          icon={<Icon icon={PlusIcon} />}
          elevation="high"
        />
      </HStack>

      <InfiniteScroll
        dataLength={items.length} // Mandatary: current length of data
        next={fetchMoreData} // Mandatory: function called when user scrolls to threshold
        hasMore={hasMore} // Mandatory: boolean to turn off scrolling
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
        endMessage={
          <p style={{ textAlign: "center", color: "#888" }}>
            <b>All properties are loaded</b>
          </p>
        }
      >
        {items.map((item: PropertyType) => {
          const propertyImage = MEDIA_BASE_URL + item.thumbnail;
          return (
            <Card width={"100%"} className="p-6 mt-6">
              <HStack gap={6}>
                <div>
                  <a href="#">
                    <img src={propertyImage} width={"300px"} height={"200px"} />
                  </a>
                </div>
                <Stack direction="vertical" gap={2}>
                  <a href="#" className="text-lg font-bold">
                    {item.name}
                  </a>
                  <Text type="body" className="font-bold">
                    {item.address}
                  </Text>
                  <Text type="body" color="secondary">
                    {item.description}
                  </Text>
                </Stack>
              </HStack>
            </Card>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default PropertyList;
