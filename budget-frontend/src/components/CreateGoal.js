import "date-fns";
import React, { useState } from "react";
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
    end_date: new Date(Date.now()),
    goal_type: "saving"
  });

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
          <button onClick={() => setActive(!active)}>X</button>
          <TextField
            label="Name"
            name="name"
            maxlength="20"
            type="text"
            onChange={event =>
              setNewGoal({ ...newGoal, name: event.target.value })
            }
            margin="normal"
          />
          <br />
          <TextField
            label="Amount"
            name="amount"
            type="number"
            margin="normal"
            onChange={event =>
              setNewGoal({ ...newGoal, amount: event.target.value })
            }
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="End Date"
              minDate={Date.now()}
              value={newGoal.end_date}
              onChange={value => {
                setNewGoal({ ...newGoal, end_date: value });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </CardContent>
    </Card>
  );
}
