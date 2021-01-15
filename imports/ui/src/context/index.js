import React from "react";
import { AutocompleteProvider } from "../components/features/AutocompleteAddress/AutoCompleteContext";
import { TagProvider } from "../components/features/TagManager/TagContext";
import { SidebarProvider } from "./SidebarContext";
import { SecurityProvider } from "./SecurityContext";

const ContextProvider = ({ children }) => {
  return (
    <SecurityProvider>
      <SidebarProvider>
        <AutocompleteProvider>
          <TagProvider>{children}</TagProvider>
        </AutocompleteProvider>
      </SidebarProvider>
    </SecurityProvider>
  );
};

export default ContextProvider;
