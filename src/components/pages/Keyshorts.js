import React, { useEffect } from "react";
import keyboard from "../assets/keyboard.png";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import { useSelector } from "react-redux";

export const Keyshorts = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const squareVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    hidden: { opacity: 0, y: 100 },
  };
  const keyboardselector = useSelector((state) => state.adminReducer);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <div
        id="blog"
        className="blog-area default-padding bg-gray square bottom-less mt-5"
      >
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={squareVariants}
          className="square"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="site-heading text-center">
                  <h2 className="area-title bannertitle2">
                    Keyboard Shortcuts
                  </h2>
                  <div className="devider"></div>
                  <p className="bannerdec3">
                    {keyboardselector.keyborad_section_text}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <img
                src={
                  keyboardselector.keyboard_image !== ""
                    ? keyboardselector.keyboard_image
                    : keyboard
                }
                alt="keyb"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
