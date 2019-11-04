import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Onboarding from "./components/Onboarding";
import Analytics from "./components/Analytics";
import Profile from "./components/Profile";
import Store from "./components/Store";
import Navbar from "./components/Navbar";

export default function App() {
  const [logInStatus, setLogInStatus] = useState({
    status: "not_logged_in",
    user: ""
  });
  const [refreshGoals, setRefreshGoals] = useState(false);
  const [image, setImage] = useState(new Set());
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

  useEffect(() => {
    for (let img of [1, 3, 5, 10]) {
      if (
        logInStatus.user.num_times_bud_met !== 0 &&
        img <= logInStatus.user.num_times_bud_met
      ) {
        setImage(image.add(`http://localhost:3000/check_badges/?badge=${img}`));
      }
    }
  }, [logInStatus]);

  function updateHealthAndCoins(coins, hp) {
    axios.get(`http://localhost:3000/game/?coins=${coins}&hp=${hp}`, {
      withCredentials: true
    });
    setLogInStatus({
      ...logInStatus,
      user: {
        ...logInStatus.user,
        coins: logInStatus.user.coins + coins,
        hp: logInStatus.user.hp + hp
      }
    });
  }

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
          axios
            .get("http://localhost:3000/check_budget_met", {
              withCredentials: true
            })
            .then(result => {
              setLogInStatus({
                status: "logged_in",
                user: result.data.user
              });
            });
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
          path="/home"
          render={() => (
            <Dashboard
              refreshGoals={refreshGoals}
              setRefreshGoals={setRefreshGoals}
              checkLogInStatus={checkLogInStatus}
              handleLogout={handleLogout}
              logInStatus={logInStatus}
              updateCoins={amt =>
                setLogInStatus({
                  ...logInStatus,
                  user: {
                    ...logInStatus.user,
                    coins: amt
                  }
                })
              }
              minusHP={amt =>
                setLogInStatus({
                  ...logInStatus,
                  user: {
                    ...logInStatus.user,
                    hp: logInStatus.user.hp - amt
                  }
                })
              }
              resetHP={amt =>
                setLogInStatus({
                  ...logInStatus,
                  user: {
                    ...logInStatus.user,
                    hp: amt
                  }
                })
              }
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
              setLoginStatus={setLogInStatus}
            />
          )}
        />
        <Route
          path="/store"
          render={() => (
            <Store
              checkLogInStatus={checkLogInStatus}
              coins={logInStatus.user.coins}
              hp={logInStatus.user.hp}
              subtractCoinsAddHP={(hp, coins) =>
                updateHealthAndCoins(hp, coins)
              }
              budgetAchieved={logInStatus.user.num_times_bud_met}
              images={image}
            />
          )}
        />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </Router>
  );
}
