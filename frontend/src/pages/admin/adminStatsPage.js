import AdminStatsPageComp from "./adminComp/adminStatsPageComp";
import axios from "axios";
import socketIOClient from "socket.io-client";

const getFirstDataForStatistics = async (abctrl, firstDateForStatistics) => {
  const { data } = await axios.get("/api/zamowienia/statystki/" + firstDateForStatistics, {
    signal: abctrl.signal,
  });
  return data;
}

const getSecoundDataForStatistics = async (abctrl, secondDateForStatistics) => {
  const { data } = await axios.get("/api/zamowienia/statystki/" + secondDateForStatistics, {
    signal: abctrl.signal,
  });
  return data;
};


const AdminStatsPage = () => {

  return <AdminStatsPageComp getFirstDataForStatistics={getFirstDataForStatistics} getSecoundDataForStatistics={getSecoundDataForStatistics} socketIOClient={socketIOClient} />
};

export default AdminStatsPage