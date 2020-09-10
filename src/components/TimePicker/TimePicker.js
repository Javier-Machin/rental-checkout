import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isInRange from '../../helpers';
import { validateHoursSelection } from './helpers';
import '../../css/TimePicker.scss';

// Let's pretend the service is open from 10:00 AM to 6:00 PM
const SHIFT_START_TIME = 10;

class TimePicker extends PureComponent {
  constructor(props) {
    super(props);

    this.handleHourFractionOnClick = this.handleHourFractionOnClick.bind(this);
    this.validateHoursSelection = validateHoursSelection.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  addHoursToDate(date, hours) {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  }

  handleHourFractionOnClick({ target }) {
    const isAvailable = target.className.includes('available');
    if (!isAvailable) return;

    const { setValidationErrors, selectedHours, setSelectedHours } = this.props;
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
      setSelectedHours(updatedSelectedHours);
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

  // eslint-disable-next-line class-methods-use-this
  checkHoursSelected(selectedhours, fractionNum) {
    if (!selectedhours) return false;

    return isInRange(
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
  checkHoursAvailability(selectedDate, hour, availableHours) {
    if (!selectedDate) return false;
    const month = selectedDate.getMonth();

    return availableHours.some((availabilityWindow) => {
      return (
        month === availabilityWindow.month &&
        isInRange(hour, availabilityWindow.from, availabilityWindow.to)
      );
    });
  }

  renderTimePickerBody() {
    const { availableHours, selectedDate, selectedHours } = this.props;

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
  selectedHours: null,
};

/*
  disabling eslint check for some props because it doesn't know 
  about our tidy helpers folder (:
*/

TimePicker.propTypes = {
  setValidationErrors: PropTypes.func.isRequired,
  setSelectedHours: PropTypes.func.isRequired,
  minHours: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  maxHours: PropTypes.number,
  availableHours: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedDate: PropTypes.object.isRequired,
  selectedHours: PropTypes.object,
};

export default TimePicker;
