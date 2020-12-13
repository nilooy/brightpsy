import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
import MainLayout from "../layouts/MainLayout";
const Dashboard = lazy(() => import("../pages/private/Dashboard"));

const privateRoutes = [
  {
    layout: MainLayout,
    subRoutes: [
      {
        path: "/dashboard",
        exact: true,
        component: Dashboard,
      },
    ],
  },
];

export default privateRoutes;
