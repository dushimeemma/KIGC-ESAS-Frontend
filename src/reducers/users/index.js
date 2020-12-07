import { types } from '../../actions/users/types';

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };

    default:
      return state;
  }
};
