import { Fragment, lazy } from "react";

import Home from "../pages/public/Home";

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
