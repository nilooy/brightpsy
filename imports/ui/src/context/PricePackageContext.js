import React, { useContext, useMemo } from "react";
import { PricePackageCollection } from "../../../api/PricePackageCollection";
import { useTracker } from "meteor/react-meteor-data";
import { StudioContext } from "./StudioContext";

// create context
export const PricePackageContext = React.createContext();

export const PricePackageProvider = ({ children }) => {
  const { selectedStudio } = useContext(StudioContext);

  const { pricePackages, isLoadingPricePackage } = useTracker(() => {
    const noDataAvailable = { pricePackages: [] };
    if (!Meteor.user() && !selectedStudio) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe(
      "pricePackage.getByStudio",
      selectedStudio?._id
    );

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const pricePackages = PricePackageCollection.find().fetch();

    return { pricePackages };
  });

  const value = useMemo(
    () => ({
      pricePackages,
    }),
    [pricePackages]
  );

  return (
    <PricePackageContext.Provider value={value}>
      {children}
    </PricePackageContext.Provider>
  );
};
