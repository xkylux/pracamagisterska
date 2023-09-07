import OrderDetailsComp from "./adminComp/orderDetailsComp"

import axios from "axios";

const getOrder = async (id) => {
  const { data } = await axios.get("/api/zamowienia/uzytkownik/" + id);
  return data
}

const markAsDelivered = async (id) => {
  const { data } = await axios.put("/api/zamowienia/dostarczone/" + id);
  if (data) {
      return data;
  }
}


const AdminOrderDetails = () => {
  return <OrderDetailsComp getOrder={getOrder} markAsDelivered={markAsDelivered} />
}

export default AdminOrderDetails