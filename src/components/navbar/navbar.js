import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/eventrender.png";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

export const Navbar = (prop) => {
  const [show, setShow] = useState(true);

  const access = useSelector((state) => state.reducer.allowaccess);
  const dispatch = useDispatch();

  useEffect(() => {
    function execute() {
      if (window.scrollY > 100) {
        setShow(false);
      } else setShow(true);
    }
    window.addEventListener("scroll", execute);
    return () => {
      window.removeEventListener("scroll", execute);
    };
  }, []);

  // uncomment it
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     dispatch({ type: "allow" });
  //   }
  // }, []);

  return (
    <>
      <header id="home">
        <nav
          className={`navbar navbar-default attr-bg navbar-fixed white ${
            show && "no-background"
          } bootsnav position-fixed`}
        >
          <div className="container">
            <div className="attr-nav mt-lg-4 mt-md-2 pt-md-1">
              <Button
                onClick={() =>
                  (window.location.href =
                    "https://www.eventrender.com/lets-talk")
                }
                variant="contained"
                sx={{
                  fontWeight: "700",
                  "&:hover": show && {
                    backgroundColor: "white",
                    color: "#1976d2",
                  },
                }}
              >
                LET'S TALK
              </Button>
            </div>

            <div className="navbar-header widthofheader">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navbar-menu"
              >
                <i className="fa fa-bars"></i>
              </button>
              <div className="widthOfLogo">
                <Link to="/" className="navbar-brand w-75">
                  <div className="d-flex flex-row align-items-center">
                    <img
                      style={{ zIndex: "2" }}
                      src={logoImage}
                      className="logo logo-display widthofimage"
                      alt="Logo"
                    />
                    {/* <div className="d-lg-block d-none ">
                      <img
                        src={logoimage}
                        className={`${show || "d-none"}`}
                        alt="soimage"
                        height="50"
                      />
                    </div> */}
                  </div>
                </Link>
              </div>
            </div>

            <div className="collapse navbar-collapse" id="navbar-menu">
              <ul
                className="nav navbar-nav navbar-right"
                data-in="#"
                data-out="#"
              >
                <li className="hoverinderline">
                  <Link
                    to=""
                    onClick={() =>
                      (window.location.href = "https://www.eventrender.com/")
                    }
                  >
                    Home
                  </Link>
                </li>
                {/* <li className="hoverinderline">
                  <Link to="/">RenderNow</Link>
                </li>
                <li className="hoverinderline">
                  <Link to="/">3DCON</Link>
                </li> */}
                <li className="hoverinderline">
                  <Link
                    to=""
                    onClick={() =>
                      (window.location.href =
                        "https://www.eventrender.com/blog")
                    }
                  >
                    Blog
                  </Link>
                </li>
                {/* uncommment it */}
                {/* {access ? ( */}
                <li className="hoverinderline">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                {/* ) : ( */}
                {/* <>
                    <li className="hoverinderline">
                      <Link to="/auth/login">Sign In</Link>
                    </li>
                    <li className="hoverinderline">
                      <Link to="/auth/register">Sign Up</Link>
                    </li>
                  </> */}
                {/* )} */}
              </ul>
            </div>
          </div>
          <Divider sx={{ scale: 0.5, background: "white", boxShadow: 3 }} />
        </nav>
      </header>
    </>
  );
};

export const mapStateToProps = (state) => {
  return {
    profile: state,
  };
};

export default withRouter(connect(mapStateToProps)(Navbar));
