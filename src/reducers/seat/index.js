import { types } from '../../actions/seat/types';

const initialState = {
  msg: '',
  assignSuccess: '',
  seat: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ASSIGN_SEAT:
      return {
        ...state,
        msg: action.payload.msg,
        assignSuccess: true,
      };
    case types.VIEW_SEAT:
      return {
        ...state,
        msg: action.payload.msg,
        seat: action.payload.seat,
      };
    default:
      return state;
  }
};
