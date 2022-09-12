import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./assetsSRC/styles.css";
import { legacy_createStore as createStore } from "redux";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import reducers from "./components/reduxstore/reduxis";
import "./assets/css/bootstrap.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/themify-icons.css";
import "./assets/css/elegant-icons.css";
import "./assets/css/flaticon-set.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/owl.carousel.min.css";
import "./assets/css/owl.theme.default.min.css";
import "./assets/css/animate.css";
import "./assets/css/bootsnav.css";
import "./style.css";
import "./assets/css/responsive.css";

let store = createStore(reducers);

function Mainfun() {
  useEffect(() => {
    document.cookie = "SameSite=Lax";
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

ReactDOM.render(<Mainfun />, document.getElementById("root"));
