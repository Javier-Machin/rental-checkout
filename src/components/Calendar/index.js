import React, { PureComponent } from 'react';
import Header from './Header';
import Controls from './Controls';
import { renderCalendarBody, currentMonthAndYear } from './helpers';
import '../../css/Calendar.scss';

class Calendar extends PureComponent {
  constructor(props) {
    super(props);
    this.renderCalendarBody = renderCalendarBody.bind(this);
    this.currentMonthAndYear = currentMonthAndYear.bind(this);
  }

  render() {
    const { handleCalendarArrowOnClick } = this.props;

    return (
      <div className="calendar">
        <p className="calendar__month-year">{this.currentMonthAndYear()}</p>
        <Controls handleCalendarArrowOnClick={handleCalendarArrowOnClick} />
        <div className="calendar__cells">
          <Header />
          <>{this.renderCalendarBody()}</>
        </div>
      </div>
    );
  }
}

export default Calendar;
