import {
  Heading,
  HStack,
  Icon,
  IconButton,
  List,
  ListItem,
  Skeleton,
  useImperativeAlertDialog,
  useToast,
  VStack,
} from "@astryxdesign/core";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import { API_URL, PAGE_SIZE } from "../../../common/constant";
import useAuth from "../../../hooks/userauthhook";
import { useDeleteAgreementTemplate } from "../../../hooks/use-agreement-template.api";

const AgreementTemplateList = () => {
  useAuth();
  const alert = useImperativeAlertDialog();

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchMoreData = async () => {
    try {
      let offset = (page - 1) * PAGE_SIZE;
      const url = `${API_URL}/agreement-templates?offset=${offset}&limit=${PAGE_SIZE}`;
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

  const deleteMutation = useDeleteAgreementTemplate({
    onSuccess: () => {
      navigate(0);
      toast({
        body: "Agreement Template deleted",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    },
    onError: (error) => {},
  });

  const deleteAlertProps = {
    title: "Delete item?",
    description:
      "This action cannot be undone. The item and all its data will be permanently removed.",
    actionLabel: "Delete",
  } as const;

  const deleteClicked = (id: number) => {
    console.log(id);
    alert.show({
      ...deleteAlertProps,
      onAction: () => {
        deleteMutation.mutate({ id });
      },
    });
  };

  return (
    <div className="py-8 px-6">
      <HStack gap={2}>
        <Heading level={1}>Agreement Template</Heading>
        <IconButton
          href="/tenant/agreement-template/create"
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
        children={undefined}
      >
        <List hasDividers className="mt-6">
          {items.map((item) => {
            return (
              <ListItem
                key={item.id}
                label={item.title}
                onClick={() => {}}
                endContent={
                  <HStack gap={2}>
                    <IconButton
                      label="Edit"
                      variant="destructive"
                      icon={<Icon icon={TrashIcon} />}
                      elevation="high"
                      onClick={() => deleteClicked(item.id)}
                    />
                    <IconButton
                      label="Edit"
                      variant="primary"
                      icon={<Icon icon={PencilIcon} />}
                      elevation="high"
                      href={`/tenant/agreement-template/edit/${item.id}`}
                    />
                  </HStack>
                }
              />
            );
          })}
        </List>
      </InfiniteScroll>
      {alert.element}
    </div>
  );
};

export default AgreementTemplateList;
