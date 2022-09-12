import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { AiOutlineClose } from "react-icons/ai";
import validator from "validator";
import Alert from "@mui/material/Alert";
import modalsvg from "../../assetsSRC/modal.png";

export const Modal = () => {
  const [open, setOpen] = useState(false);
  const [email_is, setEmail_is] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [alertm, setAlertM] = useState({
    alerm: false,
    show: false,
  });

  const handletheClose = () => {
    setOpen(false);
  };

  const handleClose = async () => {
    if (!validator.isEmail(email_is)) {
      return setAlertM({ alerm: true, show: true });
    }
    const val = await fetch(
      "https://rvent-render-backend.herokuapp.com/newsletter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email_is }),
      }
    );
    const result = await val.json();
    if (result) {
      if (result.message === "subscribed") {
        setAlertM({ alerm: true, show: false });
        setTimeout(() => {
          setOpen(false);
          setAlertM({ alerm: false, show: false });
        }, 10000);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleClickOpen();
    }, 15000);
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        fullWidth={true}
        disableScrollLock={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          width: window.innerWidth <= 760 ? "68%" : "100%",
          paddingRight:
            window.innerWidth <= 1280 && window.innerWidth >= 740 && "15%",
        }}
      >
        <div className="text-center">
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              backgroundImage: `url(${modalsvg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handletheClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "black",
                background: "white",
                "&:hover": {
                  color: "black",
                  background: "white",
                },
              }}
            >
              <AiOutlineClose size={15} />
            </IconButton>
            <Typography
              variant="h6"
              color="common.white"
              sx={{ fontWeight: 800 }}
            >
              JOIN OUR MAILING LIST
            </Typography>
          </DialogTitle>
          <Divider />
          {alertm.alerm && (
            <Alert severity={alertm.show ? "error" : "success"}>
              {alertm.show ? "Provide valid email" : "You are subscribed"}
            </Alert>
          )}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="h6">
                <span className="text-muted">
                  Be the first to know about updates to our platforms as well as
                  new work and podcast episodes
                </span>
              </Typography>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "40ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="filled-basic"
                  fullWidth={true}
                  size="small"
                  label="Email"
                  variant="outlined"
                  autoComplete="email"
                  value={email_is}
                  onChange={(e) => setEmail_is(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            className="d-flex justify-content-center"
            sx={{
              marginTop: -2,
              marginBottom: 1,
            }}
          >
            <Button variant="contained" onClick={handleClose}>
              SUBSCRIBE
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
