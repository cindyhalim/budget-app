import React from "react";
import { TextField } from "@material-ui/core";

export default function UserRegister(props) {
  return (
    <div>
      <h1 className="title">Get Started</h1>
      <form className="userForm">
        <TextField
          label="Name"
          type="text"
          name="userName"
          className="textinput"
          onChange={props.onChange}
          required
        />
        <TextField
          type="email"
          name="email"
          className="textinput"
          onChange={props.onChange}
          label="Email"
          required
        />

        <TextField
          type="password"
          name="password"
          className="textinput"
          onChange={props.onChange}
          label="Password"
          required
        />
        <TextField
          type="password"
          name="password_confirmation"
          className="textinput"
          onChange={props.onChange}
          label="Confirm Password"
          required
        />
      </form>
    </div>
  );
}
