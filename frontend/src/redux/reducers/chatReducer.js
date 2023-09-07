import * as actionTypes from "../const/chatConst";

const CHAT_INITIAL_STATE = {
  socket: false,
  headsBubbles: {},
  adminMsgNotification: false,
}

export const chatReducer = (state = CHAT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.HEADS_BUBBLES:
      let currentState = { ...state };
      if (state.headsBubbles[action.payload.user]) {
        currentState.headsBubbles[action.payload.user].push({ client: action.payload.message });
        return {
          ...state,
          headsBubbles: { ...currentState.headsBubbles },
        }

      } else {
        return {
          ...state,
          headsBubbles: { ...currentState.headsBubbles, [action.payload.user]: [{ client: action.payload.message }] },
        }
      }
    case actionTypes.SET_ADMIN_SOCKET:
      return {
        ...state,
        socket: action.payload.socket,
      }
    case actionTypes.ADMIN_MESSAGE_NOTIFICATION:
      return {
        ...state,
        adminMsgNotification: action.payload.value,
      }
    case actionTypes.INACTIVE_HEADS_BUBBLES:
      let saveTheState = { ...state };
      delete saveTheState.headsBubbles[action.payload.socketId];
      return {
        ...state,
        headsBubbles: { ...saveTheState.headsBubbles },
      }
    default:
      return state;
  }
}
