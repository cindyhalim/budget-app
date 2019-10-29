import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Onboarding(props) {
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
      <h1>Welcome to Main</h1>
      <p>Logged in: {props.logInStatus.status}</p>
      <p onClick={() => logOutClick()}>Logout</p>
    </div>
  );
}
