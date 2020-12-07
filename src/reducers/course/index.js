import { types } from '../../actions/course/types';

const initialState = {
  msg: '',
  recordSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECORD_COURSE:
      return {
        ...state,
        msg: action.payload.msg,
        recordSuccess: true,
      };

    default:
      return state;
  }
};
