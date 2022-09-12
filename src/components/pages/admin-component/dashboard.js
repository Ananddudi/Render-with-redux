import React from "react";
import Button from "@mui/material/Button";
import userimage from "../../assets/userimage.gif";
import screenshot from "../../assets/clientimage/evnrender.jpg";
import { AiFillPlayCircle } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

export function MainDashboard({ open }) {
  const history = useHistory();
  // const [date, setDate] = useState("No data");
  // const [time, setTime] = useState("Time Error");
  const dashSelector = useSelector((state) => state.adminReducer);

  // useEffect(() => {
  //   const month = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   if (localStorage.getItem("lastlogin")) {
  //     const d = localStorage.getItem("lastlogin").split(" ");
  //     const value = month.find((item, index) => {
  //       if (item.substring(0, 3) === d[1]) {
  //         return item;
  //       }
  //       return "";
  //     });
  //     function tConvert(time) {
  //       time = time
  //         .toString()
  //         .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  //       if (time.length > 1) {
  //         time = time.slice(1);
  //         time[5] = +time[0] < 12 ? "AM" : "PM";
  //         time[0] = +time[0] % 12 || 12;
  //       }
  //       return time.join("");
  //     }

  //     const timeis = tConvert(`${d[4]}`);
  //     const newstr = timeis.slice(0, -2);
  //     const pmam = timeis.substr(-2, 2);
  //     const mon = month.indexOf(value);
  //     setDate(`${mon}/${d[2]}/${d[3]}`);
  //     setTime(`${newstr} ${pmam}`);
  //   }
  // }, []);

  return (
    <div className={`${open && "checktoggler"}`}>
      <>
        <div className={`${open && "toggling-fun"} container`}>
          <div className="shadow-lg bg-white px-2 py-1 mt-3 rounded">
            <div className="row justify-content-center bannerrender mt-4 mb-2 animationofwelcome">
              <Typography
                className="text-center"
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    lg: 30,
                    md: 20,
                    sm: 20,
                  },
                }}
              >
                {dashSelector.dashboardContent.welcome === ""
                  ? "Welcome"
                  : dashSelector.dashboardContent.welcome}
              </Typography>
            </div>
            <p className="bannerdec3 text-center fontsizeofwelcometext">
              {dashSelector.dashboardContent.welcome_text === ""
                ? `Note: To upload images for screens or signs, create an account
                at imgbb.com. Upload images to your account and then navigate to
                your image within the RenderNow program and copy the “DIRECT
                LINK” to your image, then paste it into the logo field. Watch a
                quick tip video here: Upload Images Tip`
                : dashSelector.dashboardContent.welcome_text}
            </p>
          </div>
          <div className="text-center mt-3">
            <div className="container my--5 text-center square mr-md-5 mr-sm-0 pr-lg-3 pl-lg-3 pl-0 pr-0 mb-5">
              <iframe
                title="uniqueID"
                frameBorder="0"
                allowFullScreen
                className="shadow-lg iframe-height"
                src={`https://www.youtube.com/embed/${dashSelector.dashboardContent.explain_video}`}
              ></iframe>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
