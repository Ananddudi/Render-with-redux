import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

function Emulator() {
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const [message, setMessage] = useState(
    "This may take up to 10 or more seconds please wait..."
  );

  const dashSelector = useSelector((state) => state.adminReducer);

  var issafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    let script2 = document.createElement("script");
    script2.src = "classes/v8/Player.js";
    script2.async = true;
    document.body.appendChild(script2);

    let script3 = document.createElement("script");
    script3.src = "classes/v8/SDKDebug.js";
    script3.async = true;
    document.body.appendChild(script3);

    let script = document.createElement("script");
    script.src = "classes/v8/index.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script2);
      document.body.removeChild(script3);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    console.log(window.location);
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      setMessage("Safari version 12 or lower might not work");
      return setTimeout(() => {
        setOpen(false);
      }, 10000);
    }
    setTimeout(() => {
      setMessage("This may take up to 10 or more seconds please wait...");
      setOpen(false);
    }, 10000);
  }, []);

  return (
    <div>
      <Button
        style={{ zIndex: 5 }}
        variant="contained"
        sx={{
          position: "fixed",
          marginLeft: "2%",
          bottom: "5%",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onClick={() => {
          // uncomment it
          // dispatch({ type: "allow" });
          history.push("/dashboard");
          issafari && window.location.reload();
        }}
      >
        <TiArrowBackOutline className="mr-2" />
        Back
      </Button>

      <div class="main-container">
        <div id="furioos_container">
          {open && (
            <div className="apploading">
              <CircularProgress sx={{ opacity: 0.5 }} />
              <div className="marginfromtop">{message}</div>
            </div>
          )}
        </div>
        <div
          className="text-center mt-lg-2 mt-5 h6 text-dark"
          style={{ fontSize: "95%" }}
        >
          When inactive for 5 minutes, the connection will automatically
          disconnect (make sure to save your work)
        </div>
        <div className="imagecontainer">
          <div id="captureImg">Rendering</div>
        </div>
        <div className="downloadbutton">
          <div>
            <a href="" id="download" download="capture.png" target="_blank">
              Download High
            </a>
          </div>
          <div>
            <a
              href=""
              id="download1080"
              download="capture1080.png"
              target="_blank"
            >
              Download Low
            </a>
          </div>
        </div>
      </div>
      <div className="alagcss">
        <iframe
          title="feedback"
          src={
            dashSelector.renderSection.form === ""
              ? "https://forms.monday.com/forms/embed/ed24ff35b9056bc8ee13f920d6c5ee74?r=use1"
              : dashSelector.renderSection.form
          }
          height="500"
          style={{ width: "100%" }}
        ></iframe>
      </div>
    </div>
  );
}

export default Emulator;
