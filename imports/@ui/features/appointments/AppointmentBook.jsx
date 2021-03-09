import React, { useEffect, useState } from "react";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import Grid from "@ui/components/Grid/Grid";
import { useAvailabilityByUserId } from "@ui/api-hooks/availability";
import { getEachMinIntervalString, objectToDate } from "@ui/utils/time";
import { getDay } from "date-fns";

const AppointmentBook = ({ doctorId }) => {
  const { data: availability } = useAvailabilityByUserId({ userId: doctorId });
  const [timeSlots, setTimeSlots] = useState([]);

  const today = utils().getToday();

  const [selectedDay, setSelectedDay] = useState(today);

  useEffect(() => {
    if (!selectedDay || !availability) return;
    const weekIndex = getDay(objectToDate(selectedDay));

    const dayByIndex = Object.keys(availability).find(
      (day) =>
        availability[day].dayIndex === weekIndex && availability[day].isEnabled
    );

    if (!dayByIndex) {
      setTimeSlots([]);
      return;
    }

    const selectedAval = { day: dayByIndex, ...availability[dayByIndex] };

    setTimeSlots([]);
    selectedAval?.timeSlots.forEach(({ from, to }) => {
      setTimeSlots((timeSl) => [
        ...timeSl,
        ...getEachMinIntervalString({
          start: from,
          end: to,
          interval: 40,
        }),
      ]);
    });
  }, [selectedDay]);

  console.log({ timeSlots });

  return (
    <div>
      <Grid className="text">
        <div className="flex justify-center h-3/6">
          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            calendarClassName="lg:text-base" // added this
            shouldHighlightWeekends
          />
        </div>
        <div className="flex flex-col overflow-scroll h-4/6">
          {timeSlots.length &&
            timeSlots.map((timeSlot) => (
              <button className="px-2 py-4 border text-lg  hover:bg-green-200 hover:text-green-700">
                {timeSlot}
              </button>
            ))}
        </div>
      </Grid>
    </div>
  );
};

export default AppointmentBook;
