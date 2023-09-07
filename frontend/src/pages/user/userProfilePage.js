import ProfilPageComp from "../../components/user/profilPageComp";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userAction";

const userUpdateRequest = async (name, lastName, phoneNumber, address, country, zipCode, city, state, password) => {
  const { data } = await axios.put(
    'api/uzytkownicy/profil',
    { name, lastName, phoneNumber, address, country, zipCode, city, state, password }
  )
  return data
}

const getUser = async (id) => {
  const { data } = await axios.get("/api/uzytkownicy/profil/" + id);
  return data;
}

const UserProfilPage = () => {

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  return <ProfilPageComp userUpdateRequest={userUpdateRequest} getUser={getUser} userInfo={userInfo} setReduxUserState={setReduxUserState} dispatch={dispatch} localStorage={window.localStorage} sessionStorage={window.sessionStorage} />
}

export default UserProfilPage