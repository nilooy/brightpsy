import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
import MainLayout from "../layouts/MainLayout";
const Dashboard = lazy(() => import("../pages/private/Dashboard"));
const Forms = lazy(() => import("../pages/private/Forms"));
const Cards = lazy(() => import("../pages/private/Cards"));
const Charts = lazy(() => import("../pages/private/Charts"));
const Buttons = lazy(() => import("../pages/private/Buttons"));
const Modals = lazy(() => import("../pages/private/Modals"));
const Tables = lazy(() => import("../pages/private/Tables"));

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
        path: "/forms",
        exact: true,
        component: Forms,
      },
      {
        path: "/cards",
        exact: true,
        component: Cards,
      },
      {
        path: "/charts",
        exact: true,
        component: Charts,
      },
      {
        path: "/buttons",
        exact: true,
        component: Buttons,
      },
      {
        path: "/modals",
        exact: true,
        component: Modals,
      },
      {
        path: "/tables",
        exact: true,
        component: Tables,
      },
    ],
  },
];

export default privateRoutes;
