import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PieChartIcon from "@material-ui/icons/PieChart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import AddTransactionOption from "./addTransaction/AddTransactionOption";

export default function Navbar() {
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [value, setValue] = useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("state", value);
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
        onClick={() => {
          setValue("home");
          history.push("/dashboard");
        }}
      />

      <BottomNavigationAction
        label="Store"
        value="store"
        icon={<FormatListNumberedIcon />}
        onClick={() => {
          setValue("store");
          history.push("/store");
        }}
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
        <BottomNavigationAction label="Analytics" icon={<PieChartIcon />} />
      </Link>
      <Link to="/profile">
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </Link>
    </BottomNavigation>
  );
}
