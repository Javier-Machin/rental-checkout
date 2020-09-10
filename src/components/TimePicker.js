import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import '../css/TimePicker.scss';

// Let's pretend the service is open from 10:00 AM to 6:00 PM
const SHIFT_START_TIME = 10;
const SHIFT_END_TIME = 18;

class TimePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedHours: null,
    };

    this.handleHourFractionOnClick = this.handleHourFractionOnClick.bind(this);
    this.validateHoursSelection = this.validateHoursSelection.bind(this);
  }

  validateHoursSelection(updatedSelectedHours) {
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

  // eslint-disable-next-line class-methods-use-this
  addHoursToDate(date, hours) {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  }

  handleHourFractionOnClick({ target }) {
    const { setValidationErrors } = this.props;
    const isAvailable = target.className.includes('available');
    if (!isAvailable) return;

    const { selectedHours } = this.state;
    const selectingFractionNum = Number(target.dataset.fractionnum);

    const updatedSelectedHours = this.updateHoursSelection(
      selectingFractionNum,
      selectedHours,
    );

    const selectedHoursAreValid = this.validateHoursSelection(
      updatedSelectedHours,
    );

    if (selectedHoursAreValid) {
      setValidationErrors([]);
      this.setState({
        selectedHours: updatedSelectedHours,
      });
    }
  }

  updateHoursSelection(selectingFractionNum, selectedHours) {
    const { minHours } = this.props;

    if (!selectedHours) {
      const minFractions = this.blocksToFractions(minHours);
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

  // eslint-disable-next-line class-methods-use-this
  fractionNumToTime(fractionNum) {
    const tempDate = new Date();
    tempDate.setMinutes(0);
    tempDate.setHours(SHIFT_START_TIME);

    // Minutes in the provided fraction
    // - 1 to account for the 10 minutes of the last fraction
    const minutes = (fractionNum - 1) * 10;

    const fractionTime = new Date(tempDate.getTime() + minutes * 60000);
    return fractionTime;
  }

  checkHoursSelected(selectedhours, fractionNum) {
    if (!selectedhours) return false;

    return this.isInRange(
      fractionNum,
      selectedhours.from.fractionNum,
      selectedhours.to.fractionNum,
    );
  }

  // Simple but helps with readability
  // eslint-disable-next-line class-methods-use-this
  blocksToFractions(blocks) {
    return blocks * 6;
  }

  // Simple but helps with readability
  // eslint-disable-next-line class-methods-use-this
  fractionsToBlocks(fractions) {
    return (fractions + 1) / 6;
  }

  // eslint-disable-next-line class-methods-use-this
  isInRange(num, start, end) {
    return num >= start && num <= end;
  }

  // eslint-disable-next-line class-methods-use-this
  checkHoursAvailability(selectedDate, hour, availableHours) {
    if (!selectedDate) return false;
    const month = selectedDate.getMonth();

    return availableHours.some((availabilityWindow) => {
      return (
        month === availabilityWindow.month &&
        this.isInRange(hour, availabilityWindow.from, availabilityWindow.to)
      );
    });
  }

  renderTimePickerBody() {
    // TODO move to RentalCheckout
    const { selectedHours } = this.state;
    const { availableHours, selectedDate } = this.props;

    const hourBlocks = [];
    let totalFractions = 0;

    for (let shiftHour = 0; shiftHour < 8; shiftHour += 1) {
      const hourBlockFractions = [];

      for (let hourFraction = 0; hourFraction < 6; hourFraction += 1) {
        const hour = `${SHIFT_START_TIME + shiftHour}`;
        const minutes = String(hourFraction).padEnd(2, '0');
        totalFractions += 1;

        const fractionClass = classnames({
          'time-picker__hour-fraction--with-offset': true,
          'time-picker__hour-fraction--available': this.checkHoursAvailability(
            selectedDate,
            hour,
            availableHours,
          ),
          'time-picker__hour-fraction--selected': this.checkHoursSelected(
            selectedHours,
            totalFractions,
          ),
        });

        hourBlockFractions.push(
          <button
            key={totalFractions}
            data-fractionnum={totalFractions}
            className={fractionClass}
            onClick={this.handleHourFractionOnClick}
            type="button"
          >
            <span className="hour-fraction__text">{`${hour}:${minutes}`}</span>
          </button>,
        );
      }

      hourBlocks.push(
        <div key={shiftHour} className="time-picker__hour-block">
          {hourBlockFractions}
        </div>,
      );
    }

    return hourBlocks;
  }

  render() {
    return <div className="time-picker">{this.renderTimePickerBody()}</div>;
  }
}

TimePicker.defaultProps = {
  minHours: 2,
  maxHours: 4,
};

TimePicker.propTypes = {
  setValidationErrors: PropTypes.func.isRequired,
  minHours: PropTypes.number,
  maxHours: PropTypes.number,
  availableHours: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedDate: PropTypes.object.isRequired,
};

export default TimePicker;
