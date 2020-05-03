import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => {
  const id = uuidv4()
  return {
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  }
};