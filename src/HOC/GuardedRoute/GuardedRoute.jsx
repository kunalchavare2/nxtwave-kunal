import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

const GuardedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuth) return <Navigate to="/login" replace={true} />;

  return children;
};

export default GuardedRoute;
