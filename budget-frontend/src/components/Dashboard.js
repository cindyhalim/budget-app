import React from "react";

import Navbar from "./Navbar";
import CreateGoal from "./CreateGoal";
import DashboardProfile from "./DashboardProfile";

export default function Dashboard(props) {
  props.checkLogInStatus();

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <DashboardProfile
        user={props.logInStatus.user}
        logOutClick={() => props.logOutClick()}
      />
      <CreateGoal />
      <Navbar />
    </div>
  );
}
