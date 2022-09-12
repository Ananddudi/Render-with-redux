import React from "react";
import backimage from "../../assets/404.jpg";

const PageNotFound = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <img src={backimage} alt="image404" height="80%" />
    </div>
  );
};

export default PageNotFound;
