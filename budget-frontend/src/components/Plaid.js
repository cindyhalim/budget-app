import React, { Component } from "react";
import PlaidLink from "react-plaid-link";

class App extends Component {
  handleOnSuccess(token, metadata) {
    // axios.post("/auth/public_token", {
    //   public_token: "f5d36ce3fa8cfc7f7ea122094b9505"
    // });
  }
  handleOnExit() {
    // handle the case when your user exits Link
  }
  render() {
    return (
      <PlaidLink
        className="link-bank"
        style={{}}
        clientName="Your app name"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey="f5d36ce3fa8cfc7f7ea122094b9505"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        Connect to your bank
      </PlaidLink>
    );
  }
}
export default App;
