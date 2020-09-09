import React, { memo } from 'react';
import '../css/NumericField.scss';

const NumericField = ({
  name,
  min = 1,
  max = 10,
  disabled,
  label,
  defaultValue,
}) => {
  return (
    <div className="numeric-field">
      <label className="numeric-field__label" htmlFor={name}>
        {label}
        <input
          className="numeric-field__input"
          type="number"
          disabled={disabled}
          defaultValue={defaultValue}
          min={min}
          max={max}
          name={name}
          id={name}
        />
      </label>
    </div>
  );
};

// prop defaults

// prop validation

export default memo(NumericField);
