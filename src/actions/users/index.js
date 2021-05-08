import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const getUsers = () => async (dispatch) => {
  dispatch(setUsersLoading());
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

export const getUser = (id) => async (dispatch) => {
  dispatch(setUsersLoading());
  try {
    const res = await setAxios.get(`/api/user/profile/${id}`);
    dispatch({
      type: types.GET_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const setUsersLoading = () => {
  return {
    type: types.SET_USERS_LOADING,
  };
};
