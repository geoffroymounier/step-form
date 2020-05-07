import React from 'react'
import Input from "../ui/input"
import { useDispatch, useSelector } from 'react-redux'
import { setValue, setError } from '../redux/actions'
const mapElement = {
  input : Input
}
const FormFields = ({step,formData}) => {
  const dispatch = useDispatch()
  const formValues = useSelector(state => state.form.data)
  const errorArray = useSelector(state => state.form.errorArray)
  const valueChanged = (id,value,index) => {
    dispatch(setValue({[id] : value}))
  }
  const errorChanged = (index,message) => {
    dispatch(setError({index, message}))
  }

  const fields = formData[step].fields
  return (
    <>
      {fields.map(({type,label,id,required,extraProps} , index) => {
        const MapedComponent = mapElement[type]
        const isError = errorArray.findIndex(e => e.index === index) > -1
        return (
          <MapedComponent
            key={id}
            label={label}
            id={id}
            value={formValues[id]}
            isError={isError}
            index={index}
            required={required}
            changeValue = {valueChanged}
            changeError = {errorChanged}
            {...extraProps}
          />
        )
      })}
    </>
  )
}

export default FormFields
