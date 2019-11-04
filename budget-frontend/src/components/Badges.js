import React from "react";

export default function Badges(props) {
  return (
    <div>
      <img src={props.image} style={{ height: "65px", width: "65px" }} />
    </div>
  );
}
