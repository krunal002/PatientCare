import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPatient, updatePatient } from "./patientSlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  addPatientToWard,
  deletePatientInWard,
  fetchWard
} from "../Ward/wardSlice";

export default function RegisterPatient() {
  let { state } = useLocation();
  const patient = state?.patientDetails ? state.patientDetails : null;

  const [name, setName] = useState(patient ? patient.name : "");
  const [age, setAge] = useState(patient ? patient.age : "");
  const [gender, setGender] = useState(patient ? patient.gender : "");
  const [phone, setPhone] = useState(patient ? patient.phone : "");
  const [address, setAddress] = useState(patient ? patient.address : "");
  const [medicalHistory, setMedicalhistory] = useState(
    patient ? patient.medicalHistory : ""
  );
  const [assignedWard, setAssignedWard] = useState(
    patient ? patient.assignedWard : ""
  );

  // ward funtionality
  const { wards } = useSelector((state) => state.wards);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWard());
  }, [dispatch]);

  const currWard = wards.find((ward) => assignedWard === ward.name);

  const newPatient = {
    name,
    age,
    gender,
    phone,
    address,
    medicalHistory,
    assignedWardId: currWard?._id,
    assignedWard
  };

  const navigate = useNavigate();
  const handelSubmit = () => {
    if (state) {
      dispatch(updatePatient({ id: patient._id, updatedData: newPatient }));
      if (patient.assignedWardId !== newPatient.assignedWardId) {
        if (currWard.capacity <= currWard.patients?.length) {
          alert("Selected ward's capacity is already reached!");
        } else {
          dispatch(
            deletePatientInWard({
              wardId: patient.assignedWardId,
              patientId: patient._id
            })
          );
          dispatch(
            addPatientToWard({
              id: newPatient.assignedWardId,
              patient
            })
          );
        }
      }
      navigate(state?.location?.pathname);
    } else {
      if (currWard.capacity <= currWard.patients?.length) {
        alert("Selected ward's capacity is already reached!");
      } else {
        dispatch(addPatient(newPatient));
        navigate("/");
      }
    }
    addPatientToWard(newPatient);
  };

  const handleCancel = () => {
    if (state) {
      navigate(state?.location?.pathname);
    } else {
      navigate("/");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" }
      }}
      noValidate
      autoComplete="off"
      className="patient-form-container"
    >
      <div>
        <TextField
          id="name"
          label="Name"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="age"
          label="Age"
          variant="filled"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <FormControl fullWidth variant="filled">
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          id="phone"
          label="Phone"
          variant="filled"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="address"
          label="Address"
          variant="filled"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="medicalhistory"
          label="Medical History"
          variant="filled"
          value={medicalHistory}
          onChange={(e) => setMedicalhistory(e.target.value)}
        />
      </div>
      <div>
        <FormControl fullWidth variant="filled">
          <InputLabel id="demo-simple-select-label">Assigned Ward</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={assignedWard}
            label="Gender"
            onChange={(e) => setAssignedWard(e.target.value)}
          >
            {wards.map((ward) => (
              <MenuItem value={ward.name}>{ward.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handelSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
