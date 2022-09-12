import React, { useState, useEffect } from "react";
import screenshot from "../assets/screenshot.png";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const direction = [
  {
    number: "01",
    directions:
      "To go full-screen, hover your mouse at the bottom and select the full screen icon.",
  },
  {
    number: "02",
    directions:
      "When inactive for 5 minutes, the connection will automatically disconnect (make sure to save your work).",
  },
  {
    number: "03",
    directions:
      "Use a mouse for a better experience (right mouse click / zoom).",
  },
  {
    number: "04",
    directions:
      "Internet speed of 10mbps download and 70ms or less latency is recommended for best results.",
  },
];

export const Process = ({ myRef }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [showlist, setShowlist] = useState(2);

  const squareVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
    hidden: { opacity: 0, y: 200 },
  };

  const access = useSelector((state) => state.reducer.allowaccess);

  const handleview = () => {
    if (showlist === 2) {
      setShowlist(direction.length + 1);
    } else {
      setShowlist(2);
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={squareVariants}
        id="process"
        className="process-area default-padding-top square"
      >
        <div ref={myRef} className="shape-left-top shape opacity-default">
          <img src="assets/img/shape/7.png" alt="Shape" />
        </div>

        <div className="container">
          <div className="row align-center">
            <div className="col-lg-6 thumb">
              <Link
                // to={access ? "/dashboard" : "/auth/login"}
                to="/render"
              >
                <img src={screenshot} alt="Thumb" />
              </Link>
            </div>
            <div className="col-lg-6 info ml-auto">
              <h2 className="area-title bannertitle2">
                Start RenderNow Session
              </h2>
              <h3 className="bannerdec">
                Click on the play button Left to start using RenderNow.
              </h3>
              <ul>
                {direction.slice(0, showlist).map((directionis) => {
                  const { number, directions } = directionis;
                  return (
                    <li key={number}>
                      <div
                        className={`icon ${parseInt(number) === 1 && "mt-4"}`}
                      >
                        <i className="flaticon-presentation"></i>
                        <span>{number}</span>
                      </div>
                      <div className="info mt-4">
                        <p>{directions}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Button
                variant="contained"
                className="float-right mt-2"
                onClick={handleview}
                sx={{
                  fontWeight: "700",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#1976d2",
                  },
                }}
              >
                {showlist !== 2 ? "View Less" : "View More"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
