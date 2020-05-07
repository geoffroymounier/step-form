import React from 'react'


const StepBar = ({formData,step}) => {
  const steps = formData.map(step => step.name)
  return (
    <header className="form__navigation">
      {[...steps,'Done'].map((name,i) => <div key={name} className={step === i ? 'active' : ''}>{name}</div>)}
    </header>
  )
}

export default StepBar
