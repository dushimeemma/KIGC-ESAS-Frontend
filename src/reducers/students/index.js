/* eslint-disable import/no-anonymous-default-export */
import { types } from '../../actions/students/types';

const initialState = {
  students: [],
  student: {},
  msg: '',
  updateSuccess: false,
  createSuccess: false,
  deleteSuccess: false,
  isSearchingStudents: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STUDENTS:
    case types.SEARCH_STUDENTS:
    case types.GET_STUDENTS_PER_ROOM:
      return {
        ...state,
        students: action.payload.students,
        isSearchingStudents: false,
      };
    case types.GET_STUDENTS_DEPT:
      return {
        ...state,
        students: action.payload.students,
      };
    case types.GET_STUDENT:
      return {
        ...state,
        student: action.payload.student,
      };
    case types.UPDATE_STUDENT:
      return {
        ...state,
        msg: action.payload.msg,
        updateSuccess: true,
      };
    case types.CREATE_STUDENT:
      return {
        ...state,
        msg: action.payload.msg,
        createSuccess: true,
      };
    case types.CLEAR_STUDENTS:
      return {
        ...state,
        msg: action.payload.message,
      };
    case types.DELETE_STUDENT:
      return {
        ...state,
        msg: action.payload.msg,
        deleteSuccess: true,
      };
    case types.IS_SEARCHING_STUDENTS:
      return {
        ...state,
        isSearchingStudents: true,
      };
    default:
      return state;
  }
};
