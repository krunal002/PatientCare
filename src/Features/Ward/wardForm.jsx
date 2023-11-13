import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWard, updateWard } from "./wardSlice";

export default function WardForm() {
  let { state } = useLocation();
  const ward = state?.wardDetails ? state.wardDetails : null;

  const [name, setName] = useState(ward ? ward.name : "");
  const [capacity, setCapacity] = useState(ward ? ward.capacity : "");
  const [specialization, setSpecialization] = useState(
    ward ? ward.specialization : ""
  );

  const newWard = {
    name,
    capacity,
    specialization
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelSubmit = () => {
    if (state) {
      const id = ward._id;
      const updatedData = newWard;
      dispatch(updateWard({ id, updatedData }));
      navigate(state?.location?.pathname);
    } else {
      dispatch(addWard(newWard));
      navigate("/ward");
    }
  };
  const handleCancel = () => {
    if (state) {
      navigate(state?.location?.pathname);
    } else {
      navigate("/ward");
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
      className="ward-form-container"
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
          id="capacity"
          label="Capacity"
          variant="filled"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="specialization"
          label="Specialization"
          variant="filled"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
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
