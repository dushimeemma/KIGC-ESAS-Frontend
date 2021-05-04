/* eslint-disable import/no-anonymous-default-export */
import { types } from '../../actions/room/types';

const initialState = {
  rooms: [],
  room: {},
  isLoading: null,
  msg: '',
  getSuccess: false,
  createSuccess: false,
  assignSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ROOMS:
      return {
        ...state,
        rooms: action.payload.rooms,
        msg: action.payload.message,
      };
    case types.CREATE_ROOM:
      return {
        ...state,
        msg: action.payload.message,
        createSuccess: true,
      };

    case types.ASSIGN_ROOM:
      return {
        ...state,
        assignSuccess: true,
        msg: action.payload.message,
      };
    case types.CLEAR_ROOM:
      return {
        ...state,
        msg: action.payload.message,
      };
    case types.GET_ROOM:
      return {
        ...state,
        isLoading: false,
        room: action.payload.room,
        msg: action.payload.message,
      };
    case types.DELETE_ROOM:
      return {
        ...state,
        msg: action.payload.message,
        isLoading: false,
      };
    case types.ROOM_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
