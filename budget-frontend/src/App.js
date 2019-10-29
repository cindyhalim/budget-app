import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";

function App() {
  const [logInStatus, setLogInStatus] = useState({
    status: "not_logged_in",
    user: {}
  });

  const handleLogin = data => {
    setLogInStatus({
      status: "logged_in",
      user: data.data.user[0]
    });
  };

  const handleLogout = data => {
    if (!data.logged_in) {
      setLogInStatus({
        status: "not_logged_in",
        user: {}
      });
    }
  };

  const checkLogInStatus = () => {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then(res => {
        console.log(res);
        if (res.data.logged_in && logInStatus.status === "not_logged_in") {
          console.log("here");
          handleLogin(res);
        }

        if (!res.data.logged_in && logInStatus === "logged_in") {
          setLogInStatus({
            status: "not_logged_in",
            user: {}
          });
        }
      })
      .catch(err => console.log("check log in error", err));
  };

  return (
    <Router>
      <Switch>
        <Route
          path="/login"
          render={props => <Login {...props} handleLogin={handleLogin} />}
        />
        <Route
          path="/register"
          render={props => <Register {...props} handleLogin={handleLogin} />}
        />
        <Route
          path="/main"
          render={props => (
            <Main
              {...props}
              checkLogInStatus={checkLogInStatus}
              handleLogout={handleLogout}
              logInStatus={logInStatus}
            />
          )}
        />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </Router>
  );
}

export default App;
