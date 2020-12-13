import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
import MainLayout from "../layouts/MainLayout";
import CreateStudio from "../pages/private/Studio/CreateStudio";
import ListStudio from "../pages/private/Studio/ListStudio";
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
      {
        path: "/studio",
        exact: true,
        component: ListStudio,
      },
      {
        path: "/studio/create",
        exact: true,
        component: CreateStudio,
      },
    ],
  },
];

export default privateRoutes;
