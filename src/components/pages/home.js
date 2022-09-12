import React from "react";
import banner from "../assets/clientimage/evnrender3.jpg";
import { Feature } from "./feature";
import { Process } from "./Process";
import { Fquestion } from "./faq";
import { Keyshorts } from "./Keyshorts";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import { Modal } from "./modal";
import image1 from "../../assetsSRC/EventRender.png";
import Box from "@mui/material/Box";
import { Navbar } from "../navbar/navbar";
import { Footer } from "./footer";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

export const Home = () => {
  // const access = useSelector((state) => state.allowaccess);
  const history = useHistory();
  // const dispatch = useDispatch();
  const homepageselector = useSelector((state) => state.adminReducer);
  const loader = useSelector((state) => state.adminReducer.unload_loader);

  // console.log("homepage selector", homepageselector);

  const executeScroll = () => {
    // if (access) {
    history.push("/dashboard");
    // } else {
    //   history.push("/auth/login");
    // }
  };
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     dispatch({ type: "allow" });
  //   } else {
  //     dispatch({ type: "disallow" });
  //   }
  // }, []);

  if (loader) {
    return (
      <div
        style={{ height: "100vh", width: "100vw" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="d-flex flex-column align-items-center">
          <div>
            <ReactLoading type="cubes" color="#1976d2" />
          </div>
          <div className="h3 font-weight-bold bannertitle mt-3">
            Loading Please Wait
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={loader || `fadeinEffect`}>
      <Navbar />
      <div className="d-flex justify-content-center flex-column">
        <div
          className="banner-area bottom-shadow big-thumb text-default bg-fixed shadow dark text-light"
          style={{
            backgroundImage: `url(${
              homepageselector.backgroundImage
                ? homepageselector.backgroundImage
                : banner
            })`,
          }}
        >
          <div className="box-table mt-0 pt-0 mt-sm-5 pt-sm-5">
            <div className="box-cell">
              <div className="container">
                <div className="double-items">
                  <div className="row align-center">
                    <div className="col-lg-6 left-info simple-video my-5">
                      <motion.div
                        initial={{ x: -90, opacity: 0 }}
                        animate={{
                          x: 0,
                          opacity: 1,
                        }}
                        transition={{ duration: 2 }}
                        className="content"
                        data-animation="animated fadeInUpBig"
                      >
                        <h4 className="fadeInDown" data-wow-duration="1s">
                          <strong className="h1 bannertitles">RENDER</strong>
                          <strong className="h1 bannertitle">NOW</strong>
                        </h4>
                        <h5 className="bannerdec font-weight-bold">
                          USER PORTAL
                        </h5>
                        <h6 className="bannerdec2 border border-right-0 border-left-0 border-light rounded p-2">
                          {homepageselector.homepage_first_text}
                        </h6>
                        <p className="wow bannerdec3 fadeInLeft">
                          {homepageselector.homepage_second_text}
                        </p>
                        <i className="bannercustom rounded pl-1 pr-2 h6">
                          <span className="h3 font-weight-bold">L</span>
                          <span className="font-weight-bold">
                            ive support is available from 9am - 5pm Mountain
                            Time (excluding weekends)
                          </span>
                        </i>
                        <div className="bottom mt-3 rounded shadow">
                          <Button
                            variant="contained"
                            sx={{
                              fontWeight: "bold",
                              width: "auto",
                              "&:hover": {
                                backgroundColor: "white",
                                color: "#1976d2",
                                width: "auto",
                              },
                            }}
                            onClick={executeScroll}
                          >
                            <span className="bannerdec3">Start Render</span>
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ x: 90, opacity: 0 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                      }}
                      transition={{ duration: 2 }}
                      className="col-lg-6 right-info"
                    >
                      <Box>
                        <img
                          width={690}
                          height={350}
                          className="mt-4"
                          src={
                            homepageselector.banner_image
                              ? homepageselector.banner_image
                              : image1
                          }
                          alt="banners_images"
                        />
                      </Box>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Feature />
        <Process />
        <Keyshorts />
        <Fquestion />
        <Modal />
        <Footer />
      </div>
    </div>
  );
};
