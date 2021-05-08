import AuthLayout from "../layouts/AuthLayout";

import Login from "@ui/features//auth/Login";
import CreateAccount from "@ui/features//auth/CreateAccount";
import ForgotPassword from "@ui/features//auth/ForgotPassword";
import AuthWelcome from "@ui/features//auth/AuthWelcome";

const authRoutes = [
  {
    layout: AuthLayout,
    subRoutes: [
      {
        path: "/",
        exact: true,
        component: AuthWelcome,
      },
      {
        path: "/welcome",
        exact: true,
        component: AuthWelcome,
      },
      {
        path: "/login",
        exact: true,
        component: Login,
      },
      {
        path: "/login/:role",
        exact: true,
        component: Login,
      },
      {
        path: "/create-account",
        exact: true,
        component: CreateAccount,
      },
      {
        path: "/create-account/:role",
        exact: true,
        component: CreateAccount,
      },
      {
        path: "/forgot-password",
        exact: true,
        component: ForgotPassword,
      },
      {
        path: "/forgot-password/:token",
        exact: true,
        component: ForgotPassword,
      },
    ],
  },
];

export default authRoutes;
