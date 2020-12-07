import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const record = (attendance, id) => async (dispatch) => {
  try {
    const res = await setAxios.post(`/api/attendance/record/${id}`, attendance);
    dispatch({
      type: types.RECORD_ATTENDANCE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};
