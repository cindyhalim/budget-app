import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import CreateGoal from "./CreateGoal";
import SavedGoals from "./SavedGoals";

export default function Dashboard(props) {
  const [newGoal, setNewGoal] = useState({
    createGoal: {
      name: "",
      amount: "",
      start_date: new Date(Date.now()),
      end_date: new Date(Date.now()),
      error: ""
    },
    goals: []
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/goals", { withCredentials: true })
      .then(res => {
        setNewGoal({ ...newGoal, goals: res.data.goals });
      });
  }, []);

  props.checkLogInStatus();
  const history = useHistory();
  const logOutClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then(res => {
        props.handleLogout(res);
        history.push("/");
      })
      .catch(err => console.log("logout error", err));
  };
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <p>Logged in: {props.logInStatus.status}</p>
      <p onClick={() => logOutClick()}>Logout</p>

      <h3>Saving Goals:</h3>
      <CreateGoal newGoal={newGoal} setNewGoal={setNewGoal} />
      <SavedGoals goals={newGoal} setGoals={setNewGoal} />
      <Navbar />
    </div>
  );
}
