import "./ward.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import * as React from "react";
import Button from "@mui/material/Button";

import { fetchWard } from "../../Features/Ward/wardSlice";
import WardList from "../../Features/Ward/wardList";

const Ward = () => {
  const { wards, status, error } = useSelector((state) => state.wards);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWard());
    }
  }, [dispatch, status]);

  return (
    <div>
      <h2>Wards</h2>
      <Button
        variant="contained"
        onClick={() => navigate("/ward-form")}
        color="error"
        sx={{ m: 1, minWidth: "300px" }}
      >
        Add Ward
      </Button>

      {status === "loading" && "Loading..."}
      {error && <p>Error : {error}</p>}
      {status === "success" && <WardList data={wards} />}
    </div>
  );
};
export default Ward;
