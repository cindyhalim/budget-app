import React, { useState } from "react";
import PlaidLink from "react-plaid-link";

export default function Plaid() {
  const [status, getStatus] = useState("");
  const handleOnSuccess = (token, metadata) => {
    getStatus("success");
  };

  return (
    <div>
      <PlaidLink
        className="link-bank"
        style={{ margin: "30vh 0" }}
        clientName="Your app name"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey="f5d36ce3fa8cfc7f7ea122094b9505"
        onSuccess={handleOnSuccess}
      >
        Connect to your bank
      </PlaidLink>
      {status ? <p>Success!</p> : ""}
    </div>
  );
}
