import React, { useState, useMemo } from "react";
import { StudioCollection } from "../../../api/StudioCollection";
import { useTracker } from "meteor/react-meteor-data";

// create context
export const StudioContext = React.createContext();

export const StudioProvider = ({ children }) => {
  const { studios, isLoadingStudio } = useTracker(() => {
    const noDataAvailable = { studios: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("studios.get");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const studios = StudioCollection.find().fetch();

    return { studios };
  });

  /* UI */

  const [selectedStudio, setSelectedStudio] = useState(false);
  const [isStudioMenuOpen, setIsStudioMenuOpen] = useState(false);

  function setSelectStudio(studio) {
    setSelectedStudio(studio);
  }

  function toggleStudioMenu() {
    setIsStudioMenuOpen(!isStudioMenuOpen);
  }

  const value = useMemo(
    () => ({
      studios,
      isStudioMenuOpen,
      selectedStudio,
      setSelectStudio,
      toggleStudioMenu,
    }),
    [selectedStudio, studios, isLoadingStudio, isStudioMenuOpen]
  );

  return (
    <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
  );
};
