import {
  SET_USER,
} from '../constants';

const initialState = {
  isFetching: false,
  data: {},
  error: false,

};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
