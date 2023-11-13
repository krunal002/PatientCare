import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWard, fetchWardDetails } from "./wardSlice";

import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const WardDetails = () => {
  const { wardId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { wardDetails, status, error } = useSelector((state) => state.wards);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchWardDetails(wardId));
    }, 100);
  }, [dispatch, wardId]);

  const handleDalete = () => {
    dispatch(deleteWard(wardDetails._id));
    navigate("/ward");
  };

  const handleEdit = (wardDetails) => {
    navigate("/ward-form", { state: { wardDetails, location } });
  };

  // console.log("wardDetails : ", wardDetails);
  return (
    <div className="ward-container">
      {error && <p>Error : {error}</p>}
      {status === "loading" && <div>Getting Ward Details . . .</div>}
      {status === "success" && (
        <div className="ward-details-container">
          <h3>{wardDetails?.name}</h3>

          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            color="warning"
          >
            <Button onClick={() => handleEdit(wardDetails)}>Edit</Button>
            <Button onClick={handleDalete}>Delete</Button>
            <Button onClick={() => navigate("/ward")}>Back</Button>
          </ButtonGroup>

          <p>Capacity : {wardDetails?.capacity}</p>
          <p>Specialization : {wardDetails?.specialization}</p>
          <p>Current Occupancy : {wardDetails?.patients?.length}</p>
          {/* <p>Address : {wardDetails.address}</p> */}

          <div className="ward-patient-container">
            {wardDetails?.patients?.map((patient) => (
              <Button
                variant="outlined"
                color="warning"
                sx={{ minWidth: "250px" }}
                className="show-patient-container"
                onClick={() =>
                  navigate(`/patient-details/${patient._id}`, {
                    state: location
                  })
                }
              >
                {patient.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default WardDetails;
