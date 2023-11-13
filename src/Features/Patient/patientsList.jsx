import "./patientsInfo.css";
import { useNavigate, useLocation } from "react-router-dom";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PatientList = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="patient-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell align="right">
                <b>Age</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((patient) => (
              <TableRow
                key={patient._id}
                className="patient-wrapper"
                onClick={() =>
                  navigate(`patient-details/${patient?._id}`, {
                    state: location
                  })
                }
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="patient">
                  {patient?.name}
                </TableCell>
                <TableCell align="right">{patient?.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default PatientList;
