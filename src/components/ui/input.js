import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Input = ({
  id,
  label,
  required,
  changeValue,
  extraProps = {},
}) => {
  const [error, setError] = useState(null);
  const defaultValue = useSelector((state) => state.form[id]);
  const {
    regex, regexError, type, placeholder,
  } = extraProps;

  const onBlur = useCallback((e) => { // no need to alarm the user untill he has finished typing
    const { value } = e.target;
    let newError = null;
    if (!value && required) {
      newError = `${label} field is required`;
    } else if (regex && !((new RegExp(regex)).test(value))) {
      newError = regexError;
    }
    setError(newError);
  },[]);

  const onChange = useCallback((e) => {
    const { value } = e.target;
    if (
      (!value && required)
      || (regex && !(new RegExp(regex)).test(value))
    ) { // check the conditions
      // aiming for redux change only if currently stores a non null value (save calls)
      if (defaultValue) changeValue(id, null);
      return;
    }
    setError(null); // tell the user is right on track as soon as the input is correct again
    changeValue(id, value); // update redux
  },[]);

  return (
    <div className="form__field form__field--input">
      <label htmlFor={id} className="field__label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <br />
      <input
        id={id}
        type={type}
        name={id}
        autoComplete="on"
        className={`field__input ${error ? 'field__input--error' : ''}`}
        aria-label={label}
        aria-required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="form__error--item"><span>{error}</span></div>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  changeValue: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  extraProps: PropTypes.objectOf(PropTypes.string),
};
Input.defaultProps = {
  defaultValue: '',
  extraProps: {},
};

export default Input;
