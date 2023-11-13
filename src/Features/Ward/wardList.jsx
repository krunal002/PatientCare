import { useLocation, useNavigate } from "react-router";
import "./wardsInfo.css";

import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchWard } from "./wardSlice";

const WardList = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { wards, status } = useSelector((state) => state.wards);

  useEffect(() => {
    if (status === "idle") {
      setTimeout(() => {
        dispatch(fetchWard());
      }, 1000);
    }
    console.log("Active");
  }, [dispatch, status]);

  return (
    <div className="ward-container">
      {/* mui table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell align="right">
                <b>Occupancy</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {wards?.map((ward) => (
              <TableRow
                key={ward._id}
                className="ward-wrapper"
                onClick={() =>
                  navigate(`/ward-details/${ward._id}`, { state: location })
                }
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="ward">
                  {ward?.name}
                </TableCell>
                <TableCell align="right">{ward?.patients?.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default WardList;
