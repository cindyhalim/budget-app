import React, { useState, useEffect } from "react";

export default function CoinCount(props) {
  const [coins, setCoins] = useState();
  useEffect(() => {
    setCoins(props.coins);
  }, [props.coins]);
  return (
    <div>
      <p className="coins">
        {coins}
        {"   "}
        <img src="coins.jpg" style={{ height: "30px", width: "30px" }} />
      </p>
      {/* <button
        onClick={() => {
          props.updateCoins(40);
        }}
      >
        Reset Coins
      </button> */}
    </div>
  );
}
