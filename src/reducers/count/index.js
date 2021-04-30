import { types } from '../../actions/count/types';

const initialState = {
  numberOfStudents: '',
  numberOfRooms: '',
  numberOfCourses: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COUNT_STUDENTS:
      return {
        ...state,
        numberOfStudents: action.payload.number,
      };
    case types.GET_COUNT_ROOMS:
      return {
        ...state,
        numberOfRooms: action.payload.number,
      };
    case types.GET_COUNT_COURSES:
      return {
        ...state,
        numberOfCourses: action.payload.number,
      };
    default:
      return state;
  }
};
