import React, { useContext, useEffect, useRef, useState } from "react";

import { Input, Label } from "@windmill/react-ui";
import { SearchIcon } from "@ui/assets/icons";
import { AutocompleteContext } from "./AutoCompleteContext";

const AutocompleteAddress = ({ className, icon, noForm }) => {
  const { address, setAddressComponent } = useContext(AutocompleteContext);

  const input = useRef();

  useEffect(() => {
    geocoder = new google.maps.Geocoder();
    autocomplete = new google.maps.places.Autocomplete(input.current, {
      types: ["geocode"],
    });
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(["address_component", "place_id"]);
    autocomplete.addListener("place_changed", fillInAddress);
  }, []);

  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy,
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();

    runGeoCode(place);
  }

  function runGeoCode(place) {
    geocoder.geocode({ placeId: place.place_id }, (results, status) => {
      // Address can be saved even if the geocode failed

      if (status !== "OK") {
        window.alert("Geocoder failed due to: " + status);
        return;
      }
      // update the state with context
      setAddressComponent(results[0]);
    });
  }

  const autocompleteInputElem = () => (
    <Label>
      {/* <!-- focus-within sets the color for the icon when input is focused --> */}
      <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
        <input
          ref={input}
          className="border block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          placeholder="Cerca psicologi vicino te"
          aria-label="Search"
          onFocus={geolocate}
          id="autocomplete"
          autoComplete={"" + Math.random()}
        />
        <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
          {icon}
        </div>
      </div>
    </Label>
  );

  if (noForm) return autocompleteInputElem();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {autocompleteInputElem()}
    </form>
  );
};

export default AutocompleteAddress;
