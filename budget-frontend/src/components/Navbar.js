import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PieChartIcon from "@material-ui/icons/PieChart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import AddTransactionOption from "./addTransaction/AddTransactionOption";

export default function Navbar(props) {
  console.log(props.location);
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [value, setValue] = useState(props.location);

  useEffect(() => {
    setValue(props.location);
  }, [props.location]);

  console.log(value);

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
          history.push("/home");
        }}
      />

      <BottomNavigationAction
        label="Store"
        value="store"
        icon={<FormatListNumberedIcon />}
        onClick={() => {
          history.push("/store");
        }}
      />

      <BottomNavigationAction
        label="Payment"
        value="payment"
        onClick={() => setOpenAddTransaction(true)}
        icon={<AddCircleOutlineIcon />}
      />
      <AddTransactionOption
        openAddTransaction={openAddTransaction}
        changeOpenStatus={data => setOpenAddTransaction(data)}
      />
      <BottomNavigationAction
        value="analytics"
        label="Analytics"
        icon={<PieChartIcon />}
        onClick={() => {
          history.push("/analytics");
        }}
      />
      <BottomNavigationAction
        value="profile"
        label="Profile"
        icon={<AccountCircleIcon />}
        onClick={() => history.push("/profile")}
      />
    </BottomNavigation>
  );
}
