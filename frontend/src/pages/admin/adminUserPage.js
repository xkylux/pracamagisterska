import UserPageComp from "./adminComp/userPageComp"

import axios from "axios";

const getUsers = async (abortCtrl) => {
  const { data } = await axios.get("/api/uzytkownicy", { signal: abortCtrl.signal });
  return data;
}

const deleteUser = async (userId) => {
  const { data } = await axios.delete(`/api/uzytkownicy/${userId}`);
  return data;
}

const AdminUserPage = () => {
  return <UserPageComp getUsers={getUsers} deleteUser={deleteUser} />
}

export default AdminUserPage