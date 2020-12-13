import { Fragment, lazy } from "react";
import ThemedSuspense from "../components/ThemedSuspense";

const Home = lazy(() => import("../pages/public/Home"));

const publicRoutes = [
  {
    layout: Fragment,
    subRoutes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/test",
        exact: true,
        component: ThemedSuspense,
      },
    ],
  },
];

export default publicRoutes;
