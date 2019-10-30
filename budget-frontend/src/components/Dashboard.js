import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import CreateGoal from "./CreateGoal";

export default function Dashboard(props) {
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
      <CreateGoal />
      <Navbar />
    </div>
  );
}
