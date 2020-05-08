import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  id,
  label,
  required,
  changeValue,
  defaultValue,
}) => {
  const [error, setError] = useState(null);
  const onChange = (e) => {
    const { checked } = e.target;
    if (!checked && required) {
      setError(`${label} must be checked`);
      return changeValue(id, null);
    }
    setError(null);
    return changeValue(id, checked);
  };
  return (
    <div className="form__field form__field--checkbox">
      <input
        id={id}
        name={id}
        type="checkbox"
        className={`field__checkbox ${error ? 'field__checkbox--error' : ''}`}
        aria-label={label}
        defaultChecked={!!defaultValue}
        onChange={onChange}
      />
      <label htmlFor={id} className="field__label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      {!!error && <div className="form__error--item"><span>{error}</span></div>}
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  changeValue: PropTypes.func.isRequired,
  defaultValue: PropTypes.bool,
};
Checkbox.defaultProps = {
  defaultValue: false,
};

export default Checkbox;
