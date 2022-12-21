import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Session from "../utils/session";

const ProtectedRoute = ({ Children }) => {

  const user = Session.getSession('auth');
  console.log('userrrrrrrrr====>>>>>>', user)


  return <>
    {user ? <Children /> : <Navigate to="/" />}
  </>
};

export default ProtectedRoute;