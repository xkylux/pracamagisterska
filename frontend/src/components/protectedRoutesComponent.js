import { Outlet, Navigate } from "react-router-dom"
import UserChat from "./user/userchat";
import LoginPage from "../pages/loginPage";

import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoutesComponent = ({ admin }) => {

  const [authorization, setAuthorization] = useState();

  useEffect(() => {
    axios.get("/api/get-token").then(function (data) {
      if (data.data.token) {
        setAuthorization(data.data.token);
      }
      return authorization;
    })
  }, [authorization])

  if (authorization === undefined) return <LoginPage />;

  return authorization && admin && authorization !== "admin" ? (<Navigate to="/logowanie" />) : authorization && admin ? (<Outlet />) : authorization && !admin ? (<><UserChat /> <Outlet /></>) : (<Navigate to="/logowanie" />)

};

export default ProtectedRoutesComponent