import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import EditProfile from "./EditProfile";
import EditBudget from "./EditBudget";
import "../styles/ProfilePage.sass";

export default function Profile(props) {
  const history = useHistory();
  console.log(history.location.pathname);
  const [openEdit, setOpenEdit] = useState(false);
  const [openBudget, setOpenBudget] = useState(false);
  console.log(props);
  props.checkLogInStatus();
  return (
    <div>
      <div className="profile-page">
        <div className="header">
          <div className="header-left">
            <img src="pig.png" className="avatar"></img>
            <p
              className="logout"
              onClick={() => {
                props.logOutClick();
                history.push("/");
              }}
            >
              Logout
            </p>
          </div>
          <div className="header-profile">
            {/* <p className="username">Hi {props.logInStatus.user.name}</p> */}
            <p className="profile-username">{props.logInStatus.user.name}</p>
            <p className="profile-email">{props.logInStatus.user.email}</p>
          </div>
        </div>
        <div className="description">
          <p>
            Edit your profile information or change your monthly budget goal
            below. <strong>Happy Savings!</strong>
          </p>
        </div>
        <div className="edit-fields">
          <Button
            className="edit-user-fields-button"
            onClick={() => setOpenEdit(!openEdit)}
          >
            Edit Profile
          </Button>
          {openEdit ? (
            <EditProfile
              id={props.logInStatus.user.id}
              setLoginStatus={props.setLoginStatus}
              logInStatus={props.logInStatus}
              closeEditProfile={() => setOpenEdit(false)}
            />
          ) : null}
          <Button
            className="edit-budget-fields-button"
            onClick={() => setOpenBudget(!openBudget)}
          >
            Edit Budget
          </Button>
          {openBudget ? (
            <EditBudget closeEditBudget={() => setOpenBudget(false)} />
          ) : null}
        </div>
      </div>
      <Navbar location={history.location.pathname.slice(1)} />
    </div>
  );
}
