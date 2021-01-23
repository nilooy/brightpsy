import { Fragment, lazy } from "react";
import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/public/Home";

const publicRoutes = [
  {
    layout: PublicLayout,
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
