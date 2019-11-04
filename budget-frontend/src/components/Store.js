import React from "react";
import Navbar from "./Navbar";

import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";

import "../styles/Store.sass";

export default function Store(props) {
  props.checkLogInStatus();
  return (
    <div>
      <div className="store-title">
        <StoreMallDirectoryIcon className="store-icon" />
        <div>Store</div>
      </div>
      <div className="entire-store">
        <div className="inventory-card">
          <div className="inventory-title">Inventory</div>
          <div className="coins-inventory">
            <div>Coins:</div>
            <div>
              <img src="coins.jpg" style={{ height: "30px", width: "30px" }} />
              {props.coins}
            </div>
          </div>
        </div>
        <div className="market-card">
          <div className="market-title">Market</div>
          <img src="potion.png" style={{ height: "30px", width: "30px" }} />
          Cost: 20 Use it to heal 20 HP
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
            You have met your budget <strong>{props.budgetAchieved}</strong>{" "}
            times this year
          </p>
          <p>My Badges</p>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
