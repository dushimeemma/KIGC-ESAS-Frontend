import { types } from '../../actions/auth/types';

const initialState = {
  msg: '',
  status: '',
  token: '',
  isAuthenticated: null,
  registered: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        registered: true,
      };
    case types.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.user.name);
      return {
        ...state,
        msg: action.payload.msg,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case types.LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      return {
        ...state,
        msg: action.payload.msg,
        token: '',
        user: {},
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
