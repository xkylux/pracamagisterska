import AdminEditUserPageComp from "./adminComp/AdminEditUserPageComp";
import axios from "axios";

const getUserDataToEdit = async (userId) => {
  const { data } = await axios.get(`/api/uzytkownicy/${userId}`);
  return data;
}

const editUserByAdmin = async (userId, name, lastName, email, isAdmin) => {
  const { data } = await axios.put(`/api/uzytkownicy/${userId}`, { name, lastName, email, isAdmin });
  return data;
}

const AdminEditUserPage = () => {

  return <AdminEditUserPageComp editUserByAdmin={editUserByAdmin} getUserDataToEdit={getUserDataToEdit} />

}

export default AdminEditUserPage