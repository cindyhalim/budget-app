import React from "react";
import Navbar from "./Navbar";
import DashboardProfile from "./DashboardProfile";
import { useHistory } from "react-router-dom";

import { Card, CardContent } from "@material-ui/core";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";

import "../styles/Store.sass";
import "../styles/DashboardProfile.sass";

export default function Store(props) {
  const history = useHistory();

  if (!props.logInStatus.user) props.checkLogInStatus();
  return (
    <div className="store-page">
      <DashboardProfile user={props.logInStatus.user} />
      <h1 className="store-title">
        <StoreMallDirectoryIcon className="store-icon" />
        Store
      </h1>
      <div className="budget-status">
        You have met your budget <strong>{props.budgetAchieved}</strong> times
        this year
      </div>
      <h3 className="store-headings">Inventory</h3>
      <Card className="store-content inventory">
        <CardContent className="store-items">
          <span>
            <p className="item-title">
              {" "}
              <img
                className="item-img"
                src="coins.jpg"
                style={{ height: "50px", width: "50px" }}
              />
              Coins
            </p>
          </span>
          <p className="amount">{props.coins}</p>
        </CardContent>
      </Card>
      <h3 className="store-headings">Market</h3>
      <Card className="store-content market">
        <CardContent className="store-items">
          <div>
            <img
              src="potion.png"
              className="item-img"
              style={{ height: "60px", width: "60px" }}
            />
            <section>
              <p className="item-title">Potion</p>
              <p className="item-description">+ 20 HP</p>
            </section>
          </div>

          <section className="buy-item">
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
              className="buy-button"
            >
              Buy
            </button>

            <p className="item-description">
              20{" "}
              <img
                src="coins.jpg"
                className="item-img"
                style={{ height: "20px", width: "20px" }}
              />
            </p>
          </section>
        </CardContent>
      </Card>
      <h3 className="store-headings">My Badges</h3>
      <div className="badge-cards">
        <Card className="badge-card">
          <CardContent className="straw">
            <img
              src={props.images[0]}
              style={{ height: "100px", width: "100px" }}
            />
            <div className="badge-info">
              <p className="badge-title">Straw Badge</p>
              <p className="badge-description">
                Meet your budget 1 time in a year
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="badge-card">
          <CardContent className="stick">
            <img
              src={props.images[1]}
              style={{ height: "100px", width: "100px" }}
            />

            <div className="badge-info">
              <p className="badge-title">Stick Badge</p>
              <p className="badge-description">
                Meet your budget 3 times in a year
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="badge-card">
          <CardContent className="brick">
            <img
              src={props.images[2]}
              style={{ height: "100px", width: "100px" }}
            />
            <div className="badge-info">
              <p className="badge-title">Brick Badge</p>
              <p className="badge-description">
                Meet your budget 5 times in a year
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="badge-card">
          <CardContent className="wolf">
            <img
              src={props.images[3]}
              style={{ height: "100px", width: "100px" }}
            />
            <div className="badge-info">
              <p className="badge-title">Wolf Badge</p>
              <p className="badge-description">
                Meet your budget 10 times in a year
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Navbar location={history.location.pathname.slice(1)} />
    </div>
  );
}
