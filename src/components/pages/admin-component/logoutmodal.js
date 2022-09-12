import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const LogoutModal = () => {
  const [open, setOpen] = useState(false);
  const logoutprop = useSelector((state) => state.reducer.logoutprop);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch({ type: "logoutPfalse" });
    setOpen(false);
  };

  const closing = () => {
    handleClose();
    dispatch({ type: "logoutPfalse" });
    // uncommnet it
    // dispatch({ type: "disallow" });
    localStorage.clear();
    dispatch({ type: "maindash" });
    history.push("/");
  };

  useEffect(() => {
    if (logoutprop) {
      handleClickOpen();
    }
  }, [logoutprop]);

  return (
    <div>
      <Dialog
        open={open}
        disableScrollLock={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        // sx={{
        //   // width: window.innerWidth <= 760 ? "68%" : "100%",
        //   paddingRight:
        //     window.innerWidth <= 1280 && window.innerWidth >= 740 && "15%",
        // }}
      >
        <div>
          <DialogTitle
            id="alert-dialog-title"
            sx={{ marginTop: -1.5, marginBottom: -1.5 }}
          >
            {/* <IconButton
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
            </IconButton> */}
            <Typography variant="string">Confirmation</Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="string">
                Are you sure you want to sign out ?
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            className="d-flex justify-content-center"
            sx={{
              marginTop: -2,
              marginBottom: 1,
              marginRight: 1,
              float: "right",
            }}
          >
            <Button
              variant="contained"
              onClick={closing}
              size="small"
              sx={{
                fontWeight: 700,
              }}
            >
              Sign out
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              size="small"
              sx={{
                fontWeight: 700,
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
