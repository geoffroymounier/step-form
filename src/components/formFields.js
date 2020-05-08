import React from 'react'
import Input from "./ui/input"
import Checkbox from "./ui/checkbox"
import { useDispatch, useSelector } from 'react-redux'
import { setValue, setError } from '../redux/actions'
const mapElement = {
  input : Input,
  checkbox : Checkbox
}
const FormFields = ({formStep}) => {
  const dispatch = useDispatch()
  const formValues = useSelector(state => state.form)
  const valueChanged = (id,value) => dispatch(setValue({[id] : value}))

  const fields = formStep.fields
  return (
    <div className='form__fields'>
      {fields.map(({field,label,id,required,extraProps} , index) => {
        if (!mapElement[field]) return null
        const MapedComponent = mapElement[field]
        return (
          <MapedComponent
            key={id}
            label={label}
            id={id}
            defaultValue={formValues[id]}
            required={required}
            changeValue = {valueChanged}
            extraProps={extraProps}
          />
        )
      })}
    </div>
  )
}

export default FormFields
