import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

import {
  TextField,
  Button,
  Grid,
  FormGroup,
  Checkbox,
  Stack
} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    name: "",
    address: "",
    email:"",
    mobile:"",
    gender: "",
    city: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    address: "",
    email:"",
    mobile:"",
    gender: "",
    city: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      address: addFormData.address,
      email: addFormData.email,
      mobile: addFormData.mobile,
      gender: addFormData.gender,
      city: addFormData.city
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      address: editFormData.address,
      email: editFormData.email,
      mobile: editFormData.mobile,
      gender: editFormData.gender,
      city: editFormData.city
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      address: contact.address,
      email: contact.email,
      mobile: contact.mobile,
      gender: contact.gender,
      city: contact.city,

    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
    <h3>User Details</h3>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h3>Registration</h3>
      <form onSubmit={handleAddFormSubmit}>
      <Grid container spacing={2} >
      <Grid item lg={6}>
      
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          placeholder="Enter Your Name"
          fullWidth
          margin="normal"
          name="name"
          onChange={handleAddFormChange}
        />
        <TextField
          id="address"
          label="Address"
          multiline
          rows={4}
          variant="outlined"
          placeholder="Enter Your Address"
          fullWidth
          margin="normal"
          name="address"
          onChange={handleAddFormChange}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          placeholder="Email"
          fullWidth
          margin="normal"
          name="email"
          onChange={handleAddFormChange}

        />
        <TextField
          id="mobile"
          label="Mobile"
          variant="outlined"
          placeholder="Mobile"
          fullWidth
          margin="normal"
          name="mobile"
          onChange={handleAddFormChange}
        />
       
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="gender"
          onChange={handleAddFormChange}
        >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
</FormControl>

        <TextField
          id="city"
          label="city"
          variant="outlined"
          placeholder="city"
          fullWidth
          margin="normal"
          name="city"
          onChange={handleAddFormChange}
        />
        <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="I agree to the company terms and policy" />
        </FormGroup>

        <Stack directon="row" spacing={2}>
          <Button color="success" variant="contained" type="submit">signup</Button>
          <Button color="secondary" variant="contained">reset</Button>
          
        </Stack> 
        </Grid>
        </Grid>
    
      </form>

    </div>
  );
};

export default App;
