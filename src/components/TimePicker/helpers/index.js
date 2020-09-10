// Helpers specific to the timepicker

// Let's pretend the service is open from 10:00 AM to 6:00 PM
const SHIFT_START_TIME = 10;
const SHIFT_END_TIME = 18;

function validateHoursSelection(updatedSelectedHours) {
  if (!updatedSelectedHours) return true;
  const { setValidationErrors } = this.props;

  const { minHours, maxHours } = this.props;
  const { from, to } = updatedSelectedHours;
  let errorMessage = '';

  const totalFractionsSelected = to.fractionNum - from.fractionNum;
  const totalHoursSelected = this.fractionsToBlocks(totalFractionsSelected);

  // Exceeds maximum booking time validation

  const exceedsMaxBookingTime = totalHoursSelected > maxHours;
  if (exceedsMaxBookingTime) {
    errorMessage = `Selection exceeds the maximum booking time, please select a time within ${maxHours} hours from the start`;
  }

  // Below minimum booking time validation

  const belowMinBookingTime = totalHoursSelected < minHours;
  if (belowMinBookingTime && !errorMessage) {
    errorMessage = `Selection is below the minimum booking time, please select a time ${minHours} hours from the start or more`;
  }

  // Exceeds opening hours validation

  const shiftEndDateObject = new Date();
  shiftEndDateObject.setMinutes(0);
  shiftEndDateObject.setHours(SHIFT_END_TIME);

  const fractionTime = this.fractionNumToTime(from.fractionNum);
  this.addHoursToDate(fractionTime, minHours);

  const exceedsShiftTime = fractionTime > shiftEndDateObject;

  if (exceedsShiftTime) {
    errorMessage = `Selection goes beyond opening hours, please select a start time ${minHours} hours earlier than ${SHIFT_END_TIME}:00`;
  }

  if (errorMessage) {
    setValidationErrors([errorMessage]);
    return false;
  }

  return true;
}

export { validateHoursSelection };
