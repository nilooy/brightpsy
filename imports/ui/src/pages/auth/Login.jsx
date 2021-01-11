import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { GithubIcon, TwitterIcon } from "../../assets/icons";
import { Label, Input, Button, Badge } from "@windmill/react-ui";
import { privatePath } from "../../routes/privatePath";
import SocialAuth from "./SocialAuth";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
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

    const { email, password } = form;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log(error);
        setState({ ...state, loading: false, errorMsg: error.reason });
      } else setState({ ...state, loading: false, success: true });
    });
  };

  const redirectOnSuccess = () =>
    state.success && <Redirect to={privatePath.dashboard} />;

  return (
    <>
      {redirectOnSuccess()}
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <Label>
          <span>Email</span>
          <Input
            onChange={handleChange}
            name="email"
            value={form.email}
            className="mt-1"
            type="email"
            placeholder="john@doe.com"
            required
          />
        </Label>

        <Label className="mt-4">
          <span>Password</span>
          <Input
            onChange={handleChange}
            name="password"
            value={form.password}
            className="mt-1"
            type="password"
            placeholder="***************"
            required
          />
        </Label>

        {state.errorMsg && (
          <div className="text-center mt-3">
            <Badge type="danger">{state.errorMsg} </Badge>
            <Badge type="success">
              {state.errorMsg == "User not found" ? (
                <Link to="/create-account">Create Account</Link>
              ) : (
                ""
              )}
            </Badge>
          </div>
        )}

        <Button type="submit" className="mt-4" block>
          Log in
        </Button>
      </form>

      <hr className="my-8" />

      <SocialAuth />

      <p className="mt-4">
        <Link
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
          to="/forgot-password"
        >
          Forgot your password?
        </Link>
      </p>

      <p className="mt-1">
        <Link
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
          to="/create-account"
        >
          Create account
        </Link>
      </p>
    </>
  );
};

export default Login;
