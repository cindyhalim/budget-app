import React, { useState, useEffect } from "react";

export default function CoinCount(props) {
  const [coins, setCoins] = useState();
  useEffect(() => {
    setCoins(props.coins);
  }, [props.coins]);
  return (
    <div>
      <img src="coins.jpg" style={{ height: "30px", width: "30px" }} />
      {coins}
      <button
        onClick={() => {
          props.updateCoins(40);
        }}
      >
        Reset Coins
      </button>
    </div>
  );
}
