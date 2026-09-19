import {
  Button,
  Divider,
  FormLayout,
  HStack,
  Icon,
  IconButton,
  Thumbnail,
  useToast,
} from "@astryxdesign/core";
import { Heading } from "@astryxdesign/core/Text";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  FURNISHING_TYPE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "../../../common/constant";
import InputText from "../../../components/form/inputtext.element";
import SelectBox from "../../../components/form/selectbox.element";
import UploadFormField from "../../../components/form/uploadform.element";

import {
  useGetAllProvinceOptions,
  useGetAllRegencyOptions,
} from "../../../hooks/use-lookup.api";
import CheckBox from "../../../components/form/checkbox.element";
import { useGetAllAgreementTemplate } from "../../../hooks/use-agreement-template.api";
import { useCreateProperty } from "../../../hooks/use-property.api";
import InputNumeric from "../../../components/form/inputnumeric.element";

const PropertyCreateView = () => {
  const imageSchema = yup.object({ filename: yup.string() });

  const schema = yup
    .object({
      name: yup.string().min(10).max(255).required(),
      description: yup.string().min(10).required(),
      province_id: yup.string().required(),
      city_id: yup.string().required(),
      postal_code: yup.string().max(5).required(),
      longitude: yup.number().required(),
      latitude: yup.number().required(),
      type: yup.string().required(),
      furnishing_type: yup.string().required(),
      land_area: yup.number().required(),
      building_area: yup.number().required(),
      total_rooms: yup.number().required(),
      total_bathrooms: yup.number().required(),
      rental_cost: yup.number().required(),
      is_deposit_required: yup.bool(),
      deposit_amount: yup.number().required(),
      agreement_template_id: yup.number().required(),
      thumbnail: yup.string(),
      images: yup.array().of(imageSchema),
    })
    .required();

  type ImageType = yup.InferType<typeof imageSchema>;
  type PropertyType = yup.InferType<typeof schema>;

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<PropertyType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      province_id: "",
      city_id: "",
      postal_code: "",
      longitude: 0,
      latitude: 0,
      type: "",
      furnishing_type: "",
      land_area: 0,
      building_area: 0,
      total_rooms: 0,
      total_bathrooms: 0,
      rental_cost: 0,
      is_deposit_required: false,
      deposit_amount: 0,
      images: [{ filename: "" }],
    },
  });

  const toast = useToast();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "images",
  });

  const navigate = useNavigate();

  const selectedProvince = watch("province_id");
  const selectedThumbnail = watch("thumbnail");

  const addImage = () => {
    append({ filename: "" });
  };

  const createMutation = useCreateProperty({
    onSuccess: () => {
      toast({
        body: "Property created",
        isAutoHide: true,
        autoHideDuration: 3000,
      });
      navigate("/tenant/");
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

  const onSubmit = (values: PropertyType) => {
    const formData: Record<string, unknown> = { ...values };
    formData.status = "DRAFT";

    formData.images = values.images?.filter((data: ImageType) => {
      return data.filename !== "";
    });

    createMutation.mutate(formData);
  };

  const { data: provincesOptions } = useGetAllProvinceOptions();
  const { data: regencyOptions } = useGetAllRegencyOptions(selectedProvince);
  const { data: agreementTemplates } = useGetAllAgreementTemplate();
  const agreementTemplateOptions =
    agreementTemplates &&
    agreementTemplates.map((datum: any) => ({
      label: datum.title,
      value: datum.id,
    }));

  return (
    <div className="p-4">
      <Heading level={1} className="mb-4">
        Property
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout direction="horizontal-labels">
          <InputText
            name="name"
            label="Name"
            control={control}
            error={errors.name}
          />
          <InputText
            name="description"
            label="Description"
            control={control}
            error={errors.description}
          />
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
          <InputText
            name="postal_code"
            label="Postal Code"
            control={control}
            error={errors.postal_code}
          />
          <InputNumeric
            name="longitude"
            label="Longitude"
            control={control}
            error={errors.longitude}
          />
          <InputNumeric
            name="latitude"
            label="Latitude"
            control={control}
            error={errors.latitude}
          />
          <SelectBox
            name="type"
            label="Type"
            placeholder="-- Type --"
            options={PROPERTY_TYPE_OPTIONS ?? []}
            control={control}
            error={errors.type}
          />
          <SelectBox
            name="furnishing_type"
            label="Furnishing Type"
            placeholder="-- Furnishing Type --"
            options={FURNISHING_TYPE_OPTIONS ?? []}
            control={control}
            error={errors.type}
          />
          <InputNumeric
            name="land_area"
            label="Land Area"
            control={control}
            error={errors.land_area}
          />
          <InputNumeric
            name="building_area"
            label="Building Area"
            control={control}
            error={errors.building_area}
          />
          <InputNumeric
            name="total_rooms"
            label="Total Rooms"
            control={control}
            error={errors.total_rooms}
          />
          <InputNumeric
            name="total_bathrooms"
            label="Total Bathrooms"
            control={control}
            error={errors.total_bathrooms}
          />
          <InputNumeric
            name="rental_cost"
            label="Rental Cost"
            control={control}
            error={errors.rental_cost}
          />
          <CheckBox
            name="is_deposit_required"
            label={"Is Deposit Required ?"}
            control={control}
            error={errors.is_deposit_required}
          />
          <InputNumeric
            name="deposit_amount"
            label="Deposit Amount"
            control={control}
            error={errors.deposit_amount}
          />
          <SelectBox
            name="agreement_template_id"
            label="Agreement Template"
            placeholder="-- Agreement Template --"
            options={agreementTemplateOptions ?? []}
            control={control}
            error={errors.agreement_template_id}
          />
          <UploadFormField
            name="thumbnail"
            label="Thumbnail"
            control={control}
            value={selectedThumbnail}
          />
        </FormLayout>
        <Divider isFullBleed className="my-6" />
        <HStack hAlign="between">
          <Heading level={2}>Images</Heading>
          <IconButton
            key="primary"
            label="Add"
            variant="primary"
            icon={<Icon icon={PlusIcon} />}
            elevation="high"
            onClick={addImage}
          />
        </HStack>
        <div className="w-full">
          {fields.map((field, index) => {
            return (
              <HStack className="my-4 pt-4" hAlign="between">
                <label className="w-1/12 mr-6">{`Image ${index + 1}`}</label>
                <div className="w-11/12">
                  <UploadFormField
                    name={`images.${index}`}
                    label=""
                    control={control}
                    value={null}
                  />
                </div>
                <IconButton
                  key="primary"
                  label="Add"
                  variant="primary"
                  icon={<Icon icon={TrashIcon} />}
                  elevation="high"
                  onClick={() => remove(index)}
                />
              </HStack>
            );
          })}
        </div>
        <HStack gap={2} hAlign="end">
          <Button label="Submit" type="submit" variant="primary" />
        </HStack>
      </form>
    </div>
  );
};

export default PropertyCreateView;
