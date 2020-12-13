import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Page404 from "../pages/public/Page404";
import publicRoutes from "./public";
import privateRoutes from "./private";
import auth from "./auth";
import ThemedSuspense from "../components/ui/ThemedSuspense";
import AccessibleNavigationAnnouncer from "../components/ui/AccessibleNavigationAnnouncer";

const Routes = () => {
  const routes = [...publicRoutes, ...privateRoutes, ...auth];

  return (
    <Router>
      <AccessibleNavigationAnnouncer />
      <Suspense fallback={<ThemedSuspense />}>
        <Switch>
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
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
