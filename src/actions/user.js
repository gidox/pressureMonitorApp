import {
  SET_USER,
} from '../constants';


export function setUserData(data) {
  return {
    type: SET_USER,
    data,
  };
}
