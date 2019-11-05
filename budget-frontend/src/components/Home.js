import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../styles/Home.sass";

export default function Home(props) {
  return (
    <div className="Home">
      <h1 className="title">Budgey</h1>
      <img src="pig.png" className="logo"></img>
      <Link to="/login">
        <Button variant="contained" color="primary" className="button">
          login
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="contained" color="" className="button">
          Register
        </Button>
      </Link>
    </div>
  );
}
