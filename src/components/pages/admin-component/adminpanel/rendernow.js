import React, { useState } from "react";
import { renderpageapi } from "./hooks/apis";
import { useSelector, useDispatch } from "react-redux";

const Rendernow = () => {
  const [link, setLink] = useState("");

  const response = useSelector((state) => state.adminReducer.render_message);
  const dispatch = useDispatch();

  const handlesubmit = (e) => {
    e.preventDefault();
    renderpageapi(link, dispatch);
    setLink("");
  };

  return (
    <section
      className="my-3"
      style={{
        borderBottom: "0.2rem solid rgb(25, 118, 210)",
        borderRadius: "8px",
      }}
    >
      {response && (
        <div
          className="alert alert-success mt-2 text-center font-weight-bold"
          role="alert"
        >
          Changes are successfully applied
        </div>
      )}
      <div className="my-2">
        <form className="d-flex justify-content-center flex-column align-items-center">
          <span className="shadow-lg card py-1 px-3 pb-2 rounded">
            <label htmlFor="monday.com" className="text-center h5 bannerfont">
              Monday.Com Form
            </label>
            <textarea
              type="text"
              placeholder="Place Here Only Iframe Link"
              name="monday.com"
              className="px-2"
              rows="6"
              cols="30"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button
              onClick={handlesubmit}
              className="mt-2 py-1 px-2 rounded oncea-button"
              style={{ backgroundColor: "#1565c0", color: "white" }}
            >
              Submit
            </button>
          </span>
        </form>
      </div>
    </section>
  );
};

export default Rendernow;
