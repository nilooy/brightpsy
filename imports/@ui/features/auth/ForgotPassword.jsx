import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Label, Input, Button } from "@windmill/react-ui";
import { Accounts } from "meteor/accounts-base";
import { validateEmail } from "@ui/utils/helpers";
import HoldMyUi from "holdmyui";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [alert, setAlert] = useState({
    text: "",
    color: "",
  });

  const { token } = useParams();

  const [passwordState, setPasswordsState] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordsState({ ...passwordState, [e.target.name]: e.target.value });
    if (matchPassword())
      setAlert({
        text: "Conferma password deve essere uguale di password",
        color: "red",
      });
    else {
      setAlert({});
    }
  };

  const matchPassword = () =>
    passwordState.password &&
    passwordState.confirmPassword &&
    passwordState.password === passwordState.confirmPassword;

  const handleForgetPassword = (e) => {
    e.preventDefault();

    setLoading(true);

    Accounts.forgotPassword({ email }, function (e, r) {
      if (e) {
        console.log(e.reason);
        setAlert({
          text: e.reason,
          color: "red",
        });
      } else {
        setAlert({
          text: "Link per recuperare il password mandato sul tuo mail",
          color: "green",
        });
        setEmail("");
      }

      setLoading(false);
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!matchPassword()) {
      return;
    }

    setLoading(true);

    Accounts.resetPassword(token, passwordState.password, function (e, r) {
      if (e) {
        console.log(e.reason);
        setAlert({
          text: e.reason,
          color: "red",
        });
      } else {
        setAlert({
          text: "Link per recuperare il password mandato sul tuo mail",
          color: "green",
        });
        setEmail("");
      }

      setLoading(false);
    });
  };

  return !token ? (
    <>
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Forgot password
      </h1>

      <HoldMyUi
        when={loading}
        preloader="Ripple"
        preloaderTop="10vh"
        color="#4ac959"
        type="absolute"
      >
        <form onSubmit={handleForgetPassword}>
          <Label>
            <span>Email</span>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
                setAlert({});
              }}
              className="mt-1"
              placeholder="il tuo indirizzo email"
              value={email}
              className="border"
            />
          </Label>
          {alert?.text && (
            <p className={`text-center text-sm text-${alert.color}-500 mt-2`}>
              {alert?.text}
            </p>
          )}

          <Button
            disabled={!validateEmail(email)}
            type="submit"
            block
            className="mt-4"
          >
            Recupera il password
          </Button>
        </form>
      </HoldMyUi>
    </>
  ) : (
    // If token present, change the template to change password
    <>
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Imposta nuova password
      </h1>

      <HoldMyUi
        when={loading}
        preloader="Ripple"
        preloaderTop="10vh"
        color="#4ac959"
        type="absolute"
      >
        <form onSubmit={handleResetPassword}>
          <Label>
            <span>Password</span>
            <Input
              onChange={handlePasswordChange}
              name="password"
              className="mt-1"
              placeholder="Password"
              value={passwordState.password}
              type="password"
              className="border"
            />
          </Label>
          <Label className="mt-5">
            <span>Conferma password</span>
            <Input
              onChange={handlePasswordChange}
              name="confirmPassword"
              className="mt-1"
              placeholder="Conferma password"
              value={passwordState.confirmPassword}
              type="password"
              className="border"
            />
          </Label>

          {alert?.text && (
            <p className={`text-center text-xs text-${alert.color}-500 mt-2`}>
              {alert?.text}
            </p>
          )}

          <Button
            disabled={!matchPassword()}
            type="submit"
            block
            className="mt-4"
          >
            Salva
          </Button>
        </form>
      </HoldMyUi>
    </>
  );
}

export default ForgotPassword;
