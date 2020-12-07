import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const record = (finance, id) => async (dispatch) => {
  try {
    const res = await setAxios.post(`/api/finance/record/${id}`, finance);
    dispatch({
      type: types.RECORD_FINANCE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};
