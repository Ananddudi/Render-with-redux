import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import { useSelector } from "react-redux";

export const Feature = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const youtubevide_link = useSelector((state) => state.adminReducer);

  const squareVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
    hidden: { opacity: 0, scale: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // useEffect(() => {
  //   //api call for video
  // }, []);

  console.log("hompage youtube", youtubevide_link.homepage_youtube);

  return (
    <>
      <div id="overview" className="software-overview-area p-2 my-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 ">
              <div className="site-heading text-center">
                <h5>Overview</h5>
                <h2 className="area-title bannerdec">Tutorial</h2>
                <div className="devider"></div>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={squareVariants}
          className="my--5 pr-5 pl-5 pt-0 text-center square mr-sm-0"
        >
          <iframe
            width="100%"
            height="500"
            title="uniqueID"
            frameBorder="0"
            allowFullScreen
            className="shadow-lg"
            src={`https://www.youtube.com/embed/${youtubevide_link.homepage_youtube}`}
          ></iframe>
        </motion.div>
      </div>
    </>
  );
};
