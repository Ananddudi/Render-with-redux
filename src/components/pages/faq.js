import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import Collapse from "@mui/material/Collapse";
import { useSelector } from "react-redux";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import sideimage from "../../assets/img/illustration/9.png";

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

export const Fquestion = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const faq = useSelector((state) => state.adminReducer.faq_questions_answers);

  const [showdec, setShowdec] = useState({
    value: false,
    ids: "",
  });

  const squareVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 2 } },
    hidden: { opacity: 0, x: 200 },
  };
  const squareVariantstwo = {
    visible: { opacity: 1, x: 0, transition: { duration: 2 } },
    hidden: { opacity: 0, x: -200 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <div className="faq-area default-padding-top">
        <div className="container">
          <div className="faq-items">
            <div className="row align-center">
              <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={squareVariantstwo}
                className="col-lg-6 square"
              >
                <div className="thumb wow fadeInLeft" data-wow-delay="0.5s">
                  <img src={sideimage} alt="Thumb" />
                </div>
              </motion.div>

              <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={squareVariants}
                className="col-lg-6 square"
              >
                <div className="faq-content">
                  <h2 className="area-title bannertitle2">FAQ</h2>
                  <div className="accordion" id="accordionExample">
                    {faq.map((content, index) => {
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
                        <div key={index} className="card">
                          <div className="card-header">
                            <h4
                              className="mb-0 bannerdec3"
                              onClick={() =>
                                setShowdec((prev) => ({
                                  ids: index,
                                  value: !prev.value,
                                }))
                              }
                            >
                              {showdec.value && showdec.ids === index ? (
                                <span>
                                  {questions}{" "}
                                  <BsFillArrowDownCircleFill className="text-success float-right" />{" "}
                                </span>
                              ) : (
                                <span>
                                  {questions}{" "}
                                  <BsFillArrowRightCircleFill className="text-info float-right" />{" "}
                                </span>
                              )}
                            </h4>
                          </div>
                          <Collapse
                            in={showdec.value}
                            timeout="auto"
                            unmountOnExit
                          >
                            {showdec.value && showdec.ids === index && (
                              <div className="card-body">
                                <p className="text-dark">{answer}</p>
                              </div>
                            )}
                          </Collapse>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
