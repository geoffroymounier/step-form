import React from 'react';
import PropTypes from 'prop-types';

const StepBar = ({ formData, step }) => {
  const steps = formData.map((e) => e.name);
  return (
    <header className="form__navigation">
      {[...steps, 'Done'].map((name, i) => <div key={name} className={step === i ? 'active' : ''}>{name}</div>)}
    </header>
  );
};

StepBar.propTypes = {
  formData: PropTypes.arrayOf(PropTypes.object).isRequired,
  step: PropTypes.number.isRequired,
};

export default StepBar;
