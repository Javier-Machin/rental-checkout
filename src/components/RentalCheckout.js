import React, { Component } from 'react';
import NumericField from './NumericField';
import Calendar from './calendar';
import '../css/RentalCheckout.scss';

class RentalCheckout extends Component {
  constructor(props) {
    super(props);
    const now = new Date();

    this.state = {
      selectedDate: null,
      calendarDate: now,
      calendarVisible: true,
      timePickerVisible: false,
    };

    this.handleCalendarCellOnClick = this.handleCalendarCellOnClick.bind(this);
    this.handleCalendarArrowOnClick = this.handleCalendarArrowOnClick.bind(
      this,
    );
  }

  handleCalendarCellOnClick({ target }) {
    const dateIsAvailable = target.className.includes('available');
    if (!dateIsAvailable) return;

    const { calendarDate } = this.state;
    const newSelectedDate = new Date();

    newSelectedDate.setFullYear(calendarDate.getFullYear());
    newSelectedDate.setMonth(calendarDate.getMonth());
    newSelectedDate.setDate(Number(target.name));

    this.setState({ selectedDate: newSelectedDate });
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

  render() {
    const { selectedDate, calendarDate } = this.state;

    return (
      <aside className="rental-checkout">
        <form className="rental-checkout__form">
          <div className="input-fields">
            <NumericField name="adults" label="Adults going" />
            <NumericField name="kids" label="Under 16s going" />
            <NumericField name="canoes" label="Canoes (2 people)" />
            <NumericField
              name="canoe-price"
              label="Price per 1 hour"
              defaultValue="25.34"
              disabled
            />
            <NumericField name="double-sit" label="Double sit on top kayaks" />
            <NumericField
              name="double-sit-price"
              label="Price per 1 hour"
              defaultValue="25.34"
              disabled
            />
            <NumericField name="katakanus" label="Katakanu (4 - 6 people)" />
            <NumericField
              name="katakanu-price"
              label="Price per 1 hour"
              defaultValue="25.34"
              disabled
            />
            <NumericField name="single-sit" label="Single sit on top kayaks" />
            <NumericField
              name="canoe-price"
              label="Price per 1 hour"
              defaultValue="25.34"
              disabled
            />
          </div>
          <Calendar
            selectedDate={selectedDate}
            calendarDate={calendarDate}
            handleCalendarCellOnClick={this.handleCalendarCellOnClick}
            handleCalendarArrowOnClick={this.handleCalendarArrowOnClick}
            availableDates={[
              { year: 2020, month: 8, from: 4, to: 10 },
              { year: 2020, month: 8, from: 24, to: 27 },
              { year: 2020, month: 9, from: 5, to: 9 },
            ]}
          />
        </form>
      </aside>
    );
  }
}

export default RentalCheckout;
