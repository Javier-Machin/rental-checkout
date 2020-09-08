import React, { PureComponent } from 'react';
import '../../css/Calendar.scss';
import Header from './Header';
class Calendar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { selectedDate: new Date() };
  }

  renderCalendarBody() {
    const { selectedDate: date } = this.state;
    const cells = [];

    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);

    const tempDate = firstDayOfMonth;

    for (let row = 0; row < 5; row += 1) {
      for (let weekDay = 1; weekDay < 8; weekDay += 1) {
        const beforeFirstDay = row === 0 && weekDay < firstDayOfMonth.getDay();
        const pastLastDay = tempDate.getMonth() > month;

        if (beforeFirstDay || pastLastDay) {
          cells.push(<span key={`${row}${weekDay}`}>-</span>);
        } else {
          const tempDateValue = tempDate.getDate();
          cells.push(<span key={`${row}${weekDay}`}>{tempDateValue}</span>);
          tempDate.setDate(tempDateValue + 1);
        }
      }
    }

    return cells;
  }

  render() {
    const { selectedDate } = this.state;
    const currentMonthName = selectedDate.toLocaleString('default', {
      month: 'long',
    });

    return (
      <div className="calendar">
        <Header />
        <>{this.renderCalendarBody()}</>
      </div>
    );
  }
}

export default Calendar;
