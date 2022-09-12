import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

import {
  BsFillArrowRightCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

const faq_dummy = [
  {
    ques: "Can I save my project and come back to it later?",
    ans: "Yes, you can currently save a maximum of 10 projects by going to the Save Menu and creating a new saved project.",
  },
  {
    ques: "How can I save my render or download it?",
    ans: "We are working on a download render feature. For now you have to hit the “H” key on your keyboard to hide the interface and then take a screenshot to save a rendering.",
  },
  {
    ques: "How can I add specific graphics to my project, like logos to screens or signs?",
    ans: "To upload images for screens or signs, create an account at imgbb.com. Upload images to your account and then navigate to your image within the RenderNow program and copy the “DIRECT LINK” to your image, then paste it into the logo field. Watch a quick tip video here: Upload Images Tip",
  },
  {
    ques: "Are there more camera angles and views for renderings?",
    ans: "Use numbers 1-4 on your keyboard to switch camera angles. In camera view number 1 you can hold the right mouse button to move the camera around, as well as the A, W, S, D, Q and E keys.",
  },
  {
    ques: "Some of the objects do not show up as selected (with a white outline around them).",
    ans: "Objects that are translucent currently are not able to show an outline around them, but they are actually selected. This is the same with grouped objects (currently they will not have a white outline around them when grouped).",
  },
  {
    ques: "Are there any venues that can be added to show a room or space that the event is in?",
    ans: "We are currently working on a few generic venues to be used and will implement them in the upcoming releases",
  },
  {
    ques: "Will you be adding more 3D models to the program?",
    ans: "Yes, we are always adding more models to the program, but we also need requests from you so that we can decide which models are priorities. Please send us a chat, email or schedule a meeting to discuss topics like this.",
  },
];

export function Support({ open }) {
  const [showdec, setShowdec] = useState({
    value: false,
    ids: "",
  });

  const selector = useSelector((state) => state.adminReducer);

  return (
    <div className={`${open && "toggling-fun"}`}>
      <div className="faq-area mt-4">
        <div className="container">
          <div className="faq-items">
            <div className="row justify-content-center px-5">
              <div className="card shadow-lg ml-lg-4 ml-0 mr-lg-4 mr-0 p-3">
                <div className="col-sm px-5 text-center">
                  <Typography variant="h6">
                    {selector.supportsection.head_text === ""
                      ? "Contact us through the live chat button on the bottom right of the screen if you have any questions or need help with anything. You can chat or do a video / screen share call."
                      : selector.supportsection.head_text}
                  </Typography>
                </div>
                <div className="col-sm px-5 text-center">
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    {selector.supportsection.below_text === ""
                      ? "*Live support is available from 9 am - 5 pm Mountain Time (excluding weekends)"
                      : selector.supportsection.below_text}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="row justify-content-center mr-3 ">
              <div className="d-flex flex-column flex-md-row">
                <div className="faq-content w-100 pl-3">
                  <iframe
                    title="unique"
                    src={selector.supportsection.iframe_link}
                    height="500"
                    allowFullScreen={true}
                    className="monday-com rounded mt-5 border-0"
                  />
                </div>
                <div className="faq-content w-100 pl-sm-3 ml-3 mr-5 ml-md-0 mr-md-0 pr-md-0">
                  <h5 className="area-title bannertitle2 mt-4">
                    Frequently Asked Questions
                  </h5>
                  <div className="accordion" id="accordionExample">
                    <div className="card mb-5 shadow-sm">
                      {selector.supportsection.faq.map((content, index) => {
                        let questions = "";
                        let answer = "";
                        let { ques, ans } = content;
                        if (ques === "") {
                          questions = faq_dummy[index].ques;
                        } else {
                          questions = ques;
                        }
                        if (ans === "") {
                          answer = faq_dummy[index].ans;
                        } else {
                          answer = ans;
                        }

                        return (
                          <div key={index}>
                            <div className="card-header">
                              <h4
                                className="pt-3 pl-3 pb-3 bannerdec3 "
                                onClick={() =>
                                  setShowdec((prev) => ({
                                    ids: index,
                                    value: !prev.value,
                                  }))
                                }
                              >
                                {showdec.value && showdec.ids === index ? (
                                  <div className="d-flex justify-content-between">
                                    <i className="text-info">{questions}</i>
                                    <span>
                                      <BsFillArrowDownCircleFill className="text-info float-right ml-2 position-absolute" />
                                    </span>
                                  </div>
                                ) : (
                                  <div className="d-flex justify-content-between">
                                    <i>{questions}</i>
                                    <span>
                                      <BsFillArrowRightCircleFill className="text-info float-right ml-2 position-absolute" />
                                    </span>
                                  </div>
                                )}
                              </h4>
                            </div>
                            <Collapse
                              in={showdec.value}
                              timeout="auto"
                              unmountOnExit
                            >
                              {showdec.value && showdec.ids === index && (
                                <div className="card-body border-top border-info">
                                  <p className="text-dark  mb-1 ml-3 mr-3 font-weight-light">
                                    {answer}
                                  </p>
                                </div>
                              )}
                            </Collapse>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
