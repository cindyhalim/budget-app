import "date-fns";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

export default function CreateGoal(props) {
  const [active, setActive] = useState(false);
  const clearFields = () => {
    props.setNewGoal({
      ...props.newGoal,
      createGoal: {
        name: "",
        amount: "",
        start_date: new Date(Date.now()),
        end_date: new Date(Date.now()),
        error: ""
      }
    });
  };
  const onSave = () => {
    if (!props.newGoal.createGoal.name || !props.newGoal.createGoal.amount) {
      props.setNewGoal({
        ...props.newGoal,
        createGoal: {
          ...props.newGoal.createGoal,
          error: "Please enter all fields."
        }
      });
    } else {
      axios
        .post(
          "http://localhost:3000/goals",
          {
            goal: {
              goal_type: "saving",
              amount: parseInt(props.newGoal.createGoal.amount),
              name: props.newGoal.createGoal.name,
              start_date: props.newGoal.createGoal.start_date,
              end_date: props.newGoal.createGoal.end_date
            }
          },
          { withCredentials: true }
        )
        .then(() => {
          props.setNewGoal({
            ...props.newGoal,
            goals: props.newGoal.goals.unshift({
              goal_type: "saving",
              amount: parseInt(props.newGoal.createGoal.amount),
              name: props.newGoal.createGoal.name,
              start_date: props.newGoal.createGoal.start_date,
              end_date: props.newGoal.createGoal.end_date
            })
          });
        })
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
            helperText={props.newGoal.createGoal.error}
            value={props.newGoal.createGoal.name}
            label="Name"
            name="name"
            maxLength="20"
            type="text"
            onChange={event =>
              props.setNewGoal({
                ...props.newGoal,
                createGoal: {
                  ...props.newGoal.createGoal,
                  name: event.target.value
                }
              })
            }
            margin="normal"
            required
          />
          <br />
          <TextField
            helperText={props.newGoal.error}
            value={props.newGoal.createGoal.amount}
            label="Amount"
            name="amount"
            type="number"
            margin="normal"
            onChange={event =>
              props.setNewGoal({
                ...props.newGoal,
                createGoal: {
                  ...props.newGoal.createGoal,
                  amount: event.target.value
                }
              })
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
              value={props.newGoal.createGoal.start_date}
              onChange={value => {
                props.setNewGoal({
                  ...props.newGoal,
                  createGoal: {
                    ...props.newGoal.createGoal,
                    start_date: value
                  }
                });
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
              minDate={props.newGoal.createGoal.start_date.getTime() + 86400000}
              value={props.newGoal.createGoal.end_date}
              onChange={value => {
                props.setNewGoal({
                  ...props.newGoal,
                  createGoal: {
                    ...props.newGoal.createGoal,
                    end_date: value
                  }
                });
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
