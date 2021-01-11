import React from "react";
import { FaFacebookSquare } from "@react-icons/all-files/fa/FaFacebookSquare";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

import { Button } from "@windmill/react-ui";

const SocialAuth = ({ handleGoogle, handleFacebook }) => {
  return (
    <>
      <Button block className="my-2" layout="outline">
        <FcGoogle className="w-4 h-4 mr-2" aria-hidden="true" />
        With Google
      </Button>
      <Button block layout="outline">
        <FaFacebookSquare
          className="w-4 h-4 mr-2 text-blue-500"
          aria-hidden="true"
        />
        With Facebook
      </Button>
    </>
  );
};

export default SocialAuth;
