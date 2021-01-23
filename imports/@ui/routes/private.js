import { Fragment } from "react";

import MainLayout from "@ui/layouts/MainLayout";
import CreatePricePackage from "@ui/features/price-package/CreatePricePackage";
import ListPricePackage from "@ui/features/price-package/ListPricePackage";
import Dashboard from "@ui/features/dashboard/Dashboard";
import Profile from "@ui/features/profile/Profile";
import ThemedSuspense from "@ui/components/Basic/ThemedSuspense";
import { privatePath, rootPath, rootPathUser } from "@ui/routes/privatePath";
import UserDashboard from "@ui/features/dashboard/UserDashboard";
import Inbox from "@ui/features/chat/Inbox";

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