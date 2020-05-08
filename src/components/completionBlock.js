import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CompletionBlock = () => {
  const data = useSelector((state) => state.form);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="form__completion">
      <h2>&#10004;</h2>
      <p>Please verify your email address, you should have received an email from us already</p>
    </div>
  );
};

export default CompletionBlock;
