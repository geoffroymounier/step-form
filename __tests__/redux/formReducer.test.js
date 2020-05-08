import formReducer from '@redux/reducers/formReducer'
import {SET_VALUE} from '@redux/constants'


describe('form reducer', () => {
  it('should return the initial state', () => {
    expect(formReducer(undefined, {})).toEqual({});
  });

  it('should handle SET_VALUE', () => {
    const startAction = {
      type: SET_VALUE,
      payload : {['email'] : 'luke@jedimaster.space'}
    };

    expect(formReducer({}, startAction)).toEqual({'email' : 'luke@jedimaster.space'});
  });
})
