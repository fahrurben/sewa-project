import { Heading } from "@astryxdesign/core/Text";

import { Form as AgreementTemplateForm } from "./form.view";

const AgreementTemplateCreateView = () => {
  return (
    <div className="p-4">
      <Heading level={1} className="mb-4">
        Agreement Template
      </Heading>
      <AgreementTemplateForm />
    </div>
  );
};

export default AgreementTemplateCreateView;
