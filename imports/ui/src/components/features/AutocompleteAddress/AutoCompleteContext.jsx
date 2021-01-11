import React, { useState, useMemo } from "react";

// create context
export const AutocompleteContext = React.createContext();

const initialState = {
  formatted_address: "",
  address_parts: {},
  geo: {},
};

export const AutocompleteProvider = ({ children }) => {
  const [address, setAddress] = useState(initialState);

  const setAddressComponent = ({
    formatted_address,
    address_components,
    geometry: { location },
  }) => {
    const address_parts = {
      street_number: "",
      neighborhood: "",
      route: "",
      locality: "",
      administrative_area_level_3: "",
      administrative_area_level_2: "",
      administrative_area_level_1: "",
      country: "",
      postal_code: "",
    };

    const geo = {
      lat: "",
      lng: "",
    };

    if (address_components && formatted_address) {
      address_components.map((addr) => {
        address_parts[addr.types[0]] = addr.short_name;
      });

      console.log(location);

      geo["lat"] = location?.lat();
      geo["lng"] = location?.lng();

      setAddress({
        formatted_address,
        address_parts,
        geo,
      });
    }
  };

  const value = useMemo(
    () => ({
      address,
      setAddressComponent,
    }),
    [address]
  );

  return (
    <AutocompleteContext.Provider value={value}>
      {children}
    </AutocompleteContext.Provider>
  );
};
