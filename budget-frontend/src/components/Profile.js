import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
import EditProfile from "./EditProfile";

export default function Profile(props) {
  const history = useHistory();
  const [openEdit, setOpenEdit] = useState(false);
  console.log(props);
  props.checkLogInStatus();
  return (
    <div>
      <div style={{ height: "50px", width: "20%", border: "1px solid black" }}>
        Profile Pic
      </div>
      <p>Username {props.logInStatus.user}</p>
      <p
        onClick={() => {
          props.logOutClick();
          history.push("/");
        }}
      >
        Logout
      </p>
      <Navbar />
      <button onClick={() => setOpenEdit(!openEdit)}>Edit</button>
      {openEdit ? <EditProfile /> : null}
    </div>
  );
}
