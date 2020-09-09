import React, { PureComponent } from 'react';
import '../css/TimePicker.scss';

class TimePicker extends PureComponent {
  render() {
    return (
      <div className="time-picker">
        <div className="time-picker__hour-block">10:00</div>
        <div className="time-picker__hour-block">11:00</div>
        <div className="time-picker__hour-block">12:00</div>
        <div className="time-picker__hour-block">13:00</div>
        <div className="time-picker__hour-block">14:00</div>
        <div className="time-picker__hour-block">15:00</div>
        <div className="time-picker__hour-block">16:00</div>
        <div className="time-picker__hour-block">17:00</div>
      </div>
    );
  }
}

export default TimePicker;
