import React from "react";
//import css
// import classnames from "classnames";

export default function NavButton(props) {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}
