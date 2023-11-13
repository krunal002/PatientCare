import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePatient, fetchPatientDetails } from "./patientSlice";

import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ManIcon from "@mui/icons-material/Male";
import WomanIcon from "@mui/icons-material/Female";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import { deletePatientInWard } from "../Ward/wardSlice";

const PatientDetails = () => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { patientDetails, status, error } = useSelector(
    (state) => state.patients
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchPatientDetails(patientId));
    }, 100);
  }, [dispatch, patientId]);

  const handleDalete = () => {
    dispatch(deletePatient(patientDetails._id));
    dispatch(
      deletePatientInWard({
        wardId: patientDetails.assignedWardId,
        patientId: patientDetails._id
      })
    );
    navigate("/");
  };

  const handleEdit = (patientDetails) => {
    navigate("/register-patient", { state: { patientDetails, location } });
  };

  // console.log("patientDetails");
  return (
    <div>
      {error && <p>Error : {error}</p>}
      {status === "loading" && <div>Getting Patient Details . . .</div>}
      {status === "success" && (
        <div className="patient-details-container">
          <h3>{patientDetails?.name}</h3>

          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            color="warning"
          >
            <Button onClick={() => handleEdit(patientDetails)}>Edit</Button>
            <Button onClick={handleDalete}>Delete</Button>
            <Button onClick={() => navigate("/")}>Back</Button>
          </ButtonGroup>

          <p className="info-wrapper">
            <b>Age</b> : {patientDetails?.age}
          </p>
          <p className="info-wrapper">
            {patientDetails?.gender === "Male" ? <ManIcon /> : <WomanIcon />}
            {patientDetails?.gender}
          </p>
          <p className="info-wrapper">
            <PhoneIcon /> {patientDetails?.phone}
          </p>
          <p className="info-wrapper">
            <HomeIcon />
            {patientDetails?.address}
          </p>
          <div className="assignedWard-container">
            {/* <p>Assigned Ward</p> */}
            <Button
              variant="outlined"
              color="warning"
              sx={{ fontWeight: "bold" }}
              onClick={() =>
                navigate(`/ward-details/${patientDetails?.assignedWardId}`, {
                  state: location
                })
              }
            >
              {patientDetails?.assignedWard}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PatientDetails;
