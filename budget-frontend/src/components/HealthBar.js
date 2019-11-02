import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function HealthBar(props) {
  const [completed, setCompleted] = useState();
  useEffect(() => {
    setCompleted(props.hp);
  }, [props.hp]);

  return (
    <div>
      <LinearProgress
        value={completed}
        style={{ height: "30px", width: "150px", borderRadius: 20 }}
        variant="determinate"
        color="secondary"
      />
      <button onClick={() => setCompleted(completed - 20)}>
        Subtract Health
      </button>
      <button onClick={() => setCompleted(100)}>Reset Health</button>
    </div>
  );
}
