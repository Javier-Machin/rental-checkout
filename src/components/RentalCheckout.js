import React, { PureComponent } from 'react';
import NumericField from './NumericField';
import '../css/RentalCheckout.scss';

class RentalCheckout extends PureComponent {
  render() {
    return (
      <aside className="rental-checkout">
        <form className="rental-checkout__form">
          <NumericField
            min="1"
            max="10"
            name="canoes"
            label="Number of Canoes:"
          />
          <NumericField
            min="1"
            max="10"
            name="canoes"
            label="Number of Canoes:"
          />
          <NumericField
            min="1"
            max="10"
            name="canoes"
            label="Number of Canoes:"
          />
          <NumericField
            min="1"
            max="10"
            name="canoes"
            label="Number of Canoes:"
          />
          <NumericField
            min="1"
            max="10"
            name="canoes"
            label="Number of Canoes:"
          />
          <NumericField
            min="1"
            max="10"
            name="canoes"
            label="Number of Canoes:"
          />
          <NumericField
            min="1"
            max="10"
            name="canoes"
            label="Number of Canoes:"
          />
          <NumericField
            min="1"
            max="10"
            name="canoes"
            label="Number of Canoes:"
          />
          <NumericField
            min="1"
            max="10"
            name="canoes"
            label="Number of Canoes:"
          />
          <NumericField
            min="1"
            max="10"
            name="canoes"
            label="Number of Canoes:"
          />
        </form>
      </aside>
    );
  }
}

export default RentalCheckout;
