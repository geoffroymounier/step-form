import React, {useState} from 'react'
import formData from '../data/userForm.json'
import StepBar from '../components/stepBar'
import FormFields from '../components/formFields'
import ButtonBar from '../components/buttonBar'
import CompletionBlock from '../components/completionBlock'
import '../styles/header.scss'

const UserForm = ({}) => { // passing formData is on purpose here, we mihght to reuse this component with other data
  const [step,setStep] = useState(0)
  // useMemo(()=>{
  //
  // },[step])
  const updateStep = (flow) => setStep(step+flow)
  return (
    <section className={'form'}>
      <StepBar step={step} formData={formData} />
      {step < formData.length ?
        <form className={'form__container'} onSubmit={updateStep}>
        <FormFields step={step} formData={formData}/>
        <ButtonBar step={step} lastStep={formData.length} updateStep={updateStep}/>
      </form>
      :
      <CompletionBlock />
      }
    </section>

  )
}
export default UserForm