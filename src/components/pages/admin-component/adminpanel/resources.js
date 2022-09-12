import React, { useState } from "react";
import { resourcespageapi } from "./hooks/apis";
import FileBase64 from "../../../../react-file-base64-master/src/js/components/react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCamera } from "react-icons/ai";

const Resources = () => {
  const [data, setData] = useState({
    text: "",
    image: "",
    youtube: "",
  });
  const response = useSelector((state) => state.adminReducer.res_message);
  const [youtubelinkwarn, setYoutubelinkwarn] = useState(false);
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
    resourcespageapi(data, youtubelinks, dispatch);
    setData({
      text: "",
      image: "",
      youtube: "",
    });
  };

  return (
    <>
      {response && (
        <div
          className="alert alert-success mt-2 text-center font-weight-bold"
          role="alert"
        >
          Changes are successfully applied
        </div>
      )}
      <section className="row my-3 justify-content-end mx-2">
        <button
          type="submit"
          style={{ backgroundColor: "#1565c0", color: "white" }}
          className="my-2 py-2 px-3 rounded font-weight-bold oncea-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </section>

      <section
        className="w-100 d-flex justify-content-center bannerdec2"
        style={{
          borderBottom: "0.2rem solid rgb(25, 118, 210)",
          borderRadius: "8px",
        }}
      >
        <header
          className="col-lg col-12 text-left h5 bannerfont"
          style={{ fontWeight: 600 }}
        >
          Feedback Form
        </header>
        <div className="w-50">
          <form className="d-flex flex-column justify-content-left align-items-left col shadow card my-2">
            <label htmlFor="video1" className="text-left mt-2 ">
              Youtube Video Link
            </label>
            <input
              type="text"
              name="youtubes"
              id="video1"
              className={`mb-3 ${youtubelinkwarn && "border-danger"}`}
              value={data.youtube}
              onChange={(e) => {
                setYoutubelinkwarn(false);
                setData(() => ({ ...data, youtube: e.target.value }));
              }}
            />
            <label htmlFor="video2" className="text-left mt-2">
              Text
            </label>
            <input
              type="text"
              name="youtubes"
              id="video2"
              value={data.text}
              onChange={(e) =>
                setData(() => ({ ...data, text: e.target.value }))
              }
            />
            <label
              htmlFor="imgss"
              className="text-left mt-2 perticularstyle text-center rounded"
            >
              Keyboard Image
              <div className="text-center">
                <AiFillCamera className="h3" />
              </div>
              <FileBase64
                id="imgss"
                multiple={false}
                accept="image/*"
                onDone={(e) => {
                  setData(() => ({ ...data, image: e.base64 }));
                }}
              />
            </label>
          </form>
        </div>
      </section>
    </>
  );
};
export default Resources;
