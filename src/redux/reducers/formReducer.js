import { SET_VALUE } from '../constants';

const initState = {};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case SET_VALUE: {
      return {
        ...state, ...payload,
      };
    }
    default:
      return state;
  }
};
