import * as actionTypes from "../const/chatConst";

export const setHeadsBubbles = (user, message) => async (dispatch) => {
  dispatch({
    type: actionTypes.HEADS_BUBBLES,
    payload: {
      user: user,
      message: message,
    }
  })
}

export const setAdminSocket = (socket) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_ADMIN_SOCKET,
    payload: {
      socket: socket,
    }
  })
}

export const adminMessageNotification = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.ADMIN_MESSAGE_NOTIFICATION,
    payload: {
      value: value,
    }
  })
}

export const deleteInactiveHeadsBubbles = (socketId) => async (dispatch) => {
  dispatch({
    type: actionTypes.INACTIVE_HEADS_BUBBLES,
    payload: {
      socketId: socketId,
    }
  })
}
