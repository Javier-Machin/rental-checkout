import React from 'react';
import classnames from 'classnames';

function isInRange(num, start, end) {
  return num >= start && num <= end;
}

function checkDateAvailability(date, availableDates) {
  return availableDates.some((availabilityWindow) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return (
      year === availabilityWindow.year &&
      month === availabilityWindow.month &&
      isInRange(day, availabilityWindow.from, availabilityWindow.to)
    );
  });
}

function renderCalendarBody() {
  const { calendarDate: date, availableDates, handleCellOnClick } = this.props;
  const cells = [];

  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1);

  // We keep updating this date as we loop through the days of the month
  const tempDate = firstDayOfMonth;

  for (let row = 0; row < 6; row += 1) {
    for (let weekDay = 1; weekDay < 8; weekDay += 1) {
      const beforeFirstDay = row === 0 && weekDay < firstDayOfMonth.getDay();
      const pastLastDay =
        tempDate.getMonth() > month || tempDate.getFullYear() > year;

      if (beforeFirstDay || pastLastDay) {
        cells.push(
          <span className="calendar__empty-cell" key={`${row}${weekDay}`}>
            &nbsp;
          </span>,
        );
      } else {
        const tempDateValue = tempDate.getDate();
        const cellClasses = classnames({
          'calendar__cell-btn': true,
          'calendar__cell-btn--available': checkDateAvailability(
            tempDate,
            availableDates,
          ),
        });

        cells.push(
          <button
            className={cellClasses}
            type="button"
            onClick={handleCellOnClick}
            name={tempDateValue}
            key={`${row}${weekDay}`}
          >
            {tempDateValue}
          </button>,
        );
        tempDate.setDate(tempDateValue + 1);
      }
    }
  }

  return cells;
}

function currentMonthAndYear() {
  const { calendarDate } = this.props;

  const year = calendarDate.getFullYear();
  const monthName = calendarDate.toLocaleString('default', {
    month: 'long',
  });

  return `${monthName} ${year}`;
}

export { renderCalendarBody, currentMonthAndYear };
