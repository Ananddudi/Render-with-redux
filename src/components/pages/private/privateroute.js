import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import PageNotFound from "./page404";

// import {useSelector,useDispatch} from "react-redux";
export const PrivateRoute = ({ children, ...rest }) => {
  let access = useSelector((state) => state.reducer.allowaccess);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "allow" });
    // if (localStorage.getItem("token")) {
    // }
  }, []);
  return <Route {...rest}>{access ? children : <PageNotFound />}</Route>;
};
