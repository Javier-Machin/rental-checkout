import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  validateHoursSelection,
  updateHoursSelection,
  checkHoursSelected,
  checkHoursAvailability,
  SHIFT_START_TIME,
  SHIFT_END_TIME,
  HOUR_BLOCK_FRACTIONS,
} from './helpers';
import '../../css/TimePicker.scss';

class TimePicker extends PureComponent {
  constructor() {
    super();

    this.handleHourFractionOnClick = this.handleHourFractionOnClick.bind(this);
    this.updateHoursSelection = updateHoursSelection.bind(this);
    this.validateHoursSelection = validateHoursSelection.bind(this);
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

  renderTimePickerBody() {
    const { availableHours, selectedDate, selectedHours } = this.props;
    const hourBlocks = [];
    const shiftLength = SHIFT_END_TIME - SHIFT_START_TIME;
    let totalFractions = 0;

    for (let shiftHour = 0; shiftHour < shiftLength; shiftHour += 1) {
      const hourBlockFractions = [];

      for (
        let hourFraction = 0;
        hourFraction < HOUR_BLOCK_FRACTIONS;
        hourFraction += 1
      ) {
        const hour = `${SHIFT_START_TIME + shiftHour}`;
        const minutes = String(hourFraction).padEnd(2, '0');
        totalFractions += 1;

        const fractionClass = classnames({
          'time-picker__hour-fraction--with-offset': true,
          'time-picker__hour-fraction--available': checkHoursAvailability(
            selectedDate,
            hour,
            availableHours,
          ),
          'time-picker__hour-fraction--selected': checkHoursSelected(
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
  Disabling eslint check for some props because it doesn't know 
  about our tidy helpers folder (:
*/

/* eslint-disable react/no-unused-prop-types */

TimePicker.propTypes = {
  setValidationErrors: PropTypes.func.isRequired,
  setSelectedHours: PropTypes.func.isRequired,
  minHours: PropTypes.number,
  maxHours: PropTypes.number,
  availableHours: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedDate: PropTypes.object.isRequired,
  selectedHours: PropTypes.object,
};

export default TimePicker;
