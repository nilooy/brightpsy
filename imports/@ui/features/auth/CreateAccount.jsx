import React, { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { Input, Label, Button, Badge } from "@windmill/react-ui";
import SocialAuth from "./SocialAuth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  privacyPolicy: false,
  identity_numb: "",
  role: "",
};

function CreateAccount() {
  const [form, setForm] = useState(initialState);

  const [state, setState] = useState({
    loading: false,
    errorMsg: "",
    success: false,
  });

  const { role: roleParam } = useParams();

  useEffect(() => {
    setForm({ ...form, role: roleParam ? roleParam : "user" });
  }, [roleParam]);

  const isDoctor = form.role === "doctor";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.privacyPolicy) {
      setState({
        ...state,
        loading: false,
        errorMsg: "You can read our privacy policy. It's required to accept it",
      });
      return;
    }

    if (isDoctor && !form.identity_numb) {
      setState({
        ...state,
        loading: false,
        errorMsg: "You need to provide Alma ID to verify",
      });
      return;
    }

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
            required
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
            required
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
            required
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
            required
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
            required
          />
        </Label>

        {/* psicologo id */}
        {isDoctor && (
          <Label className="p-2 border border-orange-300">
            <span>Alma ID *</span>
            <Input
              onChange={handleChange}
              className="mt-1"
              type="text"
              placeholder="eg: 527637"
              name="identity_numb"
              value={form.identity_numb}
            />
          </Label>
        )}
        {/* psicologo id */}

        {state.errorMsg && (
          <div className="text-center mt-3">
            <Badge type="danger">{state.errorMsg}</Badge>
          </div>
        )}

        <Label className="mt-3" check>
          <Input
            type="checkbox"
            className="border"
            onChange={(e) =>
              setForm({ ...form, privacyPolicy: e.target.checked })
            }
          />
          <span className="ml-2">
            I agree to the <span className="underline">privacy policy</span>
          </span>
        </Label>

        <p className="mt-2 text-center">
          {!isDoctor ? (
            <Link
              className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
              to="/create-account/doctor"
            >
              Clicca qui se sei un psicologo
            </Link>
          ) : (
            <Link
              className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
              to="/create-account"
            >
              Clicca qui se stai cercando un psicologo
            </Link>
          )}
        </p>

        <Button type="submit" block className="mt-4">
          Create account
        </Button>
      </form>

      <hr className="my-4" />

      {/* Social block */}
      <SocialAuth />
      {/* Social block */}

      <p className="mt-4">
        <Link
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
          to={isDoctor ? "/login/doctor" : "/login"}
        >
          Hai già un account? Login
        </Link>
      </p>
    </>
  );
}

export default CreateAccount;
