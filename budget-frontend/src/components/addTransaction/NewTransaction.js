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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function NewTransaction(props) {
  function triggerNewTransactionPost() {
    Axios.post(
      "https://blooming-everglades-51994.herokuapp.com/transactions",
      {
        amount: props.transactionData.amount,
        location: props.transactionData.location,
        category: props.transactionData.category,
        transaction_date: props.transactionData.transaction_date
      },
      { withCredentials: true }
    );
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
            required
            autoFocus
            label="Amount"
            type="number"
            value={props.transactionData.amount}
            onChange={props.onInputAmount}
            style={{ width: "70%" }}
          />
          <br />
          <TextField
            required
            label="Location"
            type="Text"
            value={props.transactionData.location}
            onChange={props.onInputLocation}
            style={{ width: "70%" }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              required
              style={{ width: "70%" }}
              disableToolbar
              inputProps={{ readOnly: true }}
              format="MM/dd/yyyy"
              margin="normal"
              label="Transaction Date"
              value={props.transactionData.transaction_date}
              onChange={props.onInputDate}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
          <InputLabel>Category</InputLabel>

          <Select
            required
            style={{ width: "70%" }}
            label="Category"
            value={props.transactionData.category}
            onChange={props.onInputCategory}
          >
            <MenuItem value="Shopping">Shopping</MenuItem>
            <MenuItem value="Food and Drink">Food and Drink</MenuItem>
            <MenuItem value="Recreation">Recreation</MenuItem>
            <MenuItem value="Rideshare">Rideshare</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (
                props.transactionData.amount &&
                props.transactionData.location &&
                props.transactionData.transaction_date &&
                props.transactionData.category
              ) {
                props.changeNavbarStatus();
                props.onChangeOpenStatus({ transaction: false, list: false });
                triggerNewTransactionPost();
                props.resetValues();
              } else {
                alert("Please enter data for all fields!");
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
