import { Fragment, lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
import MainLayout from "../layouts/MainLayout";
import CreatePricePackage from "../pages/private/PricePackage/CreatePricePackage";
import ListPricePackage from "../pages/private/PricePackage/ListPricePackage";
import Dashboard from "../pages/private/Dashboard";
import Profile from "../pages/private/Profile";
import Studios from "../pages/private/Studio/Studios";
import CreateStudio from "../pages/private/Studio/CreateStudio";
import EditStudio from "../pages/private/Studio/EditStudio";
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
        component: Studios,
      },
      {
        path: "/studios/create",
        exact: true,
        component: CreateStudio,
      },
      {
        path: "/studios/edit",
        exact: true,
        component: EditStudio,
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
