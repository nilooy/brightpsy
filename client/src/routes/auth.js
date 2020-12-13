import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";

const Login = lazy(() => import("../pages/auth/Login"));
const CreateAccount = lazy(() => import("../pages/auth/CreateAccount"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));

const authRoutes = [
  {
    layout: AuthLayout,
    subRoutes: [
      {
        path: "/login",
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
    ],
  },
];

export default authRoutes;
