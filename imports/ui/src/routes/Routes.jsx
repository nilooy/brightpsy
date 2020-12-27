import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import Page404 from "../pages/public/Page404";
import publicRoutes from "./public";
import privateRoutes from "./private";
import auth from "./auth";
import AccessibleNavigationAnnouncer from "../components/ui/AccessibleNavigationAnnouncer";
import { createMemoryHistory } from "history";

const Routes = () => {
  const routes = [...publicRoutes, ...privateRoutes, ...auth];

  const history = createMemoryHistory();

  return (
    <>
      {routes.map((route, i) => (
        <Route
          key={i}
          exact={route.subRoutes.some((r) => r.exact)}
          path={route.subRoutes.map((r) => r.path)}
        >
          <route.layout>
            {route.subRoutes.map((subRoute, i) => (
              <Route key={i} {...subRoute} />
            ))}
          </route.layout>
        </Route>
      ))}
      <Route path="*">
        <Page404 />
      </Route>
    </>
  );
};

export default Routes;
