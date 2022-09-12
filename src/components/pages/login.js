import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import google from "../assets/google.png";
// import facebook from "../assets/facebooks.png";
import { useHistory } from "react-router-dom";
import validator from "validator";
import Alert from "@mui/material/Alert";

function Login() {
  const dispatch = useDispatch();
  const [field, setField] = useState({
    email: "",
    password: "",
  });

  const [userexist, setUserExist] = useState({
    user: false,
    userpass: false,
  });

  const [validmail, setValidMail] = useState(false);
  const [passwordvalid, setPasswordvalid] = useState(false);

  const forgotpass = useSelector((state) => state.reducer.forgotpass);

  const checkmail = () => {
    if (validator.isEmail(field.email)) {
      setValidMail(false);
      return false;
    } else {
      setValidMail(true);
      return true;
    }
  };

  const history = useHistory();

  function validationcheck() {
    const mailcheck = checkmail();
    const mailvalid = validator.isEmpty(field.email);
    const passcheck = validator.isEmpty(field.password);

    if (mailcheck || mailvalid) {
      setPasswordvalid(false);
      setValidMail(true);
      return true;
    }
    if (passcheck) {
      setValidMail(false);
      setPasswordvalid(true);
      return true;
    }
    setValidMail(false);
    setPasswordvalid(false);
    return false;
  }

  // const forgetpass = () => {
  //   if (forgotpass) {
  //     dispatch({ type: "fFail" });
  //   }
  //   dispatch({ type: "fPass" });
  // };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const checks = await validationcheck();
    if (checks) {
      return;
    }
    dispatch({ type: "load" });

    if (
      field.email === "eric@eventrender.com" &&
      field.password === "3DDDeric"
    ) {
      setTimeout(() => {
        dispatch({ type: "notload" });
        dispatch({ type: "allow" });
        dispatch({ type: "adminaccess" });
        localStorage.setItem("password", field.password);
        history.push("/dashboard/admin");
      }, 1500);
    } else {
      await dispatch({ type: "notload" });
      await dispatch({ type: "adminnoaccess" });
      setUserExist((users) => ({ userpass: false, user: true }));
      dispatch({ type: "disallow" });
    }
    // const data = await fetch(
    //   "https://rvent-render-backend.herokuapp.com/signin",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: field.email,
    //       password: field.password,
    //     }),
    //   }
    // );
    // const result = await data.json();
    // if (result) {
    // if (result.message === "user doesnt exist") {
    //   dispatch({ type: "notload" });
    //   setUserExist((users) => ({ userpass: false, user: true }));
    //   dispatch({ type: "disallow" });
    // } else if (result.message === "user exist, Wrong password ") {
    //   dispatch({ type: "notload" });
    //   setUserExist((users) => ({ user: false, userpass: true }));
    //   dispatch({ type: "disallow" });
    //   setField((useris) => {
    //     return { ...useris, password: "" };
    //   });
    // } else {
    //   // localStorage.setItem("token", result.token);
    //   // localStorage.setItem("fullname", result.fullname);
    //   // localStorage.setItem("lastlogin", result.lastlogin);
    //   // localStorage.setItem("email", result.email);
    //   // localStorage.setItem("lastlogin", result.lastlogin);
    //   // dispatch({ type: "allow" });
    //   // setUserExist((users) => ({ userpass: false, user: false }));
    //   // history.push("/dashboard");
    //   // setField((useris) => {
    //   //   return { fullname: "", email: "", password: "" };
    //   // });
    //   dispatch({ type: "notload" });
    // }
    // }
  };

  useEffect(() => {
    if (localStorage.getItem("password") === "!3DDDeric!") {
      return history.push("/dashboard/admin");
    }
    localStorage.clear();
    dispatch({ type: "disallow" });
  }, []);

  return (
    <Box
      sx={{
        my: { sm: 2, xs: 13 },
        mx: { sm: 12, xs: 6 },
        paddingTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ fontWeight: 900 }}>
        Sign In
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        {userexist.user && (
          <Alert severity="error">
            <span className="text-secondary">User is not Registered</span>
            {/* <Link
              to="/auth/register"
              // onClick={() => dispatch({ type: "register" })}
              style={{ color: "#1565c0" }}
            >
              {" "}
              Sign Up
            </Link> */}
          </Alert>
        )}
        {userexist.userpass && (
          <Alert severity="error">
            <span className="text-secondary">Wrong Password</span>
          </Alert>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          autoComplete="email"
          id="email"
          label="Email Address"
          name="email"
          value={field.email}
          onChange={(e) => setField({ ...field, email: e.target.value })}
          sx={{ boxShadow: validmail ? 0 : 3 }}
          onBlur={checkmail}
          error={validmail}
          helperText={validmail && "Please enter a valid Email"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          autoComplete="current-password"
          value={field.password}
          onChange={(e) => setField({ ...field, password: e.target.value })}
          name="password"
          label="Password"
          type="password"
          id="password"
          error={passwordvalid}
          sx={{ boxShadow: 3 }}
        />
        {/* <Grid item xs>
          <Button
            variant="text"
            size="small"
            sx={{ fontWeight: 500, marginBottom: -1, letterSpacing: 0 }}
            onClick={() => forgetpass()}
          >
            Forgot password ?
          </Button>
        </Grid> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handlesubmit}
          sx={{ mt: 2, mb: 2, boxShadow: 3, fontWeight: 900 }}
        >
          Sign in
        </Button>
        {/* <Grid container justifyContent="flex-end">
          <Grid item>
            <span className="text-secondary">Don't have an account?</span>
            <Link to="/auth/register" style={{ color: "#1565c0" }}>
              {" "}
              Sign Up
            </Link>
          </Grid>
        </Grid> */}

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
  );
}

export { Login };
