import React, { useEffect, useState } from "react";

const initialState = {
  street_number: "",
  route: "",
  locality: "",
  administrative_area_level_1: "",
  country: "",
  postal_code: "",
  lat: 0,
  lng: 0,
};

const AutocompleteAddress = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    geocoder = new google.maps.Geocoder();
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      { types: ["geocode"] }
    );
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(["address_component", "place_id"]);
    autocomplete.addListener("place_changed", fillInAddress);
  }, []);

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();

    console.log("place", place);
    runGeoCode(place.place_id);

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (const component of place.address_components) {
      const addressType = component.types[0];

      const val = component[state[addressType]];
      setState({ ...state, [addressType]: val });
    }
  }

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

  function runGeoCode(placeId) {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== "OK") {
        window.alert("Geocoder failed due to: " + status);
        return;
      }
      console.log(results);
      setState({
        ...state,
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      });
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        id="autocomplete"
        placeholder="Enter your address"
        onFocus={geolocate}
        type="text"
        autoComplete="new-password"
      />
    </form>
  );
};

export default AutocompleteAddress;
