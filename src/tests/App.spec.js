import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('App', () => {
  beforeAll(() => {});

  describe('home page', () => {
    beforeEach(() => {
      render(<App />);
    });

    test('it renders a form', () => {
      screen.getByTestId('test-id');
    });
  });
});
