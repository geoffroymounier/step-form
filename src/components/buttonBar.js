import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ButtonBar = ({ formStep, updateStep, step }) => {
  const data = useSelector((state) => state.form);
  const allFilled = formStep.fields.every((field) => !field.required || !!data[field.id]);

  const nextStep = (e) => {
    e.preventDefault();
    updateStep(1);
  };
  const previousStep = (e) => {
    e.preventDefault();
    updateStep(-1);
  };

  return (
    <div className="form__bottom-bar">
      <div className="form__buttons">
        <button onClick={previousStep} type="button" className={step === 0 ? 'hidden' : ''}>Previous</button>
        <button onClick={nextStep} type="submit" disabled={!allFilled}>Submit</button>
      </div>
    </div>
  );
};

ButtonBar.propTypes = {
  formStep: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired,
  step: PropTypes.number.isRequired,
  updateStep: PropTypes.func.isRequired,
};

export default ButtonBar;
