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
    category: "",
    transaction_date: new Date(Date.now())
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
    Axios.post(
      "https://blooming-everglades-51994.herokuapp.com/image_recognition",
      formData
    )
      .then(res => {
        let textRes = res.data.responses[0].fullTextAnnotation.text;
        let amount = 0;
        if (textRes.includes("McDonald's")) {
          amount = Number(
            textRes
              .split(/(\r\n|\n|\r)/gm)
              .filter(item => item.includes("$") && item.includes("."))[0]
              .slice(2)
          );
        }
        setTransactionData({
          ...transactionData,
          amount: amount,
          location: "McDonald's",
          category: "Food",
          transaction_date: new Date(Date.now())
        });
        setOpenStatus({ ...openStatus, list: false, transaction: true });
      })
      .catch(e => {
        console.log("IN HERE");
        props.changeOpenStatus(false);
        setOpenStatus({
          ...openStatus,
          list: false,
          transaction: false
        });
      });
  }, [selectedFile]);

  return (
    <div>
      <Dialog
        autoFocus="true"
        onClose={() => props.changeOpenStatus(false)}
        aria-labelledby="simple-dialog-title"
        open={openStatus.list}
      >
        <DialogTitle id="simple-dialog-title" style={{ fontSize: "24px" }}>
          Add Transaction
        </DialogTitle>
        <List>
          <ListItem onClick={() => fileInputRef.current.click()}>
            <img
              src="photo-camera.png"
              style={{ width: "20px", marginRight: "10px" }}
            ></img>
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
            <img
              src="keyboard.png"
              style={{ width: "20px", marginRight: "10px" }}
            ></img>
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
        onInputDate={data =>
          setTransactionData({
            ...transactionData,
            transaction_date: data
          })
        }
        changeNavbarStatus={() => props.changeOpenStatus(false)}
        resetValues={() =>
          setTransactionData({
            amount: "",
            location: "",
            category: "",
            transaction_date: new Date(Date.now())
          })
        }
      ></NewTransaction>
    </div>
  );
}
