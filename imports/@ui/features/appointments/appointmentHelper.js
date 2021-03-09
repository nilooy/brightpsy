export const getTimeRanges = ({
  interval,
  locale = window.navigator.language,
  totalTime = 18,
  startsFrom = 9.4,
}) => {
  const ranges = [];
  const date = new Date();
  const format = {
    hour: "numeric",
    minute: "numeric",
  };

  totalTime *= 60;
  startsFrom *= 60;

  for (
    let minutes = startsFrom;
    minutes < totalTime;
    minutes = minutes + interval
  ) {
    date.setHours(0);
    date.setMinutes(minutes);
    ranges.push(date.toLocaleTimeString(locale, format));
  }

  return ranges;
};
