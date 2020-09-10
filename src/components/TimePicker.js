import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import '../css/TimePicker.scss';

// Let's pretend the normal start time for the service is 10:00 AM
const SHIFT_START_TIME = 10;

class TimePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedHours: null,
      validationErrors: [],
    };

    this.handleHourFractionOnClick = this.handleHourFractionOnClick.bind(this);
    this.validateHoursSelection = this.validateHoursSelection.bind(this);
    this.renderValidationErrors = this.renderValidationErrors.bind(this);
  }

  validateHoursSelection(updatedSelectedHours) {
    if (!updatedSelectedHours) return true;
    const { minHours = 2, maxHours = 3 } = this.props;
    let errorMessage = '';

    const totalFractionsSelected =
      updatedSelectedHours.to.fractionNum -
      updatedSelectedHours.from.fractionNum;

    const totalHoursSelected = this.fractionsToBlocks(totalFractionsSelected);

    const exceedsMaxBookingTime = totalHoursSelected > maxHours;
    const belowMinBookingTime = totalHoursSelected < minHours;

    if (exceedsMaxBookingTime) {
      errorMessage = `Selection exceeds the maximum booking time, please select a time within ${maxHours} hours from the start`;
    }

    if (belowMinBookingTime && !errorMessage) {
      errorMessage = `Selection is below the minimum booking time, please select a time ${minHours} hours from the start or more`;
    }

    if (errorMessage) {
      this.setState({ validationErrors: [errorMessage] });
      return false;
    }

    return true;
  }

  handleHourFractionOnClick({ target }) {
    const isAvailable = target.className.includes('available');
    if (!isAvailable) return;

    const { selectedHours } = this.state;
    const selectingFractionNum = Number(target.dataset.fractionnum);

    // TODO: Validate if clicked time is start time and if it plus minimum booking time will exceed shift time
    // (please select a time at least {limitTime} hours earlier than 18:00)

    // TODO: Validate if between the start time and the clicked hour any non-available hours exist
    // (please select a time without unavailable hours in the middle)

    // TODO: const startSelection if offset set to target, otherwise to first in block hour

    const updatedSelectedHours = this.updateHoursSelection(
      selectingFractionNum,
      selectedHours,
    );

    const selectedHoursAreValid = this.validateHoursSelection(
      updatedSelectedHours,
    );

    if (selectedHoursAreValid) {
      this.setState({
        selectedHours: updatedSelectedHours,
        validationErrors: [],
      });
    }
  }

  updateHoursSelection(selectingFractionNum, selectedHours) {
    const { minHours = 2 } = this.props;

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
    return fractions / 6;
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
    const { selectedHours } = this.state;

    const {
      availableHours = [
        { month: 8, from: 11, to: 15 },
        { month: 9, from: 12, to: 16 },
      ],
      minHours = 2,
      maxHours = 4,
      allowOffset = true,
      selectedDate,
    } = this.props;

    const hourBlocks = [];
    let totalFractions = 0;

    for (let shiftHour = 0; shiftHour < 8; shiftHour += 1) {
      const hourBlockFractions = [];

      for (let hourFraction = 0; hourFraction < 6; hourFraction += 1) {
        const hour = `${SHIFT_START_TIME + shiftHour}`;
        const minutes = String(hourFraction).padEnd(2, '0');
        totalFractions += 1;

        const fractionClass = classnames({
          'time-picker__hour-fraction--with-offset': allowOffset,
          'time-picker__hour-fraction': !allowOffset,
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

        //  TODO: render total selected in last selected (if this index is equal to last in selected range add total span)

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
  // TODO: move to RentalCheckout, make fixed

  renderValidationErrors() {
    const { validationErrors } = this.state;

    return validationErrors.map((error, index) => {
      return (
        <p key={uuidv4()} className="rental-checkout__validation-error">
          {error}
        </p>
      );
    });
  }

  // TODO: render errors

  render() {
    return (
      <div className="time-picker">
        {this.renderValidationErrors()}
        {this.renderTimePickerBody()}
      </div>
    );
  }
}

export default TimePicker;
