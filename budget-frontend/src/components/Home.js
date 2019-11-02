import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../styles/Home.sass";

export default function Home(props) {
  return (
    <div className="Home">
      <h1 className="title">Budgie</h1>
      <img src="pig.png" className="logo"></img>
      <Button variant="contained" color="primary" className="button">
        <Link to="/login">Login</Link>
      </Button>
      <Button variant="contained" color="" className="button">
        <Link to="/register">Register</Link>
      </Button>
    </div>
  );
}
