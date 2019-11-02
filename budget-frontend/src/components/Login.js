import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Redirect, useHistory } from "react-router-dom";
import "../styles/Login.sass";
import { TextField, Button } from "@material-ui/core";

export default function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const history = useHistory();
  const handleChange = event => {
    event.persist();
    setUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = event => {
    axios
      .post(
        "http://localhost:3000/sessions",
        {
          user: { email: user.email, password: user.password }
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.logged_in) {
          props.handleLogin(res.data.user[0]);
          history.push("/dashboard");
        }
      })
      .catch(err => {
        console.log("login error", err);
      });

    event.preventDefault();
  };

  return (
    <div className="Login">
      <h1 className="title">Login</h1>
      <form onSubmit={event => handleSubmit(event)}>
        <TextField
          className="textinput"
          type="email"
          name="email"
          placeholder="Email"
          onChange={event => handleChange(event)}
          required
        />
        <TextField
          className="textinput"
          type="password"
          name="password"
          placeholder="Password"
          onChange={event => handleChange(event)}
          required
        />
        <Button type="submit" variant="contained" color="" className="button">
          Login
        </Button>
      </form>
    </div>
  );
}
