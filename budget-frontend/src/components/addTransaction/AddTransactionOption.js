import React, { useState, useEffect } from "react";
import NewTransaction from "./NewTransaction";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Axios from "axios";

export default function AddTransactionOption(props) {
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
    setOpenStatus({ ...openStatus, list: props.openAddTransaction });
  }, [props.openAddTransaction]);

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

  return (
    <div>
      <Dialog
        autoFocus="true"
        onClose={() => props.changeOpenStatus(false)}
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
    </div>
  );
}
