import React, { useState } from 'react'

const Checkbox = ({
  id,
  label,
  required,
  changeValue,
  defaultValue
}) => {
  const [error,setError] = useState(null)
  const onChange = (e) => {
    const {checked} = e.target
    if (!checked && required) {
      setError(`${label} must be checked`)
      return changeValue(id,null)
    }
    setError(null)
    changeValue(id,checked)
  }
  return (
    <div className='form__field'>
    <label htmlFor={id} className='field__label'>{label}{required && <span className="required">*</span>}</label>
      <input
        id={id}
        type="checkbox"
        className={`field__checkbox ${!!error ? 'field__checkbox--error' : ''}`}
        aria-label={label}
        aria-required={required}
        defaultChecked={!!defaultValue}
        onChange={onChange}
      />
      {!!error && <div className={'form__error--item'}><span>{error}</span></div>}
    </div>
)}

export default Checkbox
