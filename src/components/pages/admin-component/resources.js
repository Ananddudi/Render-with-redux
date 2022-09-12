import React from "react";
import keyboard from "../../assets/keyboard.png";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export function Resources({ open }) {
  const selector = useSelector((state) => state.adminReducer);

  return (
    <>
      <div className={`${open && "toggling-fun"} container`}>
        <div className="row justify-content-center bannerrender mt-4 mb-2">
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Guidance
          </Typography>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="container my--5 text-center square mr-md-5 mr-sm-0 pr-lg-3 pl-lg-3 pl-0 pr-0">
            <iframe
              // width="80%"
              // height="400"
              title="uniqueID"
              className="shadow-lg youtube-video"
              src={`https://www.youtube.com/embed/${
                selector.resorcesSection.youtube === ""
                  ? "d2cOXy4Qekg"
                  : selector.resorcesSection.youtube
              }`}
            />
          </div>
        </div>
        <div className="row justify-content-center bannerrender mt-4 mb-2">
          <Typography
            variant="h4"
            className="text-center"
            sx={{ fontWeight: 800 }}
          >
            Keyboard shortcuts
          </Typography>
        </div>
        <p className="bannerdec3 text-center">
          {selector.resorcesSection.key_text === ""
            ? "Note: To upload images for screens or signs, create an account at imgbb.com. Upload images to your account and then navigate to your image within the RenderNow program and copy the “DIRECT LINK” to your image, then paste it into the logo field. Watch a quick tip video here: Upload Images Tip"
            : selector.resorcesSection.key_text}
        </p>
        <div className="row justify-content-center mt-4 mb-4">
          <img
            src={
              selector.resorcesSection.key_image
                ? selector.resorcesSection.key_image
                : keyboard
            }
            alt="keyboards"
            width="80%"
            height="80%"
          />
        </div>
      </div>
    </>
  );
}
