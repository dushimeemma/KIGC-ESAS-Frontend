import { types } from '../../actions/count/types';

const initialState = {
  numberOfStudents: '',
  numberOfRooms: '',
  numberOfCourses: '',
  isLoading: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COUNT_STUDENTS:
      return {
        ...state,
        isLoading: false,
        numberOfStudents: action.payload.number,
      };
    case types.GET_COUNT_ROOMS:
      return {
        ...state,
        isLoading: false,
        numberOfRooms: action.payload.number,
      };
    case types.GET_COUNT_COURSES:
      return {
        ...state,
        isLoading: false,
        numberOfCourses: action.payload.number,
      };
    case types.SET_COUNT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
