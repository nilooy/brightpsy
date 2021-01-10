import React, { useContext, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Header from "../components/shared/Navbar/NavbarPrivate";
import { SidebarContext } from "../context/SidebarContext";

const Layout = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location]);

  if (!Meteor.userId()) return <Redirect to="/welcome" />;

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full overflow-y-auto">
          <div className="container grid px-6 mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
