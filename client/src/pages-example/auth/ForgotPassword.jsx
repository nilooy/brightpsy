import React from "react";
import { Link } from "react-router-dom";
import { Label, Input, Button } from "@windmill/react-ui";

function ForgotPassword() {
  return (
    <>
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Forgot password
      </h1>

      <Label>
        <span>Email</span>
        <Input className="mt-1" placeholder="Jane Doe" />
      </Label>

      <Button tag={Link} to="/login" block className="mt-4">
        Recover password
      </Button>
    </>
  );
}

export default ForgotPassword;
