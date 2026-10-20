import {
  Button,
  DialogHeader,
  HStack,
  Layout,
  LayoutContent,
  LayoutFooter,
  useToast,
  VStack,
} from "@astryxdesign/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import InputDate from "../../components/form/inputdate.element";
import InputNumeric from "../../components/form/inputnumeric.element";
import { useCreateApplication } from "../../hooks/use-application.api";
import { useNavigate } from "react-router";
import moment from "moment";

const schema = yup.object({
  lease_start: yup.date().required(),
  duration: yup.number().required(),
});

type ApplicationType = yup.InferType<typeof schema>;

const ApplicationModal = ({
  property_id,
  isOpen,
  onClose,
}: {
  property_id: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ApplicationType>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const toast = useToast();

  const createApplicationMutation = useCreateApplication({
    onSuccess: () => {
      toast({
        body: "Application created, please check your application",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
      onClose();
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

  const onSubmit = (values) => {
    const formData: Record<string, unknown> = { ...values };
    formData.property_id = property_id;
    formData.lease_start = moment(values.lease_start).format("YYYY-MM-DD");
    createApplicationMutation.mutate({ formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Layout
        header={
          <DialogHeader
            title="Application Form"
            subtitle="Application form to rent the property"
            onOpenChange={() => onClose()}
          />
        }
        content={
          <LayoutContent>
            <VStack gap={4}>
              <InputDate
                name="lease_start"
                label="Lease Start"
                control={control}
                error={errors.lease_start}
              />
              <InputNumeric
                name="duration"
                placeholder="Month"
                label="Duration (In Month)"
                control={control}
                error={errors.duration}
              />
            </VStack>
          </LayoutContent>
        }
        footer={
          <LayoutFooter>
            <HStack gap={2} hAlign="end">
              <Button label="Cancel" variant="secondary" onClick={onClose} />
              <Button label="Save" type="submit" variant="primary" />
            </HStack>
          </LayoutFooter>
        }
      />
    </form>
  );
};

export default ApplicationModal;
function toast(arg0: {
  body: string;
  isAutoHide: boolean;
  autoHideDuration: number;
}) {
  throw new Error("Function not implemented.");
}
