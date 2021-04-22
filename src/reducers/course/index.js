/* eslint-disable import/no-anonymous-default-export */
import { types } from "../../actions/course/types";

const initialState = {
  msg: "",
  courses: [],
  course: {},
  assignSuccess: false,
  createSuccess: false,
  assignedStudents: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.ASSIGN_COURSE:
      return {
        ...state,
        msg: action.payload.msg,
        assignSuccess: true,
      };

    case types.CREATE_COURSE:
      return {
        ...state,
        msg: action.payload.message,
        createSuccess: true,
      };

    case types.GET_COURSES:
      return {
        ...state,
        msg: action.payload.message,
        courses: action.payload.courses,
      };
    case types.GET_COURSE:
      return {
        ...state,
        msg: action.payload.message,
        course: action.payload.course,
      };

    case types.ASSIGNED_STUDENT:
      return {
        ...state,
        assignedStudents: action.payload.assigned_course,
        msg: action.payload.message
      }

    default:
      return state;
  }
};
