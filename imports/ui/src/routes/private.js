import { Fragment } from "react";

import MainLayout from "../layouts/MainLayout";
import CreatePricePackage from "../pages/private/PricePackage/CreatePricePackage";
import ListPricePackage from "../pages/private/PricePackage/ListPricePackage";
import Dashboard from "../pages/private/Dashboard";
import Profile from "../pages/private/Profile";
import Studios from "../pages/private/Studio/Studios";
import CreateStudio from "../pages/private/Studio/CreateStudio";
import EditStudio from "../pages/private/Studio/EditStudio";
import ThemedSuspense from "../components/shared/ThemedSuspense";
import { privatePath, rootPath, rootPathUser } from "./privatePath";

export const privateRoutes = [
  {
    layout: Fragment,
    subRoutes: [
      {
        path: rootPath,
        exact: true,
        component: ThemedSuspense, // preloader TODO
      },
    ],
  },
  {
    layout: MainLayout,
    subRoutes: [
      {
        path: rootPath,
        exact: true,
        component: ThemedSuspense,
      },
      {
        path: privatePath.dashboard,
        exact: true,
        component: Dashboard,
      },
      {
        path: privatePath.profile,
        exact: true,
        component: Profile,
      },
      {
        path: privatePath.studio,
        exact: true,
        component: Studios,
      },
      {
        path: privatePath.studioCreate,
        exact: true,
        component: CreateStudio,
      },
      {
        path: privatePath.studioEdit,
        exact: true,
        component: EditStudio,
      },
      {
        path: privatePath.packages,
        exact: true,
        component: ListPricePackage,
      },
      {
        path: privatePath.packagesCreate,
        exact: true,
        component: CreatePricePackage,
      },
    ],
  },
];

export const privateRoutesUser = [
  {
    layout: Fragment,
    subRoutes: [
      {
        path: rootPathUser,
        exact: true,
        component: ThemedSuspense, // preloader TODO
      },
    ],
  },
  {
    layout: MainLayout,
    subRoutes: [
      {
        path: rootPath,
        exact: true,
        component: ThemedSuspense,
      },
      {
        path: privatePath.dashboard,
        exact: true,
        component: Dashboard,
      },
      {
        path: privatePath.profile,
        exact: true,
        component: Profile,
      },
    ],
  },
];
