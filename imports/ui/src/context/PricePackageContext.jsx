import React, { useContext, useMemo } from "react";
import { PricePackages } from "../../../api/services/pricePackages/models/PricePackageCollection";
import { useTracker } from "meteor/react-meteor-data";
import { StudioContext } from "./StudioContext";

// create context
export const PricePackageContext = React.createContext();

export const PricePackageProvider = ({ children }) => {
  const { studios } = useContext(StudioContext);

  const { pricePackages, isLoadingPricePackage } = useTracker(() => {
    const noDataAvailable = { pricePackages: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe(
      "pricePackage.getByStudio",
      studios?.[0]?._id
    );

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const pricePackages = PricePackages.find().fetch();

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
