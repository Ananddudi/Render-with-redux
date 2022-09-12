import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const Privateroute = ({ children, ...rest }) => {
  const access = useSelector((state) => state.adminReducer.adminaccess);
  return (
    <Route {...rest}>{access ? children : <Redirect to="/auth/login" />}</Route>
  );
};

export default Privateroute;
