import React, { useState } from "react";
import { FaFacebookSquare } from "@react-icons/all-files/fa/FaFacebookSquare";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

import { Button, Badge } from "@windmill/react-ui";
import { useHistory, useParams } from "react-router-dom";
import { privatePath } from "../../routes/privatePath";

const SocialAuth = () => {
  const history = useHistory();

  const { role } = useParams();

  if (role === "doctor") {
    return null;
  }

  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogle = () => {
    Meteor.loginWithGoogle(
      {
        requestPermissions: ["email", "profile"],
      },
      (err) => {
        if (err) {
          setErrorMsg(err.reason);
        } else {
          history.push(privatePath.dashboard);
        }
      }
    );
  };
  const handleFacebook = () => {
    Meteor.loginWithFacebook(
      {
        requestPermissions: ["public_profile", "email"],
      },
      (err) => {
        if (err) {
          setErrorMsg(err.reason);
        } else {
          history.push(privatePath.dashboard);
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
      {errorMsg && (
        <div className="text-center mt-3">
          <Badge type="danger">{errorMsg}</Badge>
        </div>
      )}
    </>
  );
};

export default SocialAuth;
