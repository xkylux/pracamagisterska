import LoginPageComp from "../components/login/loginPageComp"

import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userAction";

const userLoginRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post("api/uzytkownicy/zaloguj", { email, password, doNotLogout });
  if (data.userLoggedIn.doNotLogout) localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  return data;
}

const LoginPage = () => {

  const reduxDispatch = useDispatch();

  return <LoginPageComp userLoginRequest={userLoginRequest} reduxDispatch={reduxDispatch} setReduxUserState={setReduxUserState} />
}

export default LoginPage