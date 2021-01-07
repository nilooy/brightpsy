import React, { useState, useMemo } from "react";

// create context
export const AutocompleteContext = React.createContext();

const initialState = {
  formatted_address: "",
  street_number: "",
  route: "",
  locality: "",
  administrative_area_level_1: "",
  country: "",
  postal_code: "",
  lat: 0,
  lng: 0,
};

export const AutocompleteProvider = ({ children }) => {
  const [address, setAddress] = useState(initialState);

  const setAddressComponent = ({ formatted_address, address_components }) => {
    if (address_components && formatted_address) {
      setAddress({
        ...address,
        formatted_address,
      });
    }
  };

  const setGeocode = ({ lat, lng }) => {
    if (lat && lng)
      setAddress({
        ...address,
        lat,
        lng,
      });
  };

  const value = useMemo(
    () => ({
      address,
      setAddressComponent,
      setGeocode,
    }),
    [address]
  );

  return (
    <AutocompleteContext.Provider value={value}>
      {children}
    </AutocompleteContext.Provider>
  );
};
