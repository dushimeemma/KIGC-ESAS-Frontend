import { types } from '../../actions/roles/types';

const initialState = {
  roles: [],
  role: {},
  msg: '',
  assignSuccess: false,
  deleteSuccess: false,
  createSuccess: false,
  updateSuccess: false,
  isLoading: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ROLES:
      return {
        ...state,
        isLoading: false,
        roles: action.payload.roles,
      };
    case types.GET_ROLE:
      return {
        ...state,
        role: action.payload.role,
      };
    case types.ASSIGN_ROLE:
      return {
        ...state,
        msg: action.payload.msg,
        assignSuccess: true,
      };
    case types.DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== action.payload.id),
        msg: action.payload.msg,
        deleteSuccess: true,
      };
    case types.CREATE_ROLE:
      return {
        ...state,
        msg: action.payload.msg,
        createSuccess: true,
      };
    case types.UPDATE_ROLE:
      return {
        ...state,
        msg: action.payload.msg,
        updateSuccess: true,
      };
    case types.SET_ROLES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
