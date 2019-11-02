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
      <button onClick={() => setCoins(coins - 20)}>Subtract Coins</button>
      <button onClick={() => setCoins(40)}>Reset Coins</button>
    </div>
  );
}
