import setAxios from '../setUpAxios';
import { types } from './types';
import { getErrors } from '../errors';

export const createUser = (user) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/auth/signup', user);
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/auth/login', user);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/auth/logout');
    dispatch({
      type: types.LOGOUT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};
