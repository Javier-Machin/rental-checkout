import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('App', () => {
  let app;
  let container;

  describe('Rental Checkout', () => {
    beforeEach(() => {
      app = render(<App />);
      container = app.container;
    });

    test('it renders a form', () => {
      screen.getByTestId('rental-checkout-form');
    });

    test('it renders a calendar', () => {
      const calendar = container.querySelector('.calendar');
      expect(calendar).not.toBe(null);
    });

    test('it renders a submit form button', () => {
      screen.findByDisplayValue('SUBMIT');
    });

    test('it renders a canoes field', () => {
      screen.findByLabelText('Canoes (2 people)');
    });

    test('it does not render a time picker initially', () => {
      expect(container.querySelector('.time-picker')).toBe(null);
    });

    // Example interacting with the app

    describe('after clicking on an available calendar day', () => {
      let availableDay;

      beforeEach(() => {
        [availableDay] = container.querySelectorAll(
          '.calendar__cell-btn--available',
        );

        fireEvent.click(availableDay);
      });

      test('it displays a time picker', () => {
        expect(container.querySelector('.time-picker')).not.toBe(null);
      });
    });

    describe('after selecting a valid time range in the time picker', () => {
      let availableDay;
      let availableTimeRangeStart;
      let availableTimeRangeEnd;

      beforeEach(() => {
        [availableDay] = container.querySelectorAll(
          '.calendar__cell-btn--available',
        );

        fireEvent.click(availableDay);

        [availableTimeRangeStart] = container.querySelectorAll(
          '.time-picker__hour-fraction--available',
        );
        // eslint-disable-next-line prefer-destructuring
        availableTimeRangeEnd = container.querySelectorAll(
          '.time-picker__hour-fraction--available',
        )[17];

        fireEvent.click(availableTimeRangeStart);
        fireEvent.click(availableTimeRangeEnd);
      });

      test('it selects the expected fractions', () => {
        const selectedFractions = container.querySelectorAll(
          '.time-picker__hour-fraction--selected',
        );

        expect(selectedFractions.length).toBe(18);
      });
    });

    describe('after selecting a time range exceeding the maximum booking time', () => {
      let availableDay;
      let availableTimeRangeStart;
      let availableTimeRangeEnd;

      beforeEach(() => {
        [availableDay] = container.querySelectorAll(
          '.calendar__cell-btn--available',
        );

        fireEvent.click(availableDay);

        [availableTimeRangeStart] = container.querySelectorAll(
          '.time-picker__hour-fraction--available',
        );
        // eslint-disable-next-line prefer-destructuring
        availableTimeRangeEnd = container.querySelectorAll(
          '.time-picker__hour-fraction--available',
        )[25];

        fireEvent.click(availableTimeRangeStart);
        fireEvent.click(availableTimeRangeEnd);
      });

      test('it displays a validation error with the expected message', () => {
        screen.findByText(
          'Selection exceeds the maximum booking time, please select a maximum of 3 hours',
        );
      });
    });

    describe('after selecting a time range below the minimum booking time', () => {
      let availableDay;
      let availableTimeRangeStart;
      let availableTimeRangeEnd;

      beforeEach(() => {
        [availableDay] = container.querySelectorAll(
          '.calendar__cell-btn--available',
        );

        fireEvent.click(availableDay);

        [availableTimeRangeStart] = container.querySelectorAll(
          '.time-picker__hour-fraction--available',
        );
        // eslint-disable-next-line prefer-destructuring
        availableTimeRangeEnd = container.querySelectorAll(
          '.time-picker__hour-fraction--available',
        )[6];

        fireEvent.click(availableTimeRangeStart);
        fireEvent.click(availableTimeRangeEnd);
      });

      test('it displays a validation error with the expected message', () => {
        screen.findByText(
          '`Selection is below the minimum booking time, please select a time 2 hours from the start or more',
        );
      });
    });
  });
});
