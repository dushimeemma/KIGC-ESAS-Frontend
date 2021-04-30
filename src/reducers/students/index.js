/* eslint-disable import/no-anonymous-default-export */
import { types } from "../../actions/students/types";

const initialState = {
  students: [],
  student: {},
  msg: "",
  updateSuccess: false,
  createSuccess: false,
  deleteSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STUDENTS:
      return {
        ...state,
        students: action.payload.students,
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
    case types.DELETE_STUDENT:
      return {
        ...state,
        msg: action.payload.msg,
        deleteSuccess: true,
      };
    default:
      return state;
  }
};
