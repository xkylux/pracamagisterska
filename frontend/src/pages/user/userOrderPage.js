import UserOrderPageComp from "../../components/user/userOrderPageComp"
import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get("/api/zamowienia");
  return data;
}

const UserOrderPage = () => {
  return <UserOrderPageComp getOrders={getOrders} />;

}

export default UserOrderPage