import React, { useState } from "react";
import "../styles/EditProfile.sass";
import Button from "@material-ui/core/Button";
import { TextField, CardContent, Card } from "@material-ui/core";
import Axios from "axios";

export default function EditProfile(props) {
  const [updatedFields, setUpdatedFields] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const handleSubmit = () => {
    if (Object.values(updatedFields).filter(field => field).length > 0) {
      Axios.put("http:localhost:3000/registrations", {
        name: updatedFields.name,
        email: updatedFields.email,
        password: updatedFields.password,
        password_confirmation: updatedFields.password_confirmation
      });
    } else {
      alert("All Fields Empty");
    }
  };
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
                value={updatedFields.name}
                onChange={e =>
                  setUpdatedFields({ ...updatedFields, name: e.target.value })
                }
              ></TextField>
              <br />
              <TextField
                required
                style={{ margin: "5px", width: "80%" }}
                type="text"
                placeholder="Email"
                value={updatedFields.email}
                onChange={e =>
                  setUpdatedFields({ ...updatedFields, email: e.target.value })
                }
              ></TextField>
              <br />
              <TextField
                required
                style={{ margin: "5px", width: "80%" }}
                type="text"
                placeholder="Password"
                value={updatedFields.password}
                onChange={e =>
                  setUpdatedFields({
                    ...updatedFields,
                    password: e.target.value
                  })
                }
              ></TextField>
              <br />
              <TextField
                required
                style={{ margin: "5px", width: "80%" }}
                type="text"
                placeholder="Re-Enter Password"
                value={updatedFields.password_confirmation}
                onChange={e =>
                  setUpdatedFields({
                    ...updatedFields,
                    password_confirmation: e.target.value
                  })
                }
              ></TextField>
            </div>
            <div className="submit-button">
              <Button onClick={() => handleSubmit()}>Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
