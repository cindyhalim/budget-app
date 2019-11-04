import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PieChartIcon from "@material-ui/icons/PieChart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import HomeIcon from "@material-ui/icons/Home";
import AddTransactionOption from "./addTransaction/AddTransactionOption";

export default function Navbar() {
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [value, setValue] = useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();

  return (
    <BottomNavigation
      value={value}
      onClick={handleChange}
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        backgroundColor: "lightblue"
      }}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        containerElement={<Link to="/dashboard" />}
      />

      <BottomNavigationAction
        label="Store"
        value="store"
        icon={<StoreMallDirectoryIcon />}
        containerElement={<Link to="/store" />}
      />

      <BottomNavigationAction
        label="Add Paymnet"
        onClick={() => setOpenAddTransaction(true)}
        icon={<AddCircleOutlineIcon />}
      />
      <AddTransactionOption
        openAddTransaction={openAddTransaction}
        changeOpenStatus={data => setOpenAddTransaction(data)}
      />
      <Link to="/analytics">
        <BottomNavigationAction label="Analytics" icon={<PieChartIcon />}>
          Analytics
        </BottomNavigationAction>
      </Link>
      <Link to="/profile">
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </Link>
    </BottomNavigation>
  );
}
