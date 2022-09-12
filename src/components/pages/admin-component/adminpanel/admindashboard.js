import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCaretDown } from "react-icons/ai";
import classes from "./style.module.css";
import backimage from "../../../../assetsSRC/backsvg.svg";
import Dashboard from "./dashboard";
import Rendernow from "./rendernow";
import Support from "./support";
import Resources from "./resources";
import Homepage from "./homepage";

export const Admindashboard = () => {
  const [expands, setExpands] = useState({
    homepage: false,
    dashboard: false,
    render: false,
    support: false,
    resources: false,
  });

  // const admincomponent = useSelector((state) => state.reducer.AdminDashboard);

  const dispatch = useDispatch();

  const expandfun = (value) => {
    if (value === "home") {
      setExpands({ ...expands, homepage: true });
    } else if (value === "render") {
      setExpands({ ...expands, render: true });
    } else if (value === "support") {
      setExpands({ ...expands, support: true });
    } else if (value === "resources") {
      setExpands({ ...expands, resources: true });
    } else {
      setExpands({ ...expands, dashboard: true });
    }
  };
  const shrinkfun = (value) => {
    if (value === "home") {
      setExpands({ ...expands, homepage: false });
    } else if (value === "render") {
      setExpands({ ...expands, render: false });
    } else if (value === "support") {
      setExpands({ ...expands, support: false });
    } else if (value === "resources") {
      setExpands({ ...expands, resources: false });
    } else {
      setExpands({ ...expands, dashboard: false });
    }
  };

  useEffect(() => {
    dispatch({ type: "admindash" });
  }, []);

  return (
    <div
      className="container-fluid m-0 p-0 w-auto h-100 "
      style={
        {
          // backgroundImage: `url(${backimage})`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          // width: "100%",
          // height: "100%",
        }
      }
    >
      <div className="row p-4">
        <div className="w-100 text-center">
          <div
            className={`${
              expands.homepage && classes.change
            } card shadow p-1 w-100 rounded bannerfont ${classes.pointers}`}
            onClick={() => {
              if (expands.homepage) {
                shrinkfun("home");
              } else {
                expandfun("home");
              }
            }}
          >
            Homepage
            <span>{expands.homepage && <AiFillCaretDown />}</span>
          </div>
          {expands.homepage && <Homepage />}
        </div>

        <div className="w-100 mt-1">
          <div
            className={`${
              expands.dashboard && classes.change
            } card shadow-lg p-1 w-100 rounded bannerfont text-center ${
              classes.pointers
            }`}
            onClick={() => {
              if (expands.dashboard) {
                shrinkfun("dash");
              } else {
                expandfun("dash");
              }
            }}
          >
            Dashboard
            <span>{expands.dashboard && <AiFillCaretDown />}</span>
          </div>
          {expands.dashboard && <Dashboard />}
        </div>
        <div className="w-100 mt-1">
          <div
            className={`${
              expands.render && classes.change
            } card shadow-lg p-1 w-100 rounded bannerfont text-center ${
              classes.pointers
            }`}
            onClick={() => {
              if (expands.render) {
                shrinkfun("render");
              } else {
                expandfun("render");
              }
            }}
          >
            RenderNow
            <span>{expands.render && <AiFillCaretDown />}</span>
          </div>
          {expands.render && <Rendernow />}
        </div>
        <div className="w-100 mt-1">
          <div
            className={`${
              expands.support && classes.change
            } card shadow-lg p-1 w-100 rounded bannerfont text-center ${
              classes.pointers
            }`}
            onClick={() => {
              if (expands.support) {
                shrinkfun("support");
              } else {
                expandfun("support");
              }
            }}
          >
            Support
            <span>{expands.support && <AiFillCaretDown />}</span>
          </div>
          {expands.support && <Support />}
        </div>
        <div className="w-100 mt-1">
          <div
            className={`${
              expands.resources && classes.change
            } card shadow-lg p-1 w-100 rounded bannerfont text-center ${
              classes.pointers
            }`}
            onClick={() => {
              if (expands.resources) {
                shrinkfun("resources");
              } else {
                expandfun("resources");
              }
            }}
          >
            Resources
            <span>{expands.resources && <AiFillCaretDown />}</span>
          </div>
          {expands.resources && <Resources />}
        </div>
      </div>
      <div className="row justify-content-center mt-2 bannertitle">
        Click for open & close
      </div>
    </div>
  );
};
