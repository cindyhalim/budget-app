import React, { useState } from "react";
import "date-fns";
import { TextField, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Close from "@material-ui/icons/Close";
import moment from "moment";

export default function GoalForm(props) {
  const [formFields, setFormFields] = useState({
    id: props.id,
    name: props.name,
    amount: props.amount,
    start_date: props.start_date,
    end_date: props.end_date
  });
  const [error, setError] = useState("");

  const handleFormFieldChange = name => event => {
    setFormFields({ ...formFields, [name]: event.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormFields({ ...formFields, [name]: date });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (
          moment(formFields.end_date).format("YYYY-M-DD") !==
          moment(formFields.start_date).format("YYYY-M-DD")
        ) {
          props.onSave(formFields);
          props.setRefreshGoals(!props.refreshGoals);
          props.setActive(!props.active);
        } else {
          setError({
            ...error,
            date: "***Saving goal must take place over one day***"
          });
        }

        //error handling
        if (formFields.name === "") {
          setError({ ...error, name: "This field cannot be left blank" });
        }

        if (formFields.amount === "") {
          setError({ ...error, amount: "This field cannot be left blank" });
        }
      }}
      className="goal-form"
    >
      <Close
        className="close-button"
        onClick={() => {
          props.setActive(!props.active);
        }}
      />

      <TextField
        className="name-field"
        label="Name"
        name="name"
        inputProps={{ maxLength: 20 }}
        style={{ color: "#FFFFFF" }}
        type="text"
        margin="normal"
        value={formFields.name}
        helperText={error.name ? error.name : ""}
        onChange={handleFormFieldChange("name")}
        required
      />
      <br />
      <TextField
        label="Amount"
        name="amount"
        type="number"
        margin="normal"
        value={formFields.amount}
        helperText={error.amount ? error.amount : ""}
        onChange={handleFormFieldChange("amount")}
        required
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          name="start_date"
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="Start Date"
          minDate={Date.now()}
          value={formFields.start_date}
          inputProps={{ readOnly: true }}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          onChange={date => handleDateChange("start_date", date)}
          required
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="End Date"
          minDate={new Date(new Date(props.start_date).getTime() + 86400000)}
          value={formFields.end_date}
          onChange={date => handleDateChange("end_date", date)}
          name="end_date"
          inputProps={{ readOnly: true }}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          error={formFields.end_date === ""}
          required
        />
      </MuiPickersUtilsProvider>
      {error.date ? <p>{error.date}</p> : ""}
      <Button className="save-button" type="submit" size="small">
        Save
      </Button>
    </form>
  );
}
