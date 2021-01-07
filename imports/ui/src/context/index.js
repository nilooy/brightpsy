import React from "react";
import { AutocompleteProvider } from "../components/features/AutocompleteAddress/AutoCompleteContext";
import { SidebarProvider } from "./SidebarContext";
import { StudioProvider } from "./StudioContext";
import { PricePackageProvider } from "./PricePackageContext";

const ContextProvider = ({ children }) => {
  return (
    <StudioProvider>
      <SidebarProvider>
        <PricePackageProvider>
          <AutocompleteProvider>{children}</AutocompleteProvider>
        </PricePackageProvider>
      </SidebarProvider>
    </StudioProvider>
  );
};

export default ContextProvider;
