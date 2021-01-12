import React from "react";
import { FaFacebookSquare } from "@react-icons/all-files/fa/FaFacebookSquare";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

import { Button } from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import { privatePath } from "../../routes/privatePath";

const SocialAuth = () => {
  const history = useHistory();

  const handleGoogle = () => {
    Meteor.loginWithGoogle(
      {
        requestPermissions: ["email", "profile"],
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          history.push(privatePath.dashboard);
        }
      }
    );
  };
  const handleFacebook = () => {
    console.log("facebook");
    Meteor.loginWithFacebook(
      {
        requestPermissions: ["public_profile", "email"],
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
  };

  return (
    <>
      <Button block className="my-2" layout="outline" onClick={handleGoogle}>
        <FcGoogle className="w-4 h-4 mr-2" aria-hidden="true" />
        With Google
      </Button>
      <Button block layout="outline" onClick={handleFacebook}>
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
