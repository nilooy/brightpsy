import React, { useContext } from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import Page404 from "../pages/public/Page404";
import publicRoutes from "./public";
import { privateRoutes, privateRoutesUser } from "./private";
import auth from "./auth";
import AccessibleNavigationAnnouncer from "../components/shared/AccessibleNavigationAnnouncer";
import { SecurityContext } from "../context/SecurityContext";

const Routes = () => {
  const { isDoctor } = useContext(SecurityContext);
  const privateRoutesBasedOnRole = isDoctor ? privateRoutes : privateRoutesUser;

  const routes = [...publicRoutes, ...privateRoutesBasedOnRole, ...auth];

  return (
    <>
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
    </>
  );
};

export default Routes;
