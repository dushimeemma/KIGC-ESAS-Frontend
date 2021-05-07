import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const getRoles = () => async (dispatch) => {
  dispatch(setRoleLoading());
  try {
    const res = await setAxios.get('/api/role/read');
    dispatch({
      type: types.GET_ROLES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const getRole = (id) => async (dispatch) => {
  try {
    const res = await setAxios.get(`/api/role/read/${id}`);
    dispatch({
      type: types.GET_ROLE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const assignRole = (newRole) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/role/assign', newRole);
    dispatch({
      type: types.ASSIGN_ROLE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const deleteRole = (id) => async (dispatch) => {
  try {
    const res = await setAxios.delete(`/api/role/delete/${id}`);
    dispatch({
      type: types.DELETE_ROLE,
      payload: {
        id,
        msg: res.data.msg,
      },
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const createRole = (role) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/role/create', role);
    dispatch({
      type: types.CREATE_ROLE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const updateRole = (role, id) => async (dispatch) => {
  try {
    const res = await setAxios.put(`/api/role/update/${id}`, role);
    dispatch({
      type: types.UPDATE_ROLE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const setRoleLoading = () => {
  return {
    type: types.SET_ROLES_LOADING,
  };
};
