import React from "react";
import { Card, CardContent } from "@material-ui/core";

export default function Badges(props) {
  return (
    <Card>
      <CardContent>
        <img src={props.image} style={{ height: "65px", width: "65px" }} />
      </CardContent>
    </Card>
  );
}
