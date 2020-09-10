// Helpers used across the app

const isInRange = (num, start, end) => {
  return num >= start && num <= end;
};

const addHoursToDate = (date, hours) => {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
};

const addMinutesToDate = (date, minutes) => {
  date.setTime(date.getTime() + minutes * 60 * 1000);
};

export { isInRange, addHoursToDate, addMinutesToDate };
