import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PieChartIcon from "@material-ui/icons/PieChart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import HomeIcon from "@material-ui/icons/Home";
import AddTransactionOption from "./addTransaction/AddTransactionOption";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    width: 500
  }
});

export default function Navbar(props) {
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [value, setValue] = useState(props.location);

  const classes = useStyles();

  useEffect(() => {
    setValue(props.location);
  }, [props.location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();

  return (
    <BottomNavigation
      className={classes.root}
      value={value}
      onClick={handleChange}
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        backgroundColor: "#f7f7f7"
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
        icon={<StoreMallDirectoryIcon />}
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
