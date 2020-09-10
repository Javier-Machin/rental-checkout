import React, { memo } from 'react';
import PropTypes from 'prop-types';
import '../css/NumericField.scss';

const NumericField = ({ name, min, max, disabled, label, defaultValue }) => {
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

NumericField.defaultProps = {
  min: 1,
  max: 10,
  disabled: false,
  label: '',
  defaultValue: null,
};

NumericField.propTypes = {
  name: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  defaultValue: PropTypes.number,
};

export default memo(NumericField);
