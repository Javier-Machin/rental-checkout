import { addHoursToDate, isInRange } from '../../../helpers';

// Helpers specific to the timepicker

// Let's pretend the service is open from 10:00 AM to 6:00 PM
const SHIFT_START_TIME = 10;
const SHIFT_END_TIME = 18;

/*
  The number of fractions each block of 1 hours is split on
  An updated version would get this number from props passed to the timepicker
*/
const HOUR_BLOCK_FRACTIONS = 6;

// Simple but helps with readability
function blocksToFractions(blocks) {
  return blocks * 6;
}

function fractionsToBlocks(fractions) {
  return (fractions + 1) / 6;
}

function fractionNumToTime(fractionNum) {
  const tempDate = new Date();
  tempDate.setMinutes(0);
  tempDate.setHours(SHIFT_START_TIME);

  // Minutes in the provided fraction
  // - 1 to account for the 10 minutes of the last fraction
  const minutes = (fractionNum - 1) * 10;

  const fractionTime = new Date(tempDate.getTime() + minutes * 60000);
  return fractionTime;
}

function validateHoursSelection(updatedSelectedHours) {
  if (!updatedSelectedHours) return true;
  const { setValidationErrors } = this.props;

  const { minHours, maxHours } = this.props;
  const { from, to } = updatedSelectedHours;
  let errorMessage = '';

  const totalFractionsSelected = to.fractionNum - from.fractionNum;
  const totalHoursSelected = fractionsToBlocks(totalFractionsSelected);

  // Exceeds maximum booking time validation

  const exceedsMaxBookingTime = totalHoursSelected > maxHours;
  if (exceedsMaxBookingTime) {
    errorMessage = `Selection exceeds the maximum booking time, please select a maximum of ${maxHours} hours`;
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

  const fractionTime = fractionNumToTime(from.fractionNum);
  addHoursToDate(fractionTime, minHours);

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

function updateHoursSelection(selectingFractionNum, selectedHours) {
  const { minHours } = this.props;

  if (!selectedHours) {
    const minFractions = blocksToFractions(minHours);
    const toFraction = selectingFractionNum + minFractions - 1;

    return {
      from: {
        fractionNum: selectingFractionNum,
      },
      to: {
        fractionNum: toFraction,
      },
    };
  }

  // Detecting if we are setting start time, end time or deselecting

  const selectingCurrentStart =
    selectedHours.from.fractionNum === selectingFractionNum;

  if (selectingCurrentStart) {
    return null;
  }

  const selectingBeforeCurrentStart =
    selectedHours.from.fractionNum > selectingFractionNum;

  if (selectingBeforeCurrentStart) {
    return {
      from: {
        fractionNum: selectingFractionNum,
      },
      to: {
        fractionNum: selectedHours.to.fractionNum,
      },
    };
  }

  const selectingAfterCurrentStart =
    selectedHours.from.fractionNum < selectingFractionNum;

  if (selectingAfterCurrentStart) {
    return {
      from: {
        fractionNum: selectedHours.from.fractionNum,
      },
      to: {
        fractionNum: selectingFractionNum,
      },
    };
  }

  return null;
}

function checkHoursSelected(selectedhours, fractionNum) {
  if (!selectedhours) return false;

  return isInRange(
    fractionNum,
    selectedhours.from.fractionNum,
    selectedhours.to.fractionNum,
  );
}

function checkHoursAvailability(selectedDate, hour, availableHours) {
  if (!selectedDate) return false;
  const month = selectedDate.getMonth();

  return availableHours.some((availabilityWindow) => {
    return (
      month === availabilityWindow.month &&
      isInRange(hour, availabilityWindow.from, availabilityWindow.to)
    );
  });
}

export {
  validateHoursSelection,
  updateHoursSelection,
  fractionNumToTime,
  checkHoursSelected,
  checkHoursAvailability,
  SHIFT_START_TIME,
  SHIFT_END_TIME,
  HOUR_BLOCK_FRACTIONS,
};
