import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const record = (course, id) => async (dispatch) => {
  try {
    const res = await setAxios.post(`/api/course/record/${id}`, course);
    dispatch({
      type: types.RECORD_COURSE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};
