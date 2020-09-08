import React, { PureComponent } from 'react';
import NumericField from './NumericField';
import Calendar from './calendar';
import '../css/RentalCheckout.scss';

class RentalCheckout extends PureComponent {
  render() {
    return (
      <aside className="rental-checkout">
        <form className="rental-checkout__form">
          <div className="numeric-fields">
            <NumericField min="1" max="10" name="adults" label="Adults going" />
            <NumericField
              min="1"
              max="10"
              name="kids"
              label="Under 16s going"
            />
            <NumericField
              min="1"
              max="10"
              name="canoes"
              label="Canoes (2 people)"
            />
            <NumericField
              min="1"
              max="10"
              name="canoe-price"
              label="Price per 1 hour"
              defaultValue="25.34"
              disabled
            />
            <NumericField
              min="1"
              max="10"
              name="double-sit"
              label="Double sit on top kayaks"
            />
            <NumericField
              min="1"
              max="10"
              name="double-sit-price"
              label="Price per 1 hour"
              defaultValue="25.34"
              disabled
            />
            <NumericField
              min="1"
              max="10"
              name="katakanus"
              label="Katakanu (4-6people)"
            />
            <NumericField
              min="1"
              max="10"
              name="katakanu-price"
              label="Price per 1 hour"
              defaultValue="25.34"
              disabled
            />
            <NumericField
              min="1"
              max="10"
              name="single-sit"
              label="Single sit on top kayaks"
            />
            <NumericField
              min="1"
              max="10"
              name="canoe-price"
              label="Price per 1 hour"
              defaultValue="25.34"
              disabled
            />
          </div>
          <Calendar />
        </form>
      </aside>
    );
  }
}

export default RentalCheckout;
