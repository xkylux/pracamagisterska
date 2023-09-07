import { LOGIN_USER, LOGOUT_USER } from '../const/userConst';
import axios from 'axios';

export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: userCreated
  })
}

export const logOut = () => (dispatch) => {
  document.location.href = "/logowanie";
  axios.get('/api/wyloguj');
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  localStorage.removeItem("cart");
  dispatch({ type: LOGOUT_USER });
}






