import {
  Button,
  Heading,
  HStack,
  Item,
  proportional,
  Table,
  toSearchFilters,
  usePowerSearchConfig,
  useTableFiltering,
  useTableFilterState,
  useToast,
  type PowerSearchFilter,
  type TableColumn,
} from "@astryxdesign/core";
import HeaderNav from "../../components/layout/headernav.element";
import useAuth from "../../hooks/userauthhook";
import { useGetApplicationList } from "../../hooks/use-application.api";
import { useCheckoutApplication } from "../../hooks/use-checkout.api";

interface PropertyType extends Record<string, unknown> {
  id: number;
  name: string;
}

interface ApplicationType extends Record<string, unknown> {
  id: number;
  property: PropertyType;
  property_name: string;
  lease_start: Date;
  duration: number;
  lease_end: number;
  status: string;
  status_label: string;
}

const fieldDefs = [
  {
    key: "status",
    type: "enum",
    label: "Status",
    enumValues: [
      { value: "REQ", label: "Requested" },
      { value: "REJ", label: "Rejected" },
      { value: "PP", label: "Pending Payment" },
      { value: "PAI", label: "Paid" },
    ],
  },
] as const;

const ListView = () => {
  const { user } = useAuth(false);
  const { config, applyFilters } = usePowerSearchConfig(fieldDefs);
  const { filters, onFilterChange } = useTableFilterState();
  const filterPlugin = useTableFiltering<ApplicationType>({
    filters,
    onFilterChange,
    searchConfig: config,
    variant: "inline",
  });

  const toast = useToast();

  const checkoutMutation = useCheckoutApplication({
    onSuccess: (data) => {
      window.location.href = data.checkout_url;
    },
    onError: (error) => {
      const [[firstKey, firstValue]] = Object.entries(error.response.data);

      toast({
        body: `${firstKey} ${firstValue}`,
        type: "error",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
    },
  });

  const checkoutClicked = (id) => {
    checkoutMutation.mutate({ id: id });
  };

  const columns: TableColumn<PropertyType>[] = [
    { key: "property_name", header: "Name", width: proportional(1) },
    { key: "lease_start", header: "Lease Start", width: proportional(2) },
    { key: "duration", header: "Duration", width: proportional(2) },
    { key: "lease_end", header: "Lease End", width: proportional(2) },
    {
      key: "status",
      header: "Status",
      width: proportional(1),
      filter: "status",
      renderCell: (item) => (
        <HStack gap={2} align="center">
          {item.status_label}
        </HStack>
      ),
    },
    {
      key: "action",
      header: "Action",
      renderCell: (item) => (
        <HStack key={item.id} gap={2} align="center">
          {item.status == "PP" && (
            <Button onClick={() => checkoutClicked(item.id)}>Checkout</Button>
          )}
        </HStack>
      ),
    },
  ];

  const { data: response } = useGetApplicationList();

  const applications = response?.results?.map((data) => {
    return {
      ...data,
      property_name: data.property.name,
    };
  });

  const data = applyFilters(
    toSearchFilters(filters, columns, config) as PowerSearchFilter[],
    applications ?? [],
  );

  return (
    <div className="w-full min-h-screen bg-[#0b0b0d]">
      <HeaderNav user={user} />
      <div className="flex justify-center w-full">
        <div className="w-[1200px] py-8">
          <Heading level={1}>Applications</Heading>
          <Table
            data={data}
            columns={columns}
            idKey="id"
            plugins={{ filter: filterPlugin }}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default ListView;
