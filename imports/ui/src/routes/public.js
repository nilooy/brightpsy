import { Fragment, lazy } from "react";
import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/public/Home";
import SearchResult from "../pages/public/SearchResult";
import SingleStudio from "../pages/public/SingleStudio";

const publicRoutes = [
  {
    layout: PublicLayout,
    subRoutes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/search",
        exact: true,
        component: SearchResult,
      },
      {
        path: "/studio/:id",
        exact: true,
        component: SingleStudio,
      },
    ],
  },
];

export default publicRoutes;
