import React from "react";
import Navbar from "./Navbar";

export default function Store(props) {
  console.log(props);
  props.checkLogInStatus();
  return (
    <div>
      Store Your Coins:
      <img src="coins.jpg" style={{ height: "30px", width: "30px" }} />
      {props.coins}
      <div>
        Items To Purchase: Potion
        <br></br>
        <img src="potion.png" style={{ height: "30px", width: "30px" }} />
        <br></br>
        Cost: 20
        <br></br>
        Use it to heal 20 HP
        <br></br>
        <button
          onClick={() => {
            if (props.hp !== 100 && props.coins >= 20) {
              props.subtractCoinsAddHP(-20, 20);
            } else if (props.coins < 20) {
              alert("You don't have enough money");
            } else {
              alert("Your health is already full");
            }
          }}
        >
          Buy
        </button>
      </div>
      <Navbar />
    </div>
  );
}
