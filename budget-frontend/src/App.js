import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Onboarding from "./components/Onboarding";
import Analytics from "./components/Analytics";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [logInStatus, setLogInStatus] = useState({
    status: "not_logged_in",
    user: ""
  });
  const [refreshGoals, setRefreshGoals] = useState(false);

  const handleLogin = data => {
    setLogInStatus({
      status: "logged_in",
      user: data
    });
  };

  const handleLogout = data => {
    if (!data.logged_in) {
      setLogInStatus({
        status: "not_logged_in",
        user: ""
      });
    }
  };

  const logOutClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then(res => {
        handleLogout(res);
      })
      .catch(err => console.log("logout error", err));
  };

  const checkLogInStatus = () => {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then(res => {
        if (res.data.logged_in && logInStatus.status === "not_logged_in") {
          handleLogin(res.data.user);
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
          render={() => (
            <Login handleLogin={handleLogin} logInStatus={logInStatus} />
          )}
        />
        <Route
          path="/register"
          render={() => <Register handleLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          render={() => (
            <Dashboard
<<<<<<< HEAD
=======
              refreshGoals={refreshGoals}
              setRefreshGoals={setRefreshGoals}
>>>>>>> 6bc9ae5de27aef88dc2d9a0cb2ce223f064331f7
              checkLogInStatus={checkLogInStatus}
              handleLogout={handleLogout}
              logInStatus={logInStatus}
            />
          )}
        />
        <Route path="/onboarding" render={() => <Onboarding />} />
        <Route path="/analytics" render={() => <Analytics />} />
        <Route
          path="/profile"
          render={() => (
            <Profile
              handleLogin={handleLogin}
              logInStatus={logInStatus}
              checkLogInStatus={checkLogInStatus}
              logOutClick={() => logOutClick()}
            />
          )}
        />
        <Route path="/leaderboard" render={() => <Leaderboard />} />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </Router>
  );
}
