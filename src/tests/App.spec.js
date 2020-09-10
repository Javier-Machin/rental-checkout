import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import { isInRange } from '../helpers';

describe('App', () => {
  let app;
  let container;

  // Example testing with testing-library

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
  });

  // Example testing with just jest

  describe('#isInRange', () => {
    describe('given a value in range', () => {
      test('it returns true', () => {
        expect(isInRange(5, 1, 10)).toBe(true);
      });
    });

    describe('given a value not in range', () => {
      test('it returns false', () => {
        expect(isInRange(5, 6, 10)).toBe(false);
      });
    });
  });
});
