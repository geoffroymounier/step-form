import React , {useCallback, useMemo} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './ui/input';
import Checkbox from './ui/checkbox';
import { setValue } from '../redux/actions';
import '../styles/field.scss';

const mapElement = {
  input: Input,
  checkbox: Checkbox,
};
const FormFields = ({ formStep }) => {
  const dispatch = useDispatch();

  const valueChanged = (id, value) => dispatch(setValue({ [id]: value }));
  const { fields } = useMemo(() => formStep,[formStep]);
  return (
    <div className="form__fields">
      {fields.map(({
        field, label, id, required, extraProps,
      }) => {
        if (!mapElement[field]) return null;
        const MapedComponent = mapElement[field]; // we map the type of data with a ui component
        return (
          <MapedComponent
            key={id}
            label={label}
            id={id}
            required={required}
            changeValue={valueChanged}
            extraProps={extraProps} // extraProps is specific to each ui type (and so far only input uses it)
          />
        );
      })}
    </div>
  );
};

FormFields.propTypes = {
  formStep: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired,
};

export default FormFields;
