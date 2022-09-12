import React, { useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { Login, Register, Forgotpassword } from "./components/index";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import svgfile from "./components/assets/backsvg.svg";
// import google from "./components/assets/google.png";
// import facebook from "./components/assets/facebooks.png";
import sideimage from "./components/assets/clientimage/sideimage.jpg";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function Auth() {
  const loading = useSelector((state) => state.reducer.loading);

  const params = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (params.pathname !== "/auth/login") {
      history.push("/auth/login");
    }
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${sideimage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {loading && (
          <>
            <div
              style={{
                position: "fixed",
                zIndex: "1",
                height: "100vh",
                width: "100vw",
                opacity: "50%",
                background: "black",
              }}
            ></div>
            <div className="zindexpro position-fixed d-flex justify-content-center h-100 w-100 flex-column align-items-center">
              <div className="align-self-center">
                <Box sx={{ display: "flex" }}>
                  <CircularProgress sx={{ color: "white" }} />
                </Box>
              </div>
              <div>
                <Typography variant="h5" sx={{ color: "white", marginTop: 3 }}>
                  Please wait loading...
                </Typography>
              </div>
            </div>
          </>
        )}
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
          style={{
            backgroundImage: `url(${svgfile})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Switch>
            {/* <Route path="/auth/register">
              <Register />
            </Route> */}
            <Route path="/auth/login">
              <Login />
            </Route>
          </Switch>
        </Grid>
      </Grid>
      <Forgotpassword />
    </>
  );
}

export default Auth;
