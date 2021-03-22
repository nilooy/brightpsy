import { availabilityDays } from "./AvailabilityCollection";
import { Random } from "meteor/random";

const defaultTimeSlot = () => [
  { from: "09:00", to: "13:00" },
  { from: "14:00", to: "06:00" },
];
const defaultTimeZone = "Europe/Rome";

const defaultAvailabilityData = {};

availabilityDays.forEach((day, index) => {
  defaultAvailabilityData.timeZone = defaultTimeZone;
  defaultAvailabilityData[day] = {
    dayIndex: index,
    timeSlots: defaultTimeSlot(),
    isEnabled: true,
  };
});

export { defaultAvailabilityData };
