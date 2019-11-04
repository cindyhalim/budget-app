import React from "react";

export default function(props) {
  console.log(props.image);
  return (
    <div>
      <img src={props.image} style={{ width: "30px" }} />
    </div>
  );
}
