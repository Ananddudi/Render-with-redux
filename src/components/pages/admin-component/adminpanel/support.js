import React, { useState } from "react";
import { supportpageapi } from "./hooks/apis";
import { useSelector, useDispatch } from "react-redux";

const texts = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
];

const Support = () => {
  // const [array_value, setArrayValue] = useState(1);
  const [data, setData] = useState({
    main: "",
    below: "",
    link: "",
  });

  const dispatch = useDispatch();

  const [faqstate, setFaqstate] = useState([
    { ques: "", ans: "" },
    { ques: "", ans: "" },
    { ques: "", ans: "" },
    { ques: "", ans: "" },
    { ques: "", ans: "" },
    { ques: "", ans: "" },
    { ques: "", ans: "" },
  ]);

  const response = useSelector((state) => state.adminReducer.support_message);

  const handleSubmit = (e) => {
    e.preventDefault();
    supportpageapi(data, faqstate, dispatch);
    setData({
      main: "",
      below: "",
      link: "",
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
    <>
      {response && (
        <div
          className="alert alert-success mt-2 text-center font-weight-bold bannerdec2"
          role="alert"
        >
          Changes are successfully applied
        </div>
      )}
      <section className="row my-3 justify-content-end mx-1">
        <button
          type="submit"
          style={{ backgroundColor: "#1565c0", color: "white" }}
          className="my-2 py-2 px-3 rounded font-weight-bold shadow-lg oncea-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </section>
      <section
        className="d-flex justify-content-center my-3 flex-column align-items-center w-100"
        style={{
          borderBottom: "0.2rem solid rgb(25, 118, 210)",
          borderRadius: "8px",
        }}
      >
        <section className="container-fluid w-100 bannerdec2">
          <div className="row w-100">
            <article className="col-12">
              <div className="row">
                <header
                  className="col text-left h5 bannerfont"
                  style={{ fontWeight: 600 }}
                >
                  Main text
                </header>
                <textarea
                  className="shadow card px-2"
                  rows="4"
                  cols="30"
                  value={data.main}
                  onChange={(e) =>
                    setData(() => ({ ...data, main: e.target.value }))
                  }
                />
              </div>
              <div className="row my-2">
                <header
                  className="col text-left h5 bannerfont"
                  style={{ fontWeight: 600 }}
                >
                  below Text
                </header>
                <input
                  className="shadow card px-2"
                  placeholder="below text"
                  value={data.below}
                  onChange={(e) =>
                    setData(() => ({ ...data, below: e.target.value }))
                  }
                />
              </div>

              <div className="row my-3">
                <form className="d-flex justify-content-between w-100">
                  <header
                    className="col-lg col-12 text-left h5 bannerfont text-left"
                    style={{ fontWeight: 600 }}
                  >
                    FeedBack Form
                  </header>
                  <span className="shadow-lg card py-1 px-3 pb-2 rounded">
                    <label
                      htmlFor="monday.com"
                      className="text-left h5 bannerfont"
                    >
                      Feedback Form
                    </label>
                    <textarea
                      type="text"
                      placeholder="Place 'iframe' link here"
                      name="monday.com"
                      className="px-2"
                      rows="6"
                      cols="30"
                      value={data.link}
                      onChange={(e) =>
                        setData(() => ({ ...data, link: e.target.value }))
                      }
                    />
                  </span>
                </form>
              </div>

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
                      onClick={() => setArrayValue((vals) => vals + 1)}
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
                          <hr className="border-primary" />
                        </div>
                      );
                    })}
                  </form>
                </div>
              </section>
            </article>
          </div>
        </section>

        {/* <section className="my-3 w-100">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name Of Fields</th>
              <th scope="col">Inputs</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Dashboard Text</th>
              <td>
                <div>
                  <textarea
                    value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    // onChange={this.handleChange}
                    rows={5}
                    cols={5}
                    className="w-100 h-100"
                  />
                </div>
              </td>
              <td className="text-danger">No Option</td>
            </tr>
            {data.map((rowdata) => {
              const { id, link } = rowdata;
              return (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>
                    <div>
                      <input type="text" value={link} />
                    </div>
                  </td>
                  <td className="text-danger">
                    <AiFillDelete
                      className="h4"
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section> */}
      </section>
    </>
  );
};

export default Support;
