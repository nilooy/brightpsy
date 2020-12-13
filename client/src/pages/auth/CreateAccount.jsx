import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { GithubIcon, TwitterIcon } from "../../assets/icons";
import { Input, Label, Button, Badge } from "@windmill/react-ui";

const initialState = {
  firstName: "Niloy",
  lastName: "sss",
  email: "test@test.com",
  password: "citi0119",
  confirmPassword: "citi0119",
};

function CreateAccount() {
  const [form, setForm] = useState(initialState);

  const [state, setState] = useState({
    loading: false,
    errorMsg: "",
    success: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setState({ ...state, loading: true });

    Meteor.call("auth.signup", form, (error) => {
      if (error) {
        console.log(error);
        setState({ ...state, loading: false, errorMsg: error.reason });
      } else setState({ ...state, loading: false, success: true });
    });
  };

  const redirectOnSuccess = () => state.success && <Redirect to="/login" />;

  return (
    <>
      {redirectOnSuccess()}
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Create account
      </h1>

      <form onSubmit={handleSubmit}>
        <Label>
          <span>First Name</span>
          <Input
            onChange={handleChange}
            className="mt-1"
            type="text"
            placeholder="John"
            name="firstName"
            value={form.firstName}
          />
        </Label>
        <Label>
          <span>Last Name</span>
          <Input
            onChange={handleChange}
            className="mt-1"
            type="text"
            placeholder="Doe"
            name="lastName"
            value={form.lastName}
          />
        </Label>
        <Label>
          <span>Email</span>
          <Input
            onChange={handleChange}
            className="mt-1"
            type="email"
            placeholder="john@doe.com"
            name="email"
            value={form.email}
          />
        </Label>
        <Label className="mt-4">
          <span>Password</span>
          <Input
            onChange={handleChange}
            className="mt-1"
            placeholder="***************"
            type="password"
            name="password"
            value={form.password}
          />
        </Label>
        <Label className="mt-4">
          <span>Confirm password</span>
          <Input
            onChange={handleChange}
            className="mt-1"
            placeholder="***************"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
          />
        </Label>

        {state.errorMsg && (
          <div className="text-center mt-3">
            <Badge type="danger">{state.errorMsg}</Badge>
          </div>
        )}

        <Label className="mt-3" check>
          <Input type="checkbox" />
          <span className="ml-2">
            I agree to the <span className="underline">privacy policy</span>
          </span>
        </Label>

        <Button type="submit" block className="mt-4">
          Create account
        </Button>
      </form>

      <hr className="my-8" />

      <Button block layout="outline">
        <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
        Github
      </Button>
      <Button block className="mt-4" layout="outline">
        <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
        Twitter
      </Button>

      <p className="mt-4">
        <Link
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
          to="/login"
        >
          Already have an account? Login
        </Link>
      </p>
    </>
  );
}

export default CreateAccount;
