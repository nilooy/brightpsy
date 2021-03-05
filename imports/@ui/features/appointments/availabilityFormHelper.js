import { useFieldArray } from "react-hook-form";

export const initialState = [
  { label: "Domenica", name: "sun" },
  { label: "Lunedì", name: "mon" },
  { label: "Martedi", name: "tue" },
  { label: "Mercoledi", name: "wed" },
  { label: "Giovedi", name: "thu" },
  { label: "Venerdi", name: "fri" },
  { label: "Sabato", name: "sat" },
];

export const getFieldState = (control) =>
  initialState.map((state) => ({
    ...state,
    fieldArr: useFieldArray({
      control,
      name: state.name + ".timeSlots",
    }),
  }));

export const tranformTimeToDateObject = (availabilitiesData) => {
  let availabilities = availabilitiesData;
  Object.keys(availabilitiesData).forEach((item) => {
    availabilities[item] = availabilitiesData[item];
    availabilities[item]["timeSlots"] = availabilitiesData[
      item
    ]?.timeSlots?.map((timeSlot) => ({
      from: new Date(new Date().toLocaleDateString() + " " + timeSlot.from),
      to: new Date(new Date().toLocaleDateString() + " " + timeSlot.to),
    }));
  });

  return availabilities;
};
