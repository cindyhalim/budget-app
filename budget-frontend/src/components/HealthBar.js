import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function HealthBar() {
  const [completed, setCompleted] = React.useState(50);
  return (
    <div>
      <LinearProgress variant="determinate" value={completed} />
    </div>
  );
}
