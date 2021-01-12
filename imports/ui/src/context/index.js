import React from "react";
import { AutocompleteProvider } from "../components/features/AutocompleteAddress/AutoCompleteContext";
import { TagProvider } from "../components/features/TagManager/TagContext";
import { SidebarProvider } from "./SidebarContext";
import { StudioProvider } from "./StudioContext";
import { PricePackageProvider } from "./PricePackageContext";
import { SecurityProvider } from "./SecurityContext";

const ContextProvider = ({ children }) => {
  return (
    <SecurityProvider>
      <StudioProvider>
        <SidebarProvider>
          <PricePackageProvider>
            <AutocompleteProvider>
              <TagProvider>{children}</TagProvider>
            </AutocompleteProvider>
          </PricePackageProvider>
        </SidebarProvider>
      </StudioProvider>
    </SecurityProvider>
  );
};

export default ContextProvider;
