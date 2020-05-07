import {SET_VALUE,SET_ERROR} from '../constants'

const initState = {
  data: {},
  errorArray : []
}

export default (state = initState, {type,payload}) => {
  switch (type) {
    case SET_VALUE: {
      return {
        ...state, data:{...state.data, ...payload}
      }
    }
    case SET_ERROR: {
      const {index,message} = payload
      const errorArray = [...state.errorArray]
      if (!message) {
        return {
          ...state, errorArray: errorArray.filter(e => e.index !== index)
        }
      } else {
        const errorIndex = errorArray.findIndex(e => e.index === index)
        if (errorIndex > -1) errorArray[errorIndex]= {index,message}
        else errorArray.push({index,message})
        return {
          ...state, errorArray
        }
      }
    }
    default:
      return state
  }
}
