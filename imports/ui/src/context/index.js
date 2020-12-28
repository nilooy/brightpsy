import { SidebarProvider } from "./SidebarContext";
import { StudioProvider } from "./StudioContext";
import { PricePackageProvider } from "./PricePackageContext";

import React from "react";

const ContextProvider = ({ children }) => {
  return (
    <StudioProvider>
      <SidebarProvider>
        <PricePackageProvider>{children}</PricePackageProvider>
      </SidebarProvider>
    </StudioProvider>
  );
};

export default ContextProvider;
