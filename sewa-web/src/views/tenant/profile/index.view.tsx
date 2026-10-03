import { Heading } from "@astryxdesign/core/Text";
import { Form as UserProfileForm } from "./form.view";
import { useParams } from "react-router";
import useAuth from "../../../hooks/userauthhook";

const ProfileIndexView = () => {
  const { id } = useParams();
  const { user: initialValue } = useAuth();

  return (
    <div className="p-4">
      <Heading level={1} className="mb-4">
        Profile
      </Heading>
      <UserProfileForm initialValue={initialValue} />
    </div>
  );
};

export default ProfileIndexView;
