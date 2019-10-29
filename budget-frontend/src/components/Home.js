import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Home(props) {
  return (
    <div>
      <h1>Budgie</h1>
      <Link to="/login">Login</Link>

      <Link to="/register">Register</Link>
    </div>
  );
}
