import { types } from './types';
import setAxios from '../setUpAxios';
import { getErrors } from '../errors';

export const getStudents = () => async (dispatch) => {
  try {
    const res = await setAxios.get('/api/student');
    dispatch({
      type: types.GET_STUDENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const getStudentsPerDept = (department) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/student/single-class', department);
    dispatch({
      type: types.GET_STUDENTS_DEPT,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const getStudent = (id) => async (dispatch) => {
  try {
    const res = await setAxios.get(`/api/student/${id}`);
    dispatch({
      type: types.GET_STUDENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const updateStudent = (student, id) => async (dispatch) => {
  try {
    const res = await setAxios.put(`/api/student/${id}`, student);
    dispatch({
      type: types.UPDATE_STUDENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const createStudent = (student) => async (dispatch) => {
  try {
    const res = await setAxios.post('/api/student/create', student);
    dispatch({
      type: types.CREATE_STUDENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const clearStudents = () => async (dispatch) => {
  try {
    const res = await setAxios.get('/api/student/clean/students');
    dispatch({
      type: types.CLEAR_STUDENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    const res = await setAxios.delete(`/api/student/${id}`);
    dispatch({
      type: types.DELETE_STUDENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const searchStudents = (term) => async (dispatch) => {
  dispatch(isSearchingStudents());
  try {
    const res = await setAxios.get(`/api/student/search/students?term=${term}`);
    dispatch({
      type: types.SEARCH_STUDENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(getErrors(error.response.status, error.response.data));
  }
};

export const isSearchingStudents = () => {
  return {
    type: types.IS_SEARCHING_STUDENTS,
  };
};
