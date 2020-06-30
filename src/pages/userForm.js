import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import StepBar from '../components/stepBar';
import FormFields from '../components/formFields';
import ButtonBar from '../components/buttonBar';
import CompletionBlock from '../components/completionBlock';
import '../styles/form.scss';

// passing formData is on purpose here, we might want to reuse this component with other data
const UserForm = ({ formData }) => {
  const [step, setStep] = useState(0);
  const updateStep = (flow) => setStep(step + flow);
  return (
    <section className="form">
      <StepBar step={step} formData={formData} />
      {step < formData.length
        ? (
          <form className="form__container" onSubmit={updateStep}>
            <FormFields formStep={formData[step]} />
            <ButtonBar step={step} formStep={formData[step]} updateStep={updateStep} />
          </form>
        )
        : <CompletionBlock />}
    </section>

  );
};

UserForm.propTypes = {
  formData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserForm;
