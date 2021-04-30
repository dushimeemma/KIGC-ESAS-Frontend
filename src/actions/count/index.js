import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const getCountStudents = () => async (dispatch) => {
  try {
    const res = await setAxios.get('/api/count/students');
    dispatch({
      type: types.GET_COUNT_STUDENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const getCountRooms = () => async (dispatch) => {
  try {
    const res = await setAxios.get('/api/count/rooms');
    dispatch({
      type: types.GET_COUNT_ROOMS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const getCountCourses = () => async (dispatch) => {
  try {
    const res = await setAxios.get('/api/count/courses');
    dispatch({
      type: types.GET_COUNT_COURSES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};
