import React, { PureComponent } from 'react';
import classnames from 'classnames';
import '../css/TimePicker.scss';

// Let's pretend the normal start time for the service is 10:00 AM
const SHIFT_START_TIME = 10;

class TimePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.handleHourFractionOnClick = this.handleHourFractionOnClick.bind(this);
  }

  handleHourFractionOnClick({ target }) {
    console.log(target);
    console.log(this.props);
    // Validate if it's going to exceed maximum booking time
    // (please select a time within {limitTime} hours from initial selection)

    // Validate if clicked time plus minimum booking time will exceed shift time
    // (please select a time at least {limitTime} hours earlier than 18:00)

    // Validate if between the start time and the clicked hour any non-available hours exist
    // (please select a time without unavailable hours in the middle)

    // const startSelection if offset set to target, otherwise to first in block hour
    // call selectHourFractions
  }

  // selectHourFractions() {
  //   get all fractions
  //   filter all fractions with data-fractionNum smaller than selection
  //   loop as many tine times as minimum fractions required adding selected class

  // alt

  // on renderbody, look if the fragment we are going to add should be selected based on its index and our known select start
  // pass all of them together after creating all fragments to a function that will add the selected (dark green) while required > 0
  // (if fragments include start)

  // calculate required near the start of render
  // }
  // blocksToFractions()

  // eslint-disable-next-line class-methods-use-this
  isInRange(num, start, end) {
    return num >= start && num <= end;
  }

  // eslint-disable-next-line class-methods-use-this
  checkTimeAvailability(selectedDate, hour, availableHours) {
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

        const fractionClass = classnames({
          'time-picker__hour-fraction--with-offset': allowOffset,
          'time-picker__hour-fraction': !allowOffset,
          'time-picker__hour-fraction--available': this.checkTimeAvailability(
            selectedDate,
            hour,
            availableHours,
          ),
        });
        // implement available hours (light green)
        // render total selected in last selected
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

        totalFractions += 1;
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

export default TimePicker;
