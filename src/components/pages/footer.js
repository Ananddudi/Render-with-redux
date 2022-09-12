import React, { useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

export const Footer = () => {
  const [scale, setScale] = useState({
    a: false,
    b: false,
    c: false,
  });

  const increaseSize = (val) => {
    setScale({ ...scale, [val]: true });
  };
  const decreaseSize = (val) => {
    setScale({ ...scale, [val]: false });
  };

  return (
    <footer className="bg-dark text-light pt-2 mt-4">
      <div className="container">
        <div className="f-items p-4">
          <div className="row justify-content-center">
            <div className="col text-center">
              <div>
                <AiFillFacebook
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/eventrenderofficial",
                      "_blank"
                    )
                  }
                  className={`facebookcolor ${
                    scale.a ? "iconsizedec" : "iconsizes"
                  }`}
                />
              </div>
              <div className="mt-2">
                <span
                  className="h5 bannerdec3"
                  onMouseEnter={() => increaseSize("a")}
                  onMouseOut={() => decreaseSize("a")}
                >
                  Facebook
                </span>
              </div>
            </div>
            <div className="col text-center blur">
              <div>
                <AiOutlineInstagram
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/accounts/login/?next=/virtually3devents/",
                      "_blank"
                    )
                  }
                  className={`instagramcolor ${
                    scale.b ? "iconsizedec" : "iconsizes"
                  }`}
                />
              </div>
              <div className="mt-2">
                <span
                  className="h5 bannerdec3"
                  onMouseEnter={() => increaseSize("b")}
                  onMouseOut={() => decreaseSize("b")}
                >
                  Instagram
                </span>
              </div>
            </div>
            <div className="col text-center">
              <div>
                <AiFillLinkedin
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/eventrender?original_referer=https%3A%2F%2Fwww.eventrender.com%2F",
                      "_blank"
                    )
                  }
                  className={`linkedincolor ${
                    scale.c ? "iconsizedec" : "iconsizes"
                  }`}
                />
              </div>
              <div className="mt-2">
                <span
                  className="h5 bannerdec3 pt-3"
                  onMouseEnter={() => increaseSize("c")}
                  onMouseOut={() => decreaseSize("c")}
                >
                  Linkedin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
