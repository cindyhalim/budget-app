import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function HealthBar(props) {
  const [completed, setCompleted] = React.useState(props.hp);

  return (
    <div>
      <LinearProgress
        style={{ height: "30px", width: "150px", borderRadius: 20 }}
        variant="determinate"
        value={completed}
        color="secondary"
      />
      <button onClick={() => setCompleted(prev => prev - 20)}>
        Subtract Health
      </button>
      <button onClick={() => setCompleted(100)}>Reset Health</button>
    </div>
  );
}
