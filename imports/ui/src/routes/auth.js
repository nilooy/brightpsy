import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/Login";
import CreateAccount from "../pages/auth/CreateAccount";
import ForgotPassword from "../pages/auth/ForgotPassword";

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
