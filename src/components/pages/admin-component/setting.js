import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import validator from "validator";

// import { useSelector } from "react-redux";

export function Settings({ open }) {
  const [info, setInfo] = useState({
    fullname: "",
    password: "",
    cpassword: "",
  });
  // const access = useSelector((state) => state.allowaccess);
  const [emails, setEmails] = useState("");
  const [alertis, setAlertis] = useState({
    show: false,
    succ: false,
  });

  const [valid, setValid] = useState({
    fullname: false,
    password: false,
    cpassword: false,
    cnewpassword: false,
  });

  function checkvalidation() {
    if (validator.isEmpty(info.fullname)) {
      setValid((val) => ({ ...val, fullname: true }));
      return true;
    } else if (validator.isEmpty(info.password)) {
      setValid((val) => ({ ...val, fullname: false }));
      setValid((val) => ({ ...val, password: true }));
      return true;
    } else if (validator.isEmpty(info.cpassword)) {
      setValid((val) => ({ ...val, password: false }));
      setValid((val) => ({ ...val, cpassword: true }));
      return true;
    } else if (info.cpassword.length < 6) {
      setValid((val) => ({ ...val, cpassword: true }));
      setValid((val) => ({ ...val, cnewpassword: true }));
      return true;
    }
  }

  const data_is = async (e) => {
    e.preventDefault();
    const checking = checkvalidation();
    if (checking) {
      return;
    }
    setValid((val) => ({ ...val, cpassword: false }));
    setValid((val) => ({ ...val, cnewpassword: false }));
    const datafetch = await fetch(
      "https://rvent-render-backend.herokuapp.com/authedit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: info.fullname,
          email: emails,
          password: info.password,
          profilePhoto: "some data",
          newpassword: info.cpassword,
        }),
      }
    );
    const result = await datafetch.json();
    if (result) {
      if (result.message === "user exist, Wrong password ") {
        setAlertis({ show: true, succ: false });
      } else {
        localStorage.setItem("fullname", result.fullname);
        setAlertis({ show: true, succ: true });
      }
    }
  };

  useEffect(() => {
    setEmails(localStorage.getItem("email"));
    setInfo({ ...info, fullname: localStorage.getItem("fullname") });
    setAlertis({ ...alertis, show: false });
  }, []);

  return (
    <div className={`${open && "toggling-fun"} container mt-5`}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-7 pl-lg-3 pr-lg-3 pr-0 pl-0">
          <div className="card p-lg-3 p-0 py-lg-4 pb-2 pb-lg-0 mb-4 rounded shadow-lg">
            <div className="text-center mt-3">
              <h5 className="mt-2 mb-0">Eric</h5>

              <div className="px-lg-4 px-0 mt-1">
                <div className="container px-4">
                  <div className="row justify-content-center mt-3">
                    {alertis.show && (
                      <Alert
                        severity={alertis.succ ? "success" : "error"}
                        className="mb-2"
                      >
                        {alertis.succ
                          ? "Password is successfully updated"
                          : "Wrong password!"}
                      </Alert>
                    )}
                    <TextField
                      fullWidth={true}
                      id="outlined-basic"
                      label="FullName"
                      variant="outlined"
                      value={info.fullname}
                      onChange={(e) =>
                        setInfo({ ...info, fullname: e.target.value })
                      }
                      error={valid.fullname && true}
                    />
                  </div>
                  <div className="row justify-content-center mt-3">
                    <TextField
                      fullWidth={true}
                      id="outlined-basic"
                      label="Email"
                      disabled={true}
                      value={emails}
                      variant="outlined"
                      onChange={(e) => setEmails(e.target.value)}
                    />
                  </div>
                  <div className="row justify-content-center mt-3">
                    <TextField
                      fullWidth={true}
                      id="outlined-basic"
                      label="Current Password"
                      variant="outlined"
                      hintText="Password"
                      floatingLabelText="Password"
                      value={info.password}
                      error={valid.password && true}
                      onChange={(e) =>
                        setInfo({ ...info, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="row justify-content-center mt-3">
                    <TextField
                      fullWidth={true}
                      id="outlined-basic"
                      label="New Password"
                      variant="outlined"
                      value={info.cpassword}
                      error={valid.cpassword && true}
                      onChange={(e) =>
                        setInfo({ ...info, cpassword: e.target.value })
                      }
                      helperText={
                        valid.cnewpassword &&
                        "New password should have alteast 6 character"
                      }
                    />
                  </div>
                </div>
                <div>
                  <Button
                    onClick={data_is}
                    variant="contained"
                    className="float-left ml-2 mt-3"
                    sx={{
                      fontWeight: 700,
                      boxShadow: 3,
                      background: "#1976d2",
                      "&:hover": {
                        background: "#1976d2",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
