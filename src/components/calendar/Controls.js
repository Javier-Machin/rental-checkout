import React from 'react';

const Controls = (props) => {
  const { handleCalendarArrowOnClick } = props;

  return (
    <div className="calendar__arrows">
      <button
        className="calendar__arrow"
        onClick={handleCalendarArrowOnClick}
        name="prev"
        type="button"
      >
        {'<'}
      </button>
      <button
        className="calendar__arrow"
        onClick={handleCalendarArrowOnClick}
        name="next"
        type="button"
      >
        {'>'}
      </button>
    </div>
  );
};

export default Controls;
