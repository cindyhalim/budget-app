import React from "react";

import HealthBar from "./HealthBar";
import CoinCount from "./CoinCount";

export default function DashboardProfile(props) {
  return (
    <div className="user-profile">
      <section className="user">
        <img src="pig.png" className="avatar"></img>
        <section className="user-health">
          <h5 className="user-name"> Hello, {props.user.name}</h5>
          <HealthBar
            hp={props.hp}
            minusHP={props.minusHP}
            resetHP={props.resetHP}
          />
          <CoinCount coins={props.coins} updateCoins={props.updateCoins} />
        </section>
      </section>
    </div>
  );
}
