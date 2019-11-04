import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Link, useHistory } from "react-router-dom";
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
          history.push("/home");
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
          label="Email"
          maxLength="20"
          margin="normal"
          className="textinput"
          type="email"
          name="email"
          onChange={event => handleChange(event)}
          required
        />
        <TextField
          label="Password"
          margin="normal"
          className="textinput"
          type="password"
          name="password"
          onChange={event => handleChange(event)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color=""
          className="login button"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color=""
          className="button"
          onClick={() => history.push("/register")}
        >
          Register
        </Button>
      </form>
    </div>
  );
}
