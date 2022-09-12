import React, { useState, useRef } from "react";
import classes from "./style.module.css";
import { homepageapi } from "./hooks/apis";
import FileBase64 from "../../../../react-file-base64-master/src/js/components/react-file-base64";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const texts = ["1.", "2.", "3.", "4.", "5.", "6.", "7."];

const Homepage = () => {
  // const [array_value, setArrayValue] = useState(1);

  const response = useSelector((state) => state.adminReducer.hompage_message);
  const dispatch = useDispatch();
  const [youtubelinkwarn, setYoutubelinkwarn] = useState(false);
  const ref = useRef("");
  const ref2 = useRef("");

  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  const [data, setData] = useState({
    firstText: "",
    secondText: "",
    sideimage: "",
    youtube: "",
    key_image: "",
    key_text: "",
    back_image: "",
  });

  const [faqstate, setFaqstate] = useState([
    { ques: "", ans: "" },
    { ques: "", ans: "" },
    { ques: "", ans: "" },
    { ques: "", ans: "" },
    { ques: "", ans: "" },
    { ques: "", ans: "" },
    { ques: "", ans: "" },
  ]);

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
    setYoutubelinkwarn(false);
    homepageapi(data, youtubelinks, faqstate, dispatch);
    setData({
      firstText: "",
      secondText: "",
      sideimage: "",
      youtube: "",
      key_image: "",
      key_text: "",
      back_image: "",
    });

    setFaqstate([
      { ques: "", ans: "" },
      { ques: "", ans: "" },
      { ques: "", ans: "" },
      { ques: "", ans: "" },
      { ques: "", ans: "" },
      { ques: "", ans: "" },
      { ques: "", ans: "" },
    ]);
    ref.current.value = null;
    ref2.current.value = null;
  };

  const handlechangeof_faq = (index, e) => {
    let arr = [...faqstate];
    arr[index] = { ...arr[index], ques: e.target.value };
    setFaqstate(arr);
  };

  const handlechangeof_faqans = (index, e) => {
    let arr = [...faqstate];
    arr[index] = { ...arr[index], ans: e.target.value };
    setFaqstate(arr);
  };

  return (
    <div
      className={`${classes.expandtransition} my-2 container justify-content-left bannerdec2`}
      style={{
        borderBottom: "0.2rem solid rgb(25, 118, 210)",
        borderRadius: "8px",
      }}
    >
      {response && (
        <div className="alert alert-success mt-2 text-center" role="alert">
          Changes are successfully applied
        </div>
      )}
      <section className="row my-3 justify-content-end">
        <button
          type="submit"
          style={{ backgroundColor: "#1565c0", color: "white" }}
          className="my-2 py-2 px-3 rounded font-weight-bold shadow-lg oncea-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </section>
      <section className="row my-3">
        <header
          className="col-lg col-12 text-left h5 bannerfont"
          style={{ fontWeight: 600 }}
        >
          Background Image
        </header>
        <form className="col d-flex flex-column justify-content-left align-items-left col shadow-md card my-1">
          <div className="my-2 text-left styling-filebase64">
            <FileBase64
              type="file"
              refs={ref2}
              multiple={true}
              onDone={(e) =>
                setData(() => ({ ...data, back_image: e[0].base64 }))
              }
            />
          </div>
        </form>
      </section>
      <section className="row my-3">
        <header
          className="col-lg col-12 text-left h5 bannerfont"
          style={{ fontWeight: 600 }}
        >
          Banner Text
        </header>
        <form className="col d-flex flex-column justify-content-left align-items-left col shadow-md card my-1">
          <label htmlFor="video1" className="text-left mt-2">
            First Text
          </label>
          <input
            type="text"
            name="youtubes"
            id="video1"
            value={data.firstText}
            onChange={(e) =>
              setData((datas) => ({ ...datas, firstText: e.target.value }))
            }
          />
          <label htmlFor="video2" className="text-left mt-2">
            Second Text
          </label>
          <input
            type="text"
            name="youtubes"
            id="video2"
            value={data.secondText}
            onChange={(e) =>
              setData((datas) => ({ ...datas, secondText: e.target.value }))
            }
          />

          <label htmlFor="video1" className="text-left mt-2">
            Side Image
          </label>
          <div className="mb-2 mt-1 text-left styling-filebase64">
            <FileBase64
              type="file"
              refs={ref2}
              multiple={true}
              onDone={(e) =>
                setData(() => ({ ...data, sideimage: e[0].base64 }))
              }
            />
          </div>
        </form>
      </section>
      <section className="row my-2">
        <header
          className="col-lg col-12 text-left h5 bannerfont"
          style={{ fontWeight: 600 }}
        >
          Tutoroial Video
        </header>
        <form className="col d-flex flex-column justify-content-left align-items-left col shadow card my-1">
          <label htmlFor="video1" className="text-left mt-2">
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
        </form>
      </section>
      <section className="row my-2">
        <header
          className="col-lg col-12 text-left h5 bannerfont"
          style={{ fontWeight: 600 }}
        >
          Keyboard section
        </header>
        <form className="col d-flex flex-column justify-content-left align-items-left col shadow card my-1">
          <label htmlFor="video1" className="text-left mt-2">
            Keyboard Section Text
          </label>
          <input
            type="text"
            name="youtubes"
            id="video1"
            value={data.key_text}
            onChange={(e) =>
              setData(() => ({ ...data, key_text: e.target.value }))
            }
          />

          <label htmlFor="video1" className="text-left mt-2">
            Keyboard Image
          </label>
          <div className="mb-2 mt-1 text-left styling-filebase64">
            <FileBase64
              type="file"
              refs={ref}
              multiple={true}
              className="mb-3"
              onDone={(e) => {
                setData(() => ({ ...data, key_image: e[0].base64 }));
              }}
            />
          </div>
        </form>
      </section>
      <section className="row my-2">
        <header
          className="col-lg col-12 text-left h5 bannerfont"
          style={{ fontWeight: 600 }}
        >
          Frequently Asked Questions
        </header>
        <div className="col shadow card my-1">
          {/* <div className="d-flex justify-content-between">
            <button
              onClick={handleadd}
              style={{ backgroundColor: "#1565c0", color: "white" }}
              className="my-2 py-1 px-2 rounded"
            >
              Add
            </button>
            <button
              onClick={() =>
                setArrayValue((vals) => {
                  if (vals > 1) {
                    return vals - 1;
                  }
                })
              }
              style={{ backgroundColor: "#1565c0", color: "white" }}
              className="my-2 py-1 px-2 rounded"
            >
              Remove
            </button>
          </div> */}
          <form>
            {[...Array(7).keys()].map((vals, index) => {
              return (
                <div
                  key={index}
                  className="d-flex flex-column justify-content-left align-items-left"
                >
                  <label htmlFor="que" className="text-left mt-2">
                    {texts[index] + " "}Questions
                  </label>
                  <input
                    type="text"
                    name="que"
                    className="rounded"
                    value={faqstate[index].ques}
                    onChange={(e) => handlechangeof_faq(index, e)}
                  />
                  <label htmlFor="ans" className="text-left mt-2">
                    Answer
                  </label>
                  <input
                    type="text"
                    name="ans"
                    className="mb-3 rounded"
                    value={faqstate[index].ans}
                    onChange={(e) => handlechangeof_faqans(index, e)}
                  />
                  <hr className="border-primary font-weight-bold" />
                </div>
              );
            })}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
