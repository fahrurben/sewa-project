import { Heading } from "@astryxdesign/core/Text";
import { Form as AgreementTemplateForm } from "./form.view";
import { useParams } from "react-router";
import { useGetAgreementTemplate } from "../../../hooks/use-agreement-template.api";

const AgreementTemplateEditView = () => {
  const { id } = useParams();
  const agreementTemplateId = id ? parseInt(id) : null;
  const { data: initialValue } = useGetAgreementTemplate(agreementTemplateId);

  return (
    <div className="p-4">
      <Heading level={1} className="mb-4">
        Agreement Template
      </Heading>
      <AgreementTemplateForm
        id={agreementTemplateId}
        initialValue={initialValue}
      />
    </div>
  );
};

export default AgreementTemplateEditView;
