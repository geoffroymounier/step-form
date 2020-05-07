import React from 'react'
import '../styles/inputs.scss'

const Input = ({
  placeholder,
  id,
  isError,
  label,
  index,
  regex,
  required,
  changeValue,
  value,
  changeError
}) => {
  const onBlur = (e) => {
    const {value} = e.target
    const error = (!value && required) ? `${label} field is required`
                  : regex && !((new RegExp(regex)).test(value)) ? 'regex Error'
                  : null
    if (error) changeError(index,error)
  }
  const onChange = (e) => {
    const {value} = e.target
    if ((!value && required )|| (regex && !(new RegExp(regex)).test(value))) {
      return changeValue(id,null)
    }
    changeError(index,null) // reset the error to null since the user has started to modify with correct value
    changeValue(id,value)
  }
  return (
    <div className='form__field'>
    <label htmlFor={id} className='field__label'>{label}{required && <span className="required">*</span>}</label>
      <input
        id={id}
        type="text"
        className={`field__input ${isError ? 'field__input--error' : ''}`}
        aria-label={label}
        aria-required={required}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
)}

export default Input
