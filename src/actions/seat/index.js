import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const assign = (seat, id) => async (dispatch) => {
  try {
    const res = await setAxios.post(`/api/seat/assign/${id}`, seat);
    dispatch({
      type: types.ASSIGN_SEAT,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const viewSeat = (regNo) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/seat/view', regNo);
    dispatch({
      type: types.VIEW_SEAT,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};
