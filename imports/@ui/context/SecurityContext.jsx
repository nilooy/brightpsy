import React, { useMemo } from "react";
import { useTracker } from "meteor/react-meteor-data";

// create context
export const SecurityContext = React.createContext();

export const SecurityProvider = ({ children }) => {
  const role = useTracker(() => Roles.getRolesForUser(Meteor.userId())[0]);

  export const isDoctor = role === "doctor";
  export const isUser = role === "user";

  const value = useMemo(
    () => ({
      role,
      isDoctor,
      isUser,
    }),
    [role]
  );

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};
