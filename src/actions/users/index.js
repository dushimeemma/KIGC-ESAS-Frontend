import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const getUsers = () => async (dispatch) => {
  try {
    const res = await setAxios.get('/api/user/profile');
    dispatch({
      type: types.GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};
