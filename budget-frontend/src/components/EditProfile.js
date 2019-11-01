import React, { useState } from "react";

export default function EditProfile(props) {
  const [updatedParams, setUpdatedParams] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="name"
          //   value={updatedParams.name}
          //   onChange={e =>
          //     setUpdatedParams({ ...updatedParams, name: e.target.value })
          //   }
        ></input>
        <input
          type="text"
          placeholder="username"
          //   value={updatedParams.username}
          //   onChange={e =>
          //     setUpdatedParams({ ...updatedParams, username: e.target.value })
          //   }
        ></input>
        <input
          type="text"
          placeholder="email"
          //   value={updatedParams.email}
          //   onChange={e =>
          //     setUpdatedParams({ ...updatedParams, email: e.target.value })
          //   }
        ></input>
        <input
          type="text"
          placeholder="password"
          //   value={updatedParams.password}
          //   onChange={e =>
          //     setUpdatedParams({ ...updatedParams, name: e.target.params })
          //   }
        ></input>
        <input type="text" placeholder="re-enter password"></input>
        <button type="submit" onClick={() => props.closeEditProfile()}>
          Save
        </button>
      </form>
    </div>
  );
}
