import React, { useState } from "react";
import { dashboardpageapi } from "./hooks/apis";
import { useSelector, useDispatch } from "react-redux";
// import { AiFillDelete } from "react-icons/ai";

const Dashboard = () => {
  const [data, setData] = useState({
    welcome: "",
    welcome_text: "",
    youtube: "",
  });
  const [youtubelinkwarn, setYoutubelinkwarn] = useState(false);
  const response = useSelector((state) => state.adminReducer.dashboard_message);
  const dispatch = useDispatch();

  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let youtubelinks;
    if (data.youtube) {
      youtubelinks = youtube_parser(data.youtube);
      if (!youtubelinks) {
        setYoutubelinkwarn(true);
        return;
      }
    }
    dashboardpageapi(data, youtubelinks, dispatch);
    setData({
      welcome: "",
      welcome_text: "",
      youtube: "",
    });
  };

  return (
    <div
      className="d-flex flex-column w-100 h-100 bannerdec2"
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
      <span className="text-right mt-3">
        <button
          type="submit"
          style={{ backgroundColor: "#1565c0", color: "white" }}
          className="my-2 py-2 px-3 rounded font-weight-bold oncea-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </span>
      <section className="container-fluid w-100 overflow-auto">
        <section className="row my-3">
          <header
            className="col-lg col-12 text-left h5 bannerfont"
            style={{ fontWeight: 600 }}
          >
            Dashboard Content
          </header>
          <form className="col d-flex flex-column justify-content-left align-items-left col shadow-md card my-1">
            <label htmlFor="welcome" className="text-left mt-2">
              Welcome
            </label>
            <input
              type="text"
              name="welcome"
              id="welcome"
              value={data.welcome}
              onChange={(e) =>
                setData(() => ({ ...data, welcome: e.target.value }))
              }
            />
            <label htmlFor="video1" className="text-left mt-2">
              Welcome text
            </label>
            <input
              type="text"
              name="youtubes"
              id="video1"
              value={data.welcome_text}
              onChange={(e) =>
                setData(() => ({ ...data, welcome_text: e.target.value }))
              }
            />
            <label htmlFor="video2" className="text-left mt-2">
              Youtube video link
            </label>
            <input
              type="text"
              name="youtubes"
              id="video2"
              className={`mb-3 ${youtubelinkwarn && "border-danger"}`}
              value={data.youtube}
              onChange={(e) => {
                setYoutubelinkwarn(false);
                setData(() => ({ ...data, youtube: e.target.value }));
              }}
            />
          </form>
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
