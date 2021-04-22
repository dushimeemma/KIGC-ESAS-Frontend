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
      console.log(error)
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


