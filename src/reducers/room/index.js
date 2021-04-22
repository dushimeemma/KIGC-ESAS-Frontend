/* eslint-disable import/no-anonymous-default-export */
import { types } from "../../actions/room/types";

const initialState = {
  rooms: [],
  room: {},
  msg: "",
  getSuccess: false,
  createSuccess: false,
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
    default:
      return state;
  }
};
