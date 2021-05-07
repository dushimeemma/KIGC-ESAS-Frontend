import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const assignCourse = (student_reg, course_id) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/assigned_course/assign', {
      student_reg,
      course_id,
    });
    dispatch({
      type: types.ASSIGN_COURSE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};
export const assignedStudents = (course_id) => async (dispatch) => {
  try {
    const res = await setAxios.get(`/api/assigned_course/${course_id}`);
    dispatch({
      type: types.ASSIGNED_STUDENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const getCourses = () => async (dispatch) => {
  dispatch(isLoading());
  try {
    const res = await setAxios.get('/api/course');
    dispatch({
      type: types.GET_COURSES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};
export const getCourse = (id) => async (dispatch) => {
  try {
    const res = await setAxios.get(`/api/course/${id}`);
    dispatch({
      type: types.GET_COURSE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};
export const createCourse = (course) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/course/create', course);
    dispatch({
      type: types.CREATE_COURSE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const clearCourses = () => async (dispatch) => {
  try {
    const res = await setAxios.get('/api/course/clean/courses');
    if (res) {
      setAxios.get('/api/assigned_course/clean/assigned-courses');
    }
    dispatch({
      type: types.CLEAR_COURSES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const assignCourseToClass = (values) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const res = await setAxios.post(
      '/api/assigned_course/assign-class',
      values
    );
    dispatch({
      type: types.ASSIGN_COURSE_TO_CLASS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const isLoading = () => {
  return {
    type: types.SET_LOADING,
  };
};
