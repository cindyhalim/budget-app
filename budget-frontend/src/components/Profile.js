import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
import EditProfile from "./EditProfile";
import EditBudget from "./EditBudget";
import "../styles/ProfilePage.sass";

export default function Profile(props) {
  const history = useHistory();
  const [openEdit, setOpenEdit] = useState(false);
  const [openBudget, setOpenBudget] = useState(false);
  console.log(props);
  props.checkLogInStatus();
  return (
    <div>
      <div className="profile-page">
        <div className="header">
          <img src="pig.png" className="avatar"></img>
          <div className="header-profile">
            {/* <p className="username">Hi {props.logInStatus.user.name}</p> */}
            <p className="profile-text">Profile Page</p>
            <button
              className="logout"
              onClick={() => {
                props.logOutClick();
                history.push("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="description">
          <p>
            Edit your profile information or change your monthly budget goal
            below. <strong>Happy Savings!</strong>
          </p>
        </div>
        <div className="edit-fields">
          <button
            className="edit-user-fields-button"
            onClick={() => setOpenEdit(!openEdit)}
          >
            Edit Profile
          </button>
          {openEdit ? (
            <EditProfile closeEditProfile={() => setOpenEdit(false)} />
          ) : null}
          <button
            className="edit-budget-fields-button"
            onClick={() => setOpenBudget(!openBudget)}
          >
            Edit Budget
          </button>
          {openBudget ? (
            <EditBudget closeEditBudget={() => setOpenBudget(false)} />
          ) : null}
        </div>
      </div>
      <Navbar />
    </div>
  );
}
