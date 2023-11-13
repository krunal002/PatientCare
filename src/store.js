import { configureStore } from "@reduxjs/toolkit";
import { patientSlice } from "./Features/Patient/patientSlice";
import { wardSlice } from "./Features/Ward/wardSlice";

export default configureStore({
  reducer: {
    patients: patientSlice.reducer,
    wards: wardSlice.reducer
  }
});
