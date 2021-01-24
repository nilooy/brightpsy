import React from "react";
import ProfileEditForm from "./ProfileEditForm";
import ProfileImageUpload from "./ProfileImageUpload";

const Profile = () => {
  return (
    <div>
      <ProfileImageUpload />
      <ProfileEditForm />
    </div>
  );
};

export default Profile;
