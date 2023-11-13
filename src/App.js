import "./styles.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

import Hospital from "./Pages/Hospital/hospital";
import Ward from "./Pages/Ward/ward";
import PatientDetails from "./Features/Patient/patientDetails";
import RegisterPatient from "./Features/Patient/addPatient";
import WardDetails from "./Features/Ward/wardDetails";
import WardForm from "./Features/Ward/wardForm";
import Patient from "./Pages/Patient/patient";

export default function App() {
  return (
    <div className="App">
      <Typography variant="h4" gutterBottom color="error">
        PatientCare
      </Typography>
      <div>
        <NavLink to="/" className="navlink-container">
          Patients
        </NavLink>
        <NavLink to="/ward" className="navlink-container">
          Wards
        </NavLink>
        <NavLink to="/hospital" className="navlink-container">
          Hospital
        </NavLink>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Patient />} />
          <Route
            path="/patient-details/:patientId"
            element={<PatientDetails />}
          />
          <Route path="/register-patient" element={<RegisterPatient />} />

          <Route path="/hospital" element={<Hospital />} />
          <Route path="/ward" element={<Ward />} />
          <Route path="/ward-form" element={<WardForm />} />
          <Route path="/ward-details/:wardId" element={<WardDetails />} />
        </Routes>
      </div>
    </div>
  );
}
