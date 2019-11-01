import React, { useState } from "react";
import "date-fns";
import { TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

export default function GoalForm(props) {
  const [formFields, setFormFields] = useState({
    id: props.id,
    name: props.name,
    amount: props.amount,
    start_date: props.start_date,
    end_date: props.end_date
  });

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
        props.onSave(formFields);
        props.setActive(!props.active);
      }}
    >
      <button
        type="button"
        onClick={() => {
          props.setActive(!props.active);
        }}
      >
        X
      </button>
      <TextField
        label="Name"
        name="name"
        maxLength="20"
        type="text"
        margin="normal"
        value={formFields.name}
        helperText={
          formFields.name === "" ? "This field cannot be left blank" : " "
        }
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
        helperText={
          formFields.amount === "" ? "This field cannot be left blank" : " "
        }
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
          helperText={
            formFields.start_date === ""
              ? "This field cannot be left blank"
              : " "
          }
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
          helperText={
            formFields.end_date === "" ? "This field cannot be left blank" : " "
          }
          required
        />
      </MuiPickersUtilsProvider>
      <button type="submit">Save</button>
    </form>
  );
}
