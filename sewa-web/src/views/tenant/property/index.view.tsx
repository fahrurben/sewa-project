import { Card } from "@astryxdesign/core/Card";
import { HStack, Stack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import axios from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { API_URL, MEDIA_BASE_URL, PAGE_SIZE } from "../../../common/constant";
import type { PropertyType } from "../../../common/types";
import useAuth from "../../../hooks/userauthhook";

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
    <div className="p-4">
      <Heading level={1}>Property</Heading>
      <InfiniteScroll
        dataLength={items.length} // Mandatary: current length of data
        next={fetchMoreData} // Mandatory: function called when user scrolls to threshold
        hasMore={hasMore} // Mandatory: boolean to turn off scrolling
        loader={
          <h4 style={{ textAlign: "center" }}>
            Loading more awesome content...
          </h4>
        }
        endMessage={
          <p style={{ textAlign: "center", color: "#888" }}>
            <b>Yay! You have seen it all 🎉</b>
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
