import React, { PureComponent } from 'react';
import classnames from 'classnames';
import '../css/TimePicker.scss';

// Let's pretend the normal start time for the service is 10:00 AM
const SHIFT_START_TIME = 10;

class TimePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedHours: null,
    };

    this.handleHourFractionOnClick = this.handleHourFractionOnClick.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleHourFractionOnClick({ target }) {
    const isAvailable = target.className.includes('available');
    if (!isAvailable) return;

    const { selectedHours } = this.state;
    console.log(target.dataset.fractionnum);
    console.log(target.textContent);
    // Validate if it's going to exceed maximum booking time
    // (please select a time within {limitTime} hours from initial selection)

    // Validate if clicked time plus minimum booking time will exceed shift time
    // (please select a time at least {limitTime} hours earlier than 18:00)

    // Validate if between the start time and the clicked hour any non-available hours exist
    // (please select a time without unavailable hours in the middle)

    // const startSelection if offset set to target, otherwise to first in block hour
    // call selectHourFractions
    const fromFractionNum = target.dataset.fractionnum;

    if (!selectedHours) {
      const minFractions = this.blocksToFractions(2);
      const toFraction = Number(fromFractionNum) + Number(minFractions - 1);

      const updatedSelectedHours = {
        from: {
          fractionNum: fromFractionNum,
        },
        to: {
          fractionNum: toFraction,
        },
      };

      this.setState({
        selectedHours: updatedSelectedHours,
      });
    }
  }

  checkHoursSelected(selectedhours, fractionNum) {
    if (!selectedhours) return false;

    console.log(
      fractionNum,
      selectedhours.from.fractionNum,
      selectedhours.to.fractionNum,
    );

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
