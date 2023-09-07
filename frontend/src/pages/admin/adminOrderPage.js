import OrderPageComp from "./adminComp/orderPageComp"

import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get("/api/zamowienia/admin");
  return data
}

const AdminOrderPage = () => {
  return <OrderPageComp getOrders={getOrders} />
}

export default AdminOrderPage