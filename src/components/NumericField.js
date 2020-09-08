import React, { memo } from 'react';
import '../css/NumericField.scss';

const NumericField = ({ name, min, max, disabled, label }) => {
  return (
    <div className="numeric-field">
      <label className="numeric-field__label" htmlFor={name}>
        {label}
        <input
          className="numeric-field__input"
          type="number"
          disabled={disabled}
          min={min}
          max={max}
          name={name}
          id={name}
        />
      </label>
    </div>
  );
};

export default memo(NumericField);
