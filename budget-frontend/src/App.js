import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import NavButton from "./components/NavButton";

function App() {
  const [state, setState] = useState("test");
  axios
    .get("http://localhost:3000/ping")
    .then(res => setState(() => res.data.test));

  return (
    <div className="App">
      <NavButton>Back</NavButton>
      <p>{state}</p>
      <NavButton>Next</NavButton>
    </div>
  );
}

export default App;
