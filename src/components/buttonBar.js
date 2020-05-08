import React from 'react'
import { useSelector } from 'react-redux'

const ButtonBar = ({formStep,updateStep,step}) => {
  const data = useSelector(state => state.form)
  const allFilled = formStep.fields.every(field => !field.required || !!data[field.id])

  const nextStep = (e) => {
    e.preventDefault()
    updateStep(1)
  }
  const previousStep = (e) => {
    e.preventDefault()
    updateStep(-1)
  }

  return (
    <div className='form__bottom-bar'>
      <div className={'form__buttons'}>
        {<button onClick={previousStep} className={step === 0 ? 'hidden' : ''}>Previous</button>}
        {<button onClick={nextStep} type="submit" disabled={!allFilled}>Submit</button>}
      </div>
    </div>
  )
}

export default ButtonBar
