import { Fragment, lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
import MainLayout from "../layouts/MainLayout";
import CreateStudio from "../pages/private/Studio/CreateStudio";
import ListStudio from "../pages/private/Studio/ListStudio";
import CreatePricePackage from "../pages/private/PricePackage/CreatePricePackage";
import ListPricePackage from "../pages/private/PricePackage/ListPricePackage";
import Dashboard from "../pages/private/Dashboard";
import Profile from "../pages/private/Profile";
import ThemedSuspense from "../components/shared/ThemedSuspense";

const privateRoutes = [
  {
    layout: Fragment,
    subRoutes: [
      {
        path: "/app",
        exact: true,
        component: ThemedSuspense, // preloader TODO
      },
    ],
  },
  {
    layout: MainLayout,
    subRoutes: [
      {
        path: "/app",
        exact: true,
        component: ThemedSuspense,
      },
      {
        path: "/dashboard",
        exact: true,
        component: Dashboard,
      },
      {
        path: "/profile",
        exact: true,
        component: Profile,
      },
      {
        path: "/studios",
        exact: true,
        component: ListStudio,
      },
      {
        path: "/studio/create",
        exact: true,
        component: CreateStudio,
      },
      {
        path: "/pacchetti",
        exact: true,
        component: ListPricePackage,
      },
      {
        path: "/pacchetti/create",
        exact: true,
        component: CreatePricePackage,
      },
    ],
  },
];

export default privateRoutes;
