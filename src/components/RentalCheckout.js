import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NumericField from './NumericField';
import Calendar from './calendar';
import TimePicker from './TimePicker';

import '../css/RentalCheckout.scss';

class RentalCheckout extends Component {
  constructor(props) {
    super(props);
    const now = new Date();

    this.state = {
      selectedDate: null,
      selectedHours: null,
      calendarDate: now,
      calendarVisible: true,
      timePickerVisible: false,
      validationErrors: [],
    };

    this.handleCalendarCellOnClick = this.handleCalendarCellOnClick.bind(this);
    this.handleCalendarArrowOnClick = this.handleCalendarArrowOnClick.bind(
      this,
    );
    this.setValidationErrors = this.setValidationErrors.bind(this);
    this.setSelectedHours = this.setSelectedHours.bind(this);
  }

  setValidationErrors(errors) {
    this.setState({ validationErrors: errors });
  }

  setSelectedHours(selectedHours) {
    this.setState({ selectedHours });
  }

  handleCalendarCellOnClick({ target }) {
    const dateIsAvailable = target.className.includes('available');
    if (!dateIsAvailable) {
      this.setState({ selectedDate: null, timePickerVisible: false });
      return;
    }

    const { calendarDate } = this.state;
    const newSelectedDate = new Date();

    newSelectedDate.setFullYear(calendarDate.getFullYear());
    newSelectedDate.setMonth(calendarDate.getMonth());
    newSelectedDate.setDate(Number(target.name));

    this.setState({
      selectedDate: newSelectedDate,
      calendarVisible: false,
      timePickerVisible: true,
    });
  }

  handleCalendarArrowOnClick({ target }) {
    const { calendarDate } = this.state;

    if (target.name === 'prev') {
      calendarDate.setMonth(calendarDate.getMonth() - 1);
    } else {
      calendarDate.setMonth(calendarDate.getMonth() + 1);
    }

    this.setState({ calendarDate });
  }

  renderValidationErrors() {
    const { validationErrors } = this.state;

    return validationErrors.map((error) => {
      return (
        <p key={uuidv4()} className="rental-checkout__validation-error">
          {error}
        </p>
      );
    });
  }

  render() {
    const {
      selectedDate,
      selectedHours,
      calendarDate,
      calendarVisible,
      timePickerVisible,
    } = this.state;

    // TODO: implement form submission
    // TODO: add a few tests

    return (
      <aside className="rental-checkout">
        {this.renderValidationErrors()}
        <form className="rental-checkout__form">
          <div className="input-fields">
            <NumericField name="adults" label="Adults going" />
            <NumericField name="kids" label="Under 16s going" />
            <NumericField name="canoes" label="Canoes (2 people)" />
            <NumericField
              name="canoe-price"
              label="Price per 1 hour"
              defaultValue={25.34}
              max={100}
              disabled
            />
            <NumericField name="double-sit" label="Double sit on top kayaks" />
            <NumericField
              name="double-sit-price"
              label="Price per 1 hour"
              defaultValue={25.34}
              max={100}
              disabled
            />
            <NumericField name="katakanus" label="Katakanu (4 - 6 people)" />
            <NumericField
              name="katakanu-price"
              label="Price per 1 hour"
              defaultValue={25.34}
              max={100}
              disabled
            />
            <NumericField name="single-sit" label="Single sit on top kayaks" />
            <NumericField
              name="canoe-price"
              label="Price per 1 hour"
              defaultValue={25.34}
              max={100}
              disabled
            />
          </div>
          <Calendar
            selectedDate={selectedDate}
            calendarDate={calendarDate}
            calendarVisible={calendarVisible}
            handleCalendarCellOnClick={this.handleCalendarCellOnClick}
            handleCalendarArrowOnClick={this.handleCalendarArrowOnClick}
            availableDates={[
              { year: 2020, month: 8, from: 4, to: 10 },
              { year: 2020, month: 8, from: 24, to: 27 },
              { year: 2020, month: 9, from: 5, to: 9 },
            ]}
          />
          {timePickerVisible && (
            <TimePicker
              selectedDate={selectedDate}
              selectedHours={selectedHours}
              minHours={2}
              maxHours={3}
              setValidationErrors={this.setValidationErrors}
              setSelectedHours={this.setSelectedHours}
              availableHours={[
                { month: 8, from: 11, to: 15 },
                { month: 9, from: 12, to: 16 },
              ]}
            />
          )}
        </form>
      </aside>
    );
  }
}

export default RentalCheckout;
