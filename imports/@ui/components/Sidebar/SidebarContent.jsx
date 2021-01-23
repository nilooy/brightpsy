import React, { useContext } from "react";
import sidebar from "@ui/routes/sidebar";
import sidebarUser from "@ui/routes/sidebarUser";
import { NavLink, Route, useHistory } from "react-router-dom";
import * as Icons from "@ui/assets/icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "@windmill/react-ui";
import Logo from "@ui/components/Basic/Logo";
import { privatePath } from "@ui/routes/privatePath";
import { SecurityContext } from "@ui/context/SecurityContext";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  const history = useHistory();

  const { isDoctor } = useContext(SecurityContext);

  const routes = isDoctor ? sidebar : sidebarUser;

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <Logo link="/app" />
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-blue-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
        <Button onClick={() => history.push(privatePath.packagesCreate)}>
          Crea pacchetti
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>
    </div>
  );
}

export default SidebarContent;
