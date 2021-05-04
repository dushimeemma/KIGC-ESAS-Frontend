import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const getRooms = () => async (dispatch) => {
  try {
    const res = await setAxios.get('/api/room');
    dispatch({
      type: types.GET_ROOMS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const assignRoom = (room_id, course_id) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/assigned_room/assign', {
      room_id,
      course_id,
    });
    dispatch({
      type: types.ASSIGN_ROOM,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const createRoom = (room) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/room/create', room);
    dispatch({
      type: types.CREATE_ROOM,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const clearRoom = () => async (dispatch) => {
  try {
    const res = await setAxios.get('/api/room/clean/rooms');
    dispatch({
      type: types.CLEAR_ROOM,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const getSingleRoom = (id) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const res = await setAxios.get(`/api/room/${id}`);
    dispatch({
      type: types.GET_ROOM,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const deleteRoom = (id) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const res = await setAxios.delete(`/api/room/${id}`);
    dispatch({
      type: types.DELETE_ROOM,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const isLoading = () => {
  return {
    type: types.ROOM_LOADING,
  };
};
