import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import validator from "validator";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

export const Forgotpassword = () => {
  const [open, setOpen] = useState(false);
  const fpassword = useSelector((state) => state.reducer.forgotpass);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailvalid, setEmailvalid] = useState(false);
  const [openis, setOpenis] = useState(false);
  const [message, setMessage] = useState(
    "Email has been sent to your email addresss"
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch({ type: "fFail" });
    setLoading(false);
    setEmail("");
    setOpen(false);
  };

  const handlesubmitemail = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(email) || validator.isEmpty(email)) {
      setEmailvalid(true);
      return;
    }
    setEmailvalid(false);
    setLoading(true);

    const data = await fetch(
      "https://rvent-render-backend.herokuapp.com/resetPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    );
    const result = await data.json();
    console.log("result", result);
    if (
      result.message ===
      "Reset Password Send to Email address, Please Check Email "
    ) {
      setLoading(false);
      setEmail("");
      setOpenis(true);
      setOpen(false);
      dispatch({ type: "fFail" });
    } else if (result.message === "Unexpected socket close") {
      setMessage("An Error Occured");
      setLoading(false);
    } else if (result.message === "Email  doesn't exist") {
      setLoading(false);
      setEmail("Email  doesn't exist");
    }
    dispatch({ type: "fFail" });
  };
  const handleclosing = () => {
    setOpenis(false);
  };

  const checkkey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handlesubmitemail(e);
    }
  };

  useEffect(() => {
    if (fpassword) {
      handleClickOpen();
    }
  }, [fpassword]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openis}
        onClose={handleclosing}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
        // key={vertical + horizontal}
      >
        <Alert
          onClose={handleclosing}
          severity={
            message === "Email has been sent to your email addresss"
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        fullWidth={true}
        disableScrollLock={true}
        // onClose={closing}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="text-center"
        sx={{
          width: window.innerWidth <= 760 ? "68%" : "100%",
          paddingRight:
            window.innerWidth <= 1280 && window.innerWidth >= 740 && "15%",
        }}
      >
        <div className="mx-5 text-center">
          <DialogTitle
            id="alert-dialog-title"
            sx={{ marginTop: -1.5, marginBottom: -1.5 }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 4,
                top: 4,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <AiOutlineClose size={16} />
            </IconButton>
            <Typography variant="string">Forgot Password</Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="string">Email id</Typography>
            </DialogContentText>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailvalid}
                onKeyDown={checkkey}
              />
            </Box>
          </DialogContent>
          <DialogActions
            className="d-flex justify-content-center"
            sx={{
              marginTop: -2,
              marginBottom: 1,
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                fontWeight: 700,
              }}
              onClick={handlesubmitemail}
            >
              {loading ? (
                <CircularProgress sx={{ color: "white", padding: 1 }} />
              ) : (
                "Forgot Password"
              )}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
