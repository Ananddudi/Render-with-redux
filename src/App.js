import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, AdminPage } from "./components/index";
import Auth from "./auth";
import { getalldata } from "./components/pages/admin-component/adminpanel/hooks/apis";
import { useDispatch } from "react-redux";

// uncommment it
// import { PrivateRoute } from "./components/pages/private/privateroute";
// import PageNotFound from "./components/pages/private/page404";
import Emulator from "./components/pages/admin-component/emulatornew";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "load_loader" });
    getalldata(dispatch);
    const executefun = async () => {
      await fetch("https://rvent-render-backend.herokuapp.com/");
    };
    executefun();
    setTimeout(() => {
      dispatch({ type: "unload_loader" });
    }, 3300);
  }, []);

  return (
    <div>
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          {/* remove it */}
          <Route path="/dashboard" component={AdminPage} />
          <Route path="/render" component={Emulator} />
          {/* <Route path="/auth/login" component={Emulator} /> */}

          {/* uncomment it */}
          {/* <PrivateRoute path="/dashboard">
            <AdminPage />
          </PrivateRoute> */}
          {/* <Route
            exact
            path={localStorage.getItem("token") ? "/render" : "/no-data"}
            component={Emulator}
          />
          <Route path="*" component={PageNotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}
