import React, { useState } from "react";
import "../styles/EditProfile.sass";
import Button from "@material-ui/core/Button";
import { TextField, CardContent, Card } from "@material-ui/core";

export default function EditProfile(props) {
  const [updatedParams, setUpdatedParams] = useState({
    name: "",
    username: "",
    email: ""
  });
  return (
    <div className="edit-profile" style={{ width: "100%" }}>
      <Card>
        <CardContent>
          <form
            className="edit-profile-form"
            onSubmit={() => props.closeEditProfile()}
          >
            <div className="text-fields">
              <TextField
                required
                style={{ margin: "5px", width: "80%" }}
                type="text"
                placeholder="Name"
                //   value={updatedParams.name}
                //   onChange={e =>
                //     setUpdatedParams({ ...updatedParams, name: e.target.value })
                //   }
              ></TextField>
              <br />
              <TextField
                required
                style={{ margin: "5px", width: "80%" }}
                type="text"
                placeholder="Email"
                //   value={updatedParams.email}
                //   onChange={e =>
                //     setUpdatedParams({ ...updatedParams, email: e.target.value })
                //   }
              ></TextField>
              <br />
              <TextField
                required
                style={{ margin: "5px", width: "80%" }}
                type="text"
                placeholder="Password"
              ></TextField>
              <br />
              <TextField
                required
                style={{ margin: "5px", width: "80%" }}
                type="text"
                placeholder="Re-Enter Password"
              ></TextField>
            </div>
            <div className="submit-button">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
