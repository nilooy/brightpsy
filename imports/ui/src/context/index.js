import React from "react";
import { AutocompleteProvider } from "../components/features/AutocompleteAddress/AutoCompleteContext";
import { TagProvider } from "../components/features/TagManager/TagContext";
import { SidebarProvider } from "./SidebarContext";
import { StudioProvider } from "./StudioContext";
import { PricePackageProvider } from "./PricePackageContext";

const ContextProvider = ({ children }) => {
  return (
    <StudioProvider>
      <SidebarProvider>
        <PricePackageProvider>
          <AutocompleteProvider>
            <TagProvider>{children}</TagProvider>
          </AutocompleteProvider>
        </PricePackageProvider>
      </SidebarProvider>
    </StudioProvider>
  );
};

export default ContextProvider;
