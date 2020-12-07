import { types } from '../../actions/errors/types';

const initialState = {
  msg: {},
  status: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    case types.CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
      };
    default:
      return state;
  }
};
