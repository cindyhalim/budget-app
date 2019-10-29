import React, { useState } from "react";
import { Card, CardContent } from "@material-ui/core";

export default function CreateGoal() {
  const [active, setActive] = useState(false);
  return (
    <Card>
      <CardContent>
        <div
          onClick={() => setActive(!active)}
          style={{ display: !active ? "block" : "none" }}
        >
          <p>Create Goal</p>
        </div>
        <div style={{ display: active ? "block" : "none" }}>
          <input placeholder="Name"></input>
          <button onClick={() => setActive(!active)}>X</button>
        </div>
      </CardContent>
    </Card>
  );
}
