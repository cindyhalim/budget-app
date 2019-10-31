import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  DialogActions
} from "@material-ui/core";
import PieChartIcon from "@material-ui/icons/PieChart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Axios from "axios";
import NewTransaction from "./NewTransaction";

export default function Navbar() {
  const [openStatus, setOpenStatus] = useState({
    list: false,
    transaction: false
  });
  const [transactionData, setTransactionData] = useState({
    amount: "",
    location: "",
    category: ""
  });
  const [selectedFile, setSelectedFile] = useState("");
  let fileInputRef = React.createRef();

  useEffect(() => {
    setOpenStatus({ ...openStatus, list: false });
    let formData = new FormData();
    formData.append("image", selectedFile);
    Axios.post("http://localhost:3000/image_recognition", formData).then(
      res => {
        setTransactionData({
          ...transactionData,
          amount: 5.88,
          location: "McDonald's",
          category: "Food"
        });
        setOpenStatus({ ...openStatus, list: false, transaction: true });
      }
    );
  }, [selectedFile]);

  function OptionsDialog() {
    return (
      <Dialog
        autoFocus="true"
        onClose={() => setOpenStatus({ ...openStatus, list: false })}
        aria-labelledby="simple-dialog-title"
        open={openStatus.list}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <List>
          <ListItem onClick={() => fileInputRef.current.click()}>
            Take Picture
            <input
              type="file"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={e => setSelectedFile(e.target.files[0])}
            ></input>
          </ListItem>
          <ListItem
            onClick={() =>
              setOpenStatus({ ...openStatus, transaction: true, list: false })
            }
          >
            Enter Manually
          </ListItem>
        </List>
      </Dialog>
    );
  }

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

      <BottomNavigationAction
        label="Add Paymnet"
        onClick={() => setOpenStatus({ ...openStatus, list: true })}
        icon={<AddCircleOutlineIcon />}
      />
      <OptionsDialog />

      <NewTransaction
        onChangeOpenStatus={data =>
          setOpenStatus({
            ...openStatus,
            list: data.list,
            transaction: data.transaction
          })
        }
        openStatus={openStatus}
        transactionData={transactionData}
        onInputAmount={data =>
          setTransactionData({ ...transactionData, amount: data.target.value })
        }
        onInputLocation={data =>
          setTransactionData({
            ...transactionData,
            location: data.target.value
          })
        }
        onInputCategory={data =>
          setTransactionData({
            ...transactionData,
            category: data.target.value
          })
        }
      ></NewTransaction>

      <Link to="/analytics">
        <BottomNavigationAction label="Analytics" icon={<PieChartIcon />} />
      </Link>
      <Link to="/profile">
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </Link>
    </BottomNavigation>
  );
}
