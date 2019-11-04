import React from "react";
import Navbar from "./Navbar";
import Badges from "./Badges";

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
      <div>
        <p>
          You have met your budget <strong>{props.budgetAchieved}</strong> times
          this year
        </p>
        <p>See your badges below:</p>
        {Array.from(props.images).length > 0 &&
          Array.from(props.images).map(image => {
            return <Badges image={image} />;
          })}
      </div>
      <Navbar />
    </div>
  );
}
