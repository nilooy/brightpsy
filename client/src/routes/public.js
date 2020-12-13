import { Fragment, lazy } from "react";

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
    ],
  },
];

export default publicRoutes;
