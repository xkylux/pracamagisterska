import RegisterPageComp from "../components/register/registerPageComp";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userAction";

const registerUserRequest = async (name, lastName, email, password) => {
  const { data } = await axios.post("/api/uzytkownicy/zarejestruj", { name, lastName, email, password });
  sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
  if (data.success === "Konto zostało utworzone!") window.location.href = "/moje-konto";
  return data;
}

const RegisterPage = () => {

  const reduxDispatch = useDispatch();

  return <RegisterPageComp registerUserRequest={registerUserRequest} reduxDispatch={reduxDispatch} setReduxUserState={setReduxUserState} />
}

export default RegisterPage