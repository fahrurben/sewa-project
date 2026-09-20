import { Heading } from "@astryxdesign/core/Text";

import { Form as PropertyForm } from "./form.view";

const PropertyCreateView = () => {
  return (
    <div className="p-4">
      <Heading level={1} className="mb-4">
        Property
      </Heading>
      <PropertyForm />
    </div>
  );
};

export default PropertyCreateView;
