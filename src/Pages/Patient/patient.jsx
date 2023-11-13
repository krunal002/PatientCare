import "./patient.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import * as React from "react";
import Button from "@mui/material/Button";

import { fetchPatient } from "../../Features/Patient/patientSlice";
import PatientList from "../../Features/Patient/patientsList";

const Patient = () => {
  const dispatch = useDispatch();
  const { patients, status, error } = useSelector((state) => state.patients);

  useState(() => {
    dispatch(fetchPatient());
  }, [dispatch]);

  // console.log(patients, status, error);

  const navigate = useNavigate();

  return (
    <div>
      <h2>Patient</h2>
      <Button
        variant="contained"
        onClick={() => navigate("/register-patient")}
        color="error"
        sx={{ m: 1, minWidth: "300px" }}
      >
        Add Patient
      </Button>

      {error && <p>Error : {error}</p>}
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div>
          <PatientList data={patients} />
        </div>
      )}
    </div>
  );
};
export default Patient;
