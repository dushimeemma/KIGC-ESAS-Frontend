import { types } from '../../actions/users/types';

const initialState = {
  users: [],
  isLoading: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.users,
      };
    case types.SET_USERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
