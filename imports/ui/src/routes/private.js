import { Fragment } from "react";

import MainLayout from "../layouts/MainLayout";
import CreatePricePackage from "../pages/private/PricePackage/CreatePricePackage";
import ListPricePackage from "../pages/private/PricePackage/ListPricePackage";
import Dashboard from "../pages/private/Dashboard";
import Profile from "../pages/private/Profile";
import ThemedSuspense from "../components/shared/ThemedSuspense";
import { privatePath, rootPath, rootPathUser } from "./privatePath";
import UserDashboard from "../pages/private/UserDashboard";
import Inbox from "../pages/private/Chat/Inbox";

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
        path: privatePath.packages,
        exact: true,
        component: ListPricePackage,
      },
      {
        path: privatePath.packagesCreate,
        exact: true,
        component: CreatePricePackage,
      },
      {
        path: privatePath.inbox,
        exact: true,
        component: Inbox,
      },
      {
        path: privatePath.inboxById(),
        exact: true,
        component: Inbox,
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
        component: UserDashboard,
      },
      {
        path: privatePath.profile,
        exact: true,
        component: Profile,
      },
      {
        path: privatePath.inbox,
        exact: true,
        component: Inbox,
      },
      {
        path: privatePath.inboxById(),
        exact: true,
        component: Inbox,
      },
    ],
  },
];
