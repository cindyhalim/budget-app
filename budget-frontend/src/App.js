import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [state, setState] = useState("test");
  axios
    .get("http://localhost:3000/ping")
    .then(res => setState(() => res.data.test));

  return (
    <div className="App">
      <p>{state}</p>
    </div>
  );
}

export default App;
