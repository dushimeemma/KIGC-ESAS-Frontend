import { types } from '../../actions/finance/types';

const initialState = {
  msg: '',
  recordSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECORD_FINANCE:
      return {
        ...state,
        msg: action.payload.msg,
        recordSuccess: true,
      };

    default:
      return state;
  }
};
