import { Outlet } from "react-router-dom"
import UserChat from "./userchat"
const RautesUserChat = () => {
  return (<><UserChat/> <Outlet/></>);
}

export default RautesUserChat