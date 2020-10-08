import '@testing-library/jest-dom/extend-expect';
import {
  checkDateAvailability,
  currentMonthAndYear,
} from '../components/Calendar/helpers';
import { isInRange } from '../helpers';
import {
  blocksToFractions,
  fractionsToBlocks,
  fractionNumToTime,
  SHIFT_START_TIME,
} from '../components/TimePicker/helpers';

describe('#checkDateAvailability', () => {
  let date;
  let availableDates;

  describe('given a date within the availability range', () => {
    beforeAll(() => {
      date = new Date();
      date.setFullYear('2020');
      date.setMonth(8);
      date.setDate(26);

      availableDates = [
        { year: 2020, month: 8, from: 4, to: 10 },
        { year: 2020, month: 8, from: 24, to: 27 },
        { year: 2020, month: 9, from: 5, to: 7 },
      ];
    });

    test('it returns true', () => {
      expect(checkDateAvailability(date, availableDates)).toBe(true);
    });
  });

  describe('given a date outside the availability range', () => {
    beforeAll(() => {
      date = new Date();
    });

    test('it returns false', () => {
      expect(checkDateAvailability(date, availableDates)).toBe(false);
    });
  });
});

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

describe('#currentMonthAndYear', () => {
  let date;
  let props;

  beforeAll(() => {
    date = new Date();
    date.setMonth(9);
    date.setFullYear(2020);
    props = { calendarDate: date };
  });

  test('it returns the given date as a string with the month name and full year', () => {
    expect(currentMonthAndYear.call({ props })).toBe('October 2020');
  });
});

describe('#blocksToFractions', () => {
  test('it returns the expected number of fragments', () => {
    expect(blocksToFractions(1)).toBe(6);
  });
});

describe('#fractionsToBlocks', () => {
  test('it returns the expected number of blocks', () => {
    expect(fractionsToBlocks(6)).toBe(1.1666666666666667);
  });
});

describe('#fractionNumToTime', () => {
  test('it returns the expected date object', () => {
    expect(fractionNumToTime(7).getHours()).toBe(SHIFT_START_TIME + 1);
  });
});
