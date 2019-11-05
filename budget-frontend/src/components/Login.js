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
  const [loginError, setLoginError] = useState("");
  const history = useHistory();
  const handleChange = event => {
    event.persist();
    setUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = () => {
    setLoginError("");
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
        } else if (res.data.status === 401) {
          setLoginError("Please check your email and password");
        }
      })
      .catch(err => {
        console.log("login error", err);
      });
  };

  return (
    <div className="Login">
      <h1 className="title">Login</h1>
      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
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
        <p id="error">{loginError}</p>
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
