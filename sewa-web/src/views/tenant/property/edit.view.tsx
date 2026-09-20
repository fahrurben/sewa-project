import { Heading } from "@astryxdesign/core/Text";
import { Form as PropertyForm } from "./form.view";
import { useParams } from "react-router";
import { useGetProperty } from "../../../hooks/use-property.api";

const PropertyEditView = () => {
  const { id } = useParams();
  const propertyId = id ? parseInt(id) : null;
  const { data: initialValue } = useGetProperty(propertyId);

  return (
    <div className="p-4">
      <Heading level={1} className="mb-4">
        Property
      </Heading>
      <PropertyForm id={propertyId} initialValue={initialValue} />
    </div>
  );
};

export default PropertyEditView;
