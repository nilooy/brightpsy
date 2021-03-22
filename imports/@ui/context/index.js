import React from "react";
import { AutocompleteProvider } from "@ui/components/AutocompleteAddress/AutoCompleteContext";
import { TagProvider } from "@ui/components/TagManager/TagContext";
import { SidebarProvider } from "./SidebarContext";
import { SecurityProvider } from "./SecurityContext";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const ContextProvider = ({ children }) => {
  return (
    <SecurityProvider>
      <SidebarProvider>
        <AutocompleteProvider>
          <TagProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {children}
            </MuiPickersUtilsProvider>
          </TagProvider>
        </AutocompleteProvider>
      </SidebarProvider>
    </SecurityProvider>
  );
};

export default ContextProvider;
