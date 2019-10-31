import React from "react";
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  DialogActions
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Axios from "axios";

export default function NewTransaction(props) {
  function triggerNewTransactionPost() {
    Axios.post("http://localhost:300/new-transaction", {
      amount: props.transactionData.amount,
      location: props.transactionData.location,
      category: props.transactionData.location
    });
  }
  return (
    <div>
      <Dialog
        onClose={() =>
          props.onChangeOpenStatus({ transaction: false, list: true })
        }
        aria-labelledby="simple-dialog-title"
        open={props.openStatus.transaction}
      >
        <DialogTitle id="simple-dialog-title">New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Amount"
            type="number"
            value={props.transactionData.amount}
            onChange={props.onInputAmount}
          />
          <br />
          <TextField
            margin="dense"
            label="Location"
            type="Text"
            value={props.transactionData.location}
            onChange={props.onInputLocation}
          />
          <InputLabel>Category</InputLabel>
          <Select
            value={props.transactionData.category}
            onChange={props.onInputCategory}
          >
            <MenuItem value="Shopping">Shopping</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.changeNavbarStatus();
              props.onChangeOpenStatus({ transaction: false, list: false });
              triggerNewTransactionPost();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
