import { SidebarProvider } from "./SidebarContext";
import { StudioProvider } from "./StudioContext";

import React from "react";

const ContextProvider = ({ children }) => {
  return (
    <StudioProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </StudioProvider>
  );
};

export default ContextProvider;
