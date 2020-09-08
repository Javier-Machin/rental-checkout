import React, { PureComponent } from 'react';
import '../../css/Calendar.scss';
import Header from './Header';

class Calendar extends PureComponent {
  render() {
    return (
      <div className="calendar">
        <Header />
      </div>
    );
  }
}

export default Calendar;
