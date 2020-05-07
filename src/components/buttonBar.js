import React from 'react'
import { useSelector } from 'react-redux'

const ButtonBar = ({updateStep,lastStep,step}) => {
  const errors = useSelector(state => state.form.errorArray)
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
      {errors.map(({index,message}) =>
        (<div key={index}><p>{message}</p></div>)
      )}
      <div className={'form__buttons'}>
        {<button onClick={previousStep} className={step === 0 || step === lastStep ? 'hidden' : ''}>Previous</button>}
        {<button onClick={nextStep} type="submit" className={step === lastStep ? 'hidden' : ''}>Submit</button>}
      </div>
    </div>
  )
}

export default ButtonBar
