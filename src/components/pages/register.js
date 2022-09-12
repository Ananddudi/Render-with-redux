import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
// import google from "../assets/google.png";
// import facebook from "../assets/facebooks.png";
import validator from "validator";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export function Register() {
  const [fields, setFields] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const [validmail, setValidMail] = useState(false);
  const [fullname, setFullname] = useState(false);
  const [pass, setPass] = useState(false);
  const [userexist, setUserExist] = useState(false);
  const [openis, setOpenis] = useState(false);
  const [passmatch, setMatch] = useState(false);

  const passMatching = () => {
    if (fields.password !== fields.cpassword) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  };

  function checkvalidation() {
    const checkmails = validator.isEmpty(fields.email);
    const fullnames = validator.isEmpty(fields.fullname);
    const pass = validator.isEmpty(fields.password);
    const passc = validator.isEmpty(fields.cpassword);
    const mail = validator.isEmail(fields.email);

    if (fullnames) {
      setFullname(true);
      return true;
    } else if (!mail || checkmails) {
      setFullname(false);
      setValidMail(true);
      return true;
    } else if (pass) {
      setValidMail(false);
      setFullname(false);
      setPass(true);
      return true;
    } else if (passc || fields.password !== fields.cpassword) {
      setValidMail(false);
      setFullname(false);
      setPass(false);
      setMatch(true);
      return true;
    }
    return false;
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    const checks = checkvalidation();
    if (checks) {
      return;
    }
    dispatch({ type: "load" });
    const data = await fetch(
      "https://rvent-render-backend.herokuapp.com/signUp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fields.fullname,
          email: fields.email,
          password: fields.password,
        }),
      }
    );
    const result = await data.json();
    console.log("val", result);
    if (result) {
      if (result.message === "user already exist") {
        dispatch({ type: "notload" });
        setUserExist(true);
        setFields((useris) => {
          return { fullname: "", email: "", password: "", cpassword: "" };
        });
      } else if (
        result.message === "Password and Name Should be more than 5 char"
      ) {
        dispatch({ type: "notload" });
        return setOpenis(true);
      } else {
        localStorage.setItem("email", result.result.email);
        localStorage.setItem("fullname", result.result.fullname);
        localStorage.setItem("token", result.token);
        setUserExist(false);
        dispatch({ type: "disallow" });
        dispatch({ type: "notload" });
        history.push("/auth/login");
      }
    }
  };

  const handleclosing = () => {
    setOpenis(false);
  };

  useEffect(() => {
    localStorage.clear();
    dispatch({ type: "disallow" });
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openis}
        onClose={handleclosing}
        message="Password and Name Should be more than 5 char"
      />
      <Box
        sx={{
          my: { sm: 1, xs: 13 },
          mx: { sm: 12, xs: 6 },
          paddingTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 900 }}>
          Sign Up
        </Typography>
        <Typography
          variant="h6"
          component="h6"
          sx={{ fontWeight: 100, fontSize: "90%", marginTop: 1 }}
        >
          <Divider sx={{ color: "#1565c0" }} />
          Welcome to Event Render
          <Divider sx={{ color: "#1565c0" }} />
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          {userexist && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {" "}
              <span className="text-secondary">
                User is Already Registered Please{" "}
              </span>
              <Link to="/auth/register" style={{ color: "#1565c0" }}>
                Sign In
              </Link>
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                value={fields.fullname}
                onChange={(e) =>
                  setFields({ ...fields, fullname: e.target.value })
                }
                label="Full Name"
                autoFocus
                sx={{ boxShadow: 3 }}
                error={fullname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                autoComplete="email"
                label="Email Address"
                value={fields.email}
                onChange={(e) =>
                  setFields({ ...fields, email: e.target.value })
                }
                name="email"
                sx={{ boxShadow: validmail ? 0 : 3 }}
                // onBlur={checkmail}
                error={validmail}
                helperText={validmail && "Please enter a valid Email"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                autoComplete="on"
                type="password"
                value={fields.password}
                onChange={(e) =>
                  setFields({ ...fields, password: e.target.value })
                }
                id="password"
                sx={{ boxShadow: 3 }}
                error={pass}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoComplete="on"
                name="password"
                label="Confirm Password"
                type="password"
                value={fields.cpassword}
                onChange={(e) =>
                  setFields({ ...fields, cpassword: e.target.value })
                }
                id="password"
                sx={{ boxShadow: passmatch ? 0 : 3 }}
                onBlur={passMatching}
                error={passmatch}
                helperText={passmatch && "Password do not match"}
              />
            </Grid>
            {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Agree on terms and conditions"
            />
          </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ boxShadow: 3, fontWeight: 900, mt: 3, mb: 5 }}
            onClick={handlesubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <span className="text-secondary">Already have an account?</span>
              <Link
                to="/auth/login"
                // onClick={() => dispatch({ type: "login" })}
                style={{ color: "#1565c0" }}
              >
                {" "}
                Sign in
              </Link>
            </Grid>
          </Grid>
          {/* <div className="d-flex justify-content-center mt-4">
            <h5 style={{ fontWeight: 900 }}>
              <Divider />
              OR
              <Divider />
            </h5>
          </div>
          <div className="d-flex justify-content-center mt-1">
            <img src={google} alt="google" height="50" className="m-3" />
            <img
              src={facebook}
              alt="facebook"
              height="50"
              className="m-3"
            />
          </div> */}
        </Box>
      </Box>
    </>
  );
}
