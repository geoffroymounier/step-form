import {SET_VALUE, SET_ERROR} from '../constants'

export const setValue = payload => ({ type: SET_VALUE, payload });
export const setError = payload => ({ type: SET_ERROR, payload });
