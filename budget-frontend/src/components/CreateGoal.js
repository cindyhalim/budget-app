import "date-fns";
import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

export default function CreateGoal() {
  const [active, setActive] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    amount: "",
    start_date: new Date(Date.now()),
    end_date: new Date(Date.now()),
    error: ""
  });
  const clearFields = () => {
    setNewGoal({
      name: "",
      amount: "",
      start_date: new Date(Date.now()),
      end_date: new Date(Date.now()),
      error: ""
    });
  };
  const onSave = () => {
    if (!newGoal.name || !newGoal.amount) {
      setNewGoal({
        ...newGoal,
        error: "Please enter all fields."
      });
    } else {
      axios
        .post(
          "http://localhost:3000/goals",
          {
            goal: {
              goal_type: "saving",
              amount: parseInt(newGoal.amount),
              name: newGoal.name,
              start_date: newGoal.start_date,
              end_date: newGoal.end_date
            }
          },
          { withCredentials: true }
        )
        .then(() => {
          setActive(!active);
          clearFields();
        });
    }
  };

  return (
    <Card>
      <CardContent>
        <div
          onClick={() => setActive(!active)}
          style={{ display: !active ? "block" : "none" }}
        >
          <h2>Create Goal</h2>
        </div>
        <div style={{ display: active ? "block" : "none" }}>
          <button
            onClick={() => {
              setActive(!active);
              clearFields();
            }}
          >
            X
          </button>
          <TextField
            helperText={newGoal.error}
            value={newGoal.name}
            label="Name"
            name="name"
            maxLength="20"
            type="text"
            onChange={event =>
              setNewGoal({ ...newGoal, name: event.target.value })
            }
            margin="normal"
            required
          />
          <br />
          <TextField
            helperText={newGoal.error}
            value={newGoal.amount}
            label="Amount"
            name="amount"
            type="number"
            margin="normal"
            onChange={event =>
              setNewGoal({ ...newGoal, amount: event.target.value })
            }
            required
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="Start Date"
              minDate={Date.now()}
              value={newGoal.start_date}
              onChange={value => {
                setNewGoal({ ...newGoal, start_date: value });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              required
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="End Date"
              minDate={newGoal.start_date}
              value={newGoal.end_date}
              onChange={value => {
                setNewGoal({ ...newGoal, end_date: value });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              required
            />
          </MuiPickersUtilsProvider>
          <button onClick={() => onSave()}>Save</button>
        </div>
      </CardContent>
    </Card>
  );
}
