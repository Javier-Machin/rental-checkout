import React from 'react';
import classnames from 'classnames';

function isInRange(num, start, end) {
  return num >= start && num <= end;
}

function checkDateAvailability(date, availableDates) {
  return availableDates.some((availabilityWindow) => {
    const month = date.getMonth();
    const day = date.getDate();

    return (
      month === availabilityWindow.month &&
      isInRange(day, availabilityWindow.from, availabilityWindow.to)
    );
  });
}

function renderCalendarBody() {
  const { selectedDate: date, availableDates } = this.props;
  const cells = [];

  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1);

  // We keep updating this date as we loop through the days of the month
  const tempDate = firstDayOfMonth;

  for (let row = 0; row < 5; row += 1) {
    for (let weekDay = 1; weekDay < 8; weekDay += 1) {
      const beforeFirstDay = row === 0 && weekDay < firstDayOfMonth.getDay();
      const pastLastDay = tempDate.getMonth() > month;

      if (beforeFirstDay || pastLastDay) {
        cells.push(
          <span className="calendar__empty-cell" key={`${row}${weekDay}`}>
            -
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
            onClick={this.handleCellOnClick}
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
  const { selectedDate } = this.props;

  const year = selectedDate.getFullYear();
  const monthName = selectedDate.toLocaleString('default', {
    month: 'long',
  });

  return `${monthName} ${year}`;
}

export { renderCalendarBody, currentMonthAndYear };
