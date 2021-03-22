import { format, differenceInMinutes, addMinutes } from "date-fns";

const TIME_FORMAT = "kk:mm";

// convert time string to date object
export const timeToDate = (dateString, timeString) =>
  new Date(dateString + " " + timeString);

// convert date object to time string only
export const dateToTime = (date) => format(new Date(date), TIME_FORMAT);

//
export const getEachMinInterval = ({ dateString, start, end, interval }) => {
  if (interval <= 0)
    throw new Warning("Interval should have a value more than zero");

  const startTime = timeToDate(dateString, start);
  const endTime = timeToDate(dateString, end);

  const timeSlotsArr = [];

  do {
    if (!timeSlotsArr.length) {
      timeSlotsArr.push(startTime);
    } else {
      let nextInterval = addMinutes(
        timeSlotsArr[timeSlotsArr.length - 1],
        interval
      );
      timeSlotsArr.push(nextInterval);
    }
  } while (
    differenceInMinutes(endTime, timeSlotsArr[timeSlotsArr.length - 1]) >
    interval
  );

  return timeSlotsArr;
};

export const getEachMinIntervalString = ({ start, end, interval }) =>
  getEachMinInterval({ start, end, interval }).length
    ? getEachMinInterval({ start, end, interval }).map((date) =>
        dateToTime(date)
      )
    : [];

export const objectToDateString = ({ year, month, day }) =>
  `${year}-${month}-${day}`;

export const objectToDate = ({ year, month, day }) =>
  new Date(`${year}-${month}-${day}`);
