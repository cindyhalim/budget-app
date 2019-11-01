import React from "react";
import { useHistory } from "react-router-dom";

export default function DashboardProfile(props) {
  const history = useHistory();
  return (
    <div>
      <div style={{ height: "50px", width: "20%", border: "1px solid black" }}>
        Profile Pic
      </div>
      <p>Logged in: {props.user}</p>
      <p
        onClick={() => {
          props.logOutClick();
          history.push("/");
        }}
      >
        Logout
      </p>
    </div>
  );
}
