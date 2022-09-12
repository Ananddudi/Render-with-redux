import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineBars } from "react-icons/ai";
import { AiFillSignal } from "react-icons/ai";
import { AiFillTablet } from "react-icons/ai";
// import { AiFillSetting } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { GrResources } from "react-icons/gr";
import logos from "../../assets/eventoriginal.png";
import { MainDashboard } from "./dashboard";
import { Support } from "./support";
// import { Settings } from "./setting";
import { Resources } from "./resources";
import { LogoutModal } from "./logoutmodal";
import { useSelector, useDispatch } from "react-redux";
import { Admindashboard } from "./adminpanel/admindashboard";
import ReactLoading from "react-loading";
// import PageNotFound from "../private/page404";
// import { PrivateRoute } from "../private/privateroute";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export function AdminPage() {
  const [open, setOpen] = useState(true);

  const [components, logoutprop] = useSelector((state) => {
    return [state.reducer.component, state.reducer.logoutprop];
  });

  const admincomponent = useSelector((state) => state.reducer.AdminDashboard);
  const access = useSelector((state) => state.adminReducer.adminaccess);
  const loader = useSelector((state) => state.adminReducer.unload_loader);

  const history = useHistory();

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logoutfun = async () => {
    await localStorage.removeItem("password");
    await dispatch({ type: "notload" });
    await dispatch({ type: "maindash" });
    await history.push("/dashboard");
    // dispatch({ type: "logoutP" });
  };

  useEffect(() => {
    if (localStorage.getItem("password") !== "!3DDDeric!") {
      dispatch({ type: "adminnoaccess" });
    }
  }, []);

  if (loader) {
    return (
      <div
        style={{ height: "100vh", width: "100vw" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="d-flex flex-column align-items-center">
          <div>
            <ReactLoading type="cubes" color="#1976d2" />
          </div>
          <div className="h3 font-weight-bold bannertitle mt-3">
            Loading Please Wait
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={loader || `fadeinEffect`}>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="absolute"
            open={open}
            sx={{ backgroundColor: "white", boxShadow: 1 }}
          >
            <Toolbar
              sx={{
                paddingRight: "24px",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  // ...(open && { display: "none" }),
                }}
              >
                <AiOutlineBars className={open || "text-primary"} />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
                className="dashboadfonts"
              >
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            open={open}
            sx={{
              boxShadow: 3,
              lineHeight: 3,
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              {/* <span onClick={() => console.log("hello")}> */}
              <img
                src={logos}
                className="pl-4"
                alt="logoimage"
                onClick={() => console.log("hello")}
              />
              {/* </span> */}
              <IconButton onClick={toggleDrawer}>
                <AiOutlineDoubleLeft />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {admincomponent === "admindashboard" ? (
                <div className="position-sticky">
                  <div className="list-group list-group-flush mx-lg-2 mx-0 mt-1 bannerdec3">
                    <button
                      style={{
                        background:
                          admincomponent === "admindashboard" &&
                          !logoutprop &&
                          "#1976d2",
                      }}
                      className={`${
                        admincomponent === "admindashboard" &&
                        !logoutprop &&
                        "text-white rounded"
                      } list-group-item list-group-item-action py-2 ripple`}
                      onClick={() => dispatch({ type: "admindash" })}
                    >
                      <span className={open ? "d-none mx-lg-3" : "mx-lg-0"}>
                        <AiFillSignal />
                      </span>
                      <span
                        className={`${
                          open || "utilityclasses"
                        } font-weight-bold`}
                      >
                        Dashboard
                      </span>
                    </button>
                    <button
                      style={{
                        background: logoutprop && "#1976d2",
                      }}
                      className={`${
                        logoutprop && "text-white rounded"
                      } list-group-item list-group-item-action py-2 ripple`}
                      onClick={logoutfun}
                    >
                      <span className={open ? "d-none mx-lg-3" : "mx-lg-0"}>
                        <FiLogOut />
                      </span>
                      <span
                        className={`${
                          open || "utilityclasses"
                        } font-weight-bold`}
                      >
                        Sign Out
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="position-sticky">
                  <div className="list-group list-group-flush mx-lg-2 mx-0 mt-1 bannerdec3">
                    <button
                      style={{
                        background:
                          components === "MainDashboard" &&
                          !logoutprop &&
                          "#1976d2",
                      }}
                      className={`${
                        components === "MainDashboard" &&
                        !logoutprop &&
                        "text-white rounded"
                      } list-group-item list-group-item-action py-2 ripple`}
                      onClick={() => dispatch({ type: "maindash" })}
                    >
                      <span className={open ? "d-none mx-lg-3" : "mx-lg-0"}>
                        <AiFillSignal />
                      </span>
                      <span
                        className={`${
                          open || "utilityclasses"
                        } font-weight-bold`}
                      >
                        Dashboard
                      </span>
                    </button>
                    <button
                      className="list-group-item list-group-item-action py-2 ripple"
                      onClick={() => {
                        history.push("/render");
                        window.location.reload();
                      }}
                    >
                      <span className={open ? "d-none mx-lg-3" : "mx-lg-0"}>
                        <AiFillTablet />
                      </span>
                      <span
                        className={`${
                          open || "utilityclasses"
                        } font-weight-bold`}
                      >
                        RenderNow
                      </span>
                    </button>
                    <button
                      style={{
                        background:
                          components === "Support" && !logoutprop && "#1976d2",
                      }}
                      className={`${
                        components === "Support" &&
                        !logoutprop &&
                        "text-white rounded"
                      } list-group-item list-group-item-action py-2 ripple`}
                      onClick={() => dispatch({ type: "supp" })}
                    >
                      <span className={open ? "d-none mx-lg-3" : "mx-lg-0"}>
                        <BiSupport />
                      </span>
                      <span
                        className={`${
                          open || "utilityclasses"
                        } font-weight-bold`}
                      >
                        Support
                      </span>
                    </button>
                    <button
                      style={{
                        background:
                          components === "Resource" && !logoutprop && "#1976d2",
                      }}
                      className={`${
                        components === "Resource" &&
                        !logoutprop &&
                        "text-white rounded"
                      } list-group-item list-group-item-action py-2 ripple`}
                      onClick={() => dispatch({ type: "resorce" })}
                    >
                      <span className={open ? "d-none mx-lg-3" : "mx-lg-0"}>
                        <GrResources />
                      </span>
                      <span
                        className={`${
                          open || "utilityclasses"
                        } font-weight-bold`}
                      >
                        Resources
                      </span>
                    </button>
                    {/* <button
                    style={{
                      background:
                        components === "Settings" && !logoutprop && "#1976d2",
                    }}
                    className={`${
                      components === "Settings" &&
                      !logoutprop &&
                      "text-white rounded"
                    } list-group-item list-group-item-action py-2 ripple`}
                    onClick={() => {
                      dispatch({ type: "sett" });
                    }}
                  >
                    <span className={open ? "d-none mx-lg-3" : "mx-lg-0"}>
                      <AiFillSetting />
                    </span>
                    <span
                      className={`${
                        open || "utilityclasses"
                      } font-weight-bold ${
                        components === "setting" && "text-muted"
                      }`}
                    >
                      Settings
                    </span>
                  </button> */}

                    {/* <button
                    style={{
                      background: logoutprop && "#1976d2",
                    }}
                    className={`${
                      logoutprop && "text-white rounded"
                    } list-group-item list-group-item-action py-2 ripple`}
                    onClick={() => {
                      // dispatch({ type: "logoutP" });
                    }}
                  >
                    <span className={open ? "d-none mx-lg-3" : "mx-lg-0"}>
                      <FiLogOut />
                    </span>
                    <span
                      className={`${open || "utilityclasses"} font-weight-bold`}
                    >
                      Sign Out
                    </span>
                  </button> */}
                  </div>
                </div>
              )}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            {components === "MainDashboard" && !access && (
              <MainDashboard open={open} />
            )}
            {/* {components === "Settings" && <Settings open={open} />} */}
            {components === "Support" && !access && <Support open={open} />}
            {components === "Resource" && !access && <Resources open={open} />}
            <Switch>
              <Route exact path="/dashboard/admin">
                {localStorage.getItem("password") ? (
                  <Admindashboard />
                ) : (
                  <Redirect to="/auth/login" />
                )}
              </Route>
            </Switch>
          </Box>
        </Box>
        <LogoutModal />
      </ThemeProvider>
    </div>
  );
}
