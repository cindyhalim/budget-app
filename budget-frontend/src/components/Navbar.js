import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PieChartIcon from "@material-ui/icons/PieChart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";

export default function Navbar() {
  // const history = useHistory();
  return (
    <BottomNavigation
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        backgroundColor: "lightblue"
      }}
    >
      <Link to="/dashboard">
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      </Link>
      <Link to="/leaderboard">
        <BottomNavigationAction
          label="Leaderboard"
          icon={<FormatListNumberedIcon />}
        />
      </Link>

      <BottomNavigationAction label="Recents" icon={<AddCircleOutlineIcon />} />
      <Link to="analytics">
        <BottomNavigationAction label="Recents" icon={<PieChartIcon />} />
      </Link>
      <BottomNavigationAction label="Recents" icon={<AccountCircleIcon />} />
    </BottomNavigation>
  );
}
