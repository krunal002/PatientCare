import "./hospital.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { fetchPatient } from "../../Features/Patient/patientSlice";
import { fetchWard } from "../../Features/Ward/wardSlice";

const Hospital = () => {
  const { patients } = useSelector((state) => state.patients);
  const { wards } = useSelector((state) => state.wards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPatient());
    dispatch(fetchWard());
  }, [dispatch]);

  const totalBeds = wards.reduce((acc, curr) => acc + curr.capacity, 0);
  const occupancyRate = (patients.length / totalBeds) * 100;
  return (
    <div className="hospital-container">
      <h2>Hospital</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableBody>
            {/* 1 */}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th">Total patients</TableCell>
              <TableCell align="right">{patients.length}</TableCell>
            </TableRow>

            {/* 2 */}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th">Total Wards</TableCell>
              <TableCell align="right">{wards.length}</TableCell>
            </TableRow>

            {/* 3 */}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th">Total Beds</TableCell>
              <TableCell align="right">{totalBeds}</TableCell>
            </TableRow>

            {/* 4 */}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th">Occupancy Rate</TableCell>
              <TableCell align="right">
                <b>{Math.ceil(occupancyRate)}%</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Hospital;
