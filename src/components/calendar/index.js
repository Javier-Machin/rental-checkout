import React, { PureComponent } from 'react';
import '../../css/Calendar.scss';
import Header from './Header';
import { renderCalendarBody, currentMonthAndYear } from './helpers';

class Calendar extends PureComponent {
  constructor(props) {
    super(props);
    this.renderCalendarBody = renderCalendarBody.bind(this);
    this.currentMonthAndYear = currentMonthAndYear.bind(this);
    this.handleCellOnClick = this.handleCellOnClick.bind(this);
  }

  handleCellOnClick({ target }) {
    const { selectedDate } = this.props;
    console.log('clicked on day ', target.name);
  }

  render() {
    return (
      <div className="calendar">
        <p className="calendar__month-year">{this.currentMonthAndYear()}</p>
        <div className="calendar__cells">
          <Header />
          <>{this.renderCalendarBody()}</>
        </div>
      </div>
    );
  }
}

export default Calendar;
