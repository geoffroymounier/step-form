import React, {useState} from 'react'

const Input = ({
  id,
  label,
  required,
  changeValue,
  defaultValue,
  extraProps = {},
}) => {
  const [error,setError] = useState(null)
  const {regex, regexError, type, placeholder} = extraProps
  const onBlur = (e) => { // no need to alarm the user untill he has finished typing
    const {value} = e.target
    const error = (!value && required) ? `${label} field is required`
    : regex && !((new RegExp(regex)).test(value)) ? regexError
    : null
    setError(error)
  }
  const onChange = (e) => {
    const {value} = e.target
    if ((!value && required) || (regex && !(new RegExp(regex)).test(value))) { // check the conditions
      if (!!defaultValue) changeValue(id,null); // aiming for redux change only if currently stores a non null value (save calls)
      return
    }
    setError(null) // tell the user is right on track as soon as the input is correct again
    changeValue(id,value) // update redux
  }
  return (
    <div className='form__field'>
    <label htmlFor={id} className='field__label'>{label}{required && <span className="required">*</span>}</label><br />
      <input
        id={id}
        type={type}
        className={`field__input ${!!error ? 'field__input--error' : ''}`}
        aria-label={label}
        aria-required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className={'form__error--item'}><span>{error}</span></div>}
    </div>
)}

export default Input
