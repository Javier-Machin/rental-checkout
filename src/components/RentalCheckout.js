import React, { PureComponent } from 'react';
import NumericField from './NumericField';
import Calendar from './calendar';
import '../css/RentalCheckout.scss';

class RentalCheckout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { selectedDate: new Date() };
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <aside className="rental-checkout">
        <form className="rental-checkout__form">
          <div className="numeric-fields">
            <NumericField min="1" max="10" name="adults" label="Adults going" />
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
            <NumericField name="katakanus" label="Katakanu (4-6 people)" />
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
            availableDates={[
              { month: 8, from: 4, to: 10 },
              { month: 8, from: 24, to: 27 },
            ]}
          />
        </form>
      </aside>
    );
  }
}

export default RentalCheckout;
