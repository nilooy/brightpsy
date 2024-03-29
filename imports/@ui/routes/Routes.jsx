import React  from "react";
import { Route, Switch} from "react-router-dom";
import Page404 from "@ui/routes/Page404";
import { privateRoutes, privateRoutesUser } from "./private";
import auth from "./auth";
import { useUserRole } from "@ui/api-hooks/user";

const Routes = () => {
  const { isDoctor } = useUserRole();
  const privateRoutesBasedOnRole = isDoctor ? privateRoutes : privateRoutesUser;

  const routes = [...privateRoutesBasedOnRole, ...auth];

  return (
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
  );
};

export default Routes;
