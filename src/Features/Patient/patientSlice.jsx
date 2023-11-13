import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWard,
  addPatientToWard,
  updatePatientInward
} from "../Ward/wardSlice";

export const fetchPatient = createAsyncThunk(
  "patients/fetchPatient",
  async () => {
    const response = await axios.get(
      "https://patientcare.krunalmandlekar.repl.co/patient"
    );

    if (response.status === 200) {
      return response.data.data;
    }
  }
);

export const fetchPatientDetails = createAsyncThunk(
  "patients/fetchPatientDetails",
  async (id) => {
    const response = await axios.get(
      `https://patientcare.krunalmandlekar.repl.co/patient/${id}`
    );

    if (response.status === 200) {
      return response.data.data;
    }
  }
);

export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (newPatient, { dispatch }) => {
    const response = await axios.post(
      "https://patientcare.krunalmandlekar.repl.co/patient",
      newPatient
    );

    if (response.status === 201) {
      dispatch(
        addPatientToWard({
          id: response.data.data.assignedWardId,
          patient: response.data.data
        })
      );
      return response.data.data;
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async ({ id, updatedData }, { dispatch }) => {
    const response = await axios.put(
      `https://patientcare.krunalmandlekar.repl.co/patient/${id}`,
      updatedData
    );

    // console.log("updated", response.data.data);
    if (response.status === 200) {
      dispatch(
        updatePatientInward({
          wardId: response.data.data.assignedWardId,
          patientId: response.data.data._id,
          updatedData: response.data.data
        })
      );
      return response.data.data;
    }
  }
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id) => {
    const response = await axios.delete(
      `https://patientcare.krunalmandlekar.repl.co/patient/${id}`
    );

    if (response.status === 200) {
      return response.data.data;
    }
  }
);

const initialState = {
  patients: [],
  patientDetails: {},
  status: "idle",
  error: null
};

export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPatient.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchPatient.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.patients = action.payload;
    },
    [fetchPatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [fetchPatientDetails.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchPatientDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.patientDetails = action.payload;
    },
    [fetchPatientDetails.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addPatient.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [addPatient.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.patients.push(action.payload);
    },
    [addPatient.rejected]: (state, action) => {
      state.error = "error";
      state.error = action.error.message;
    }
  },

  [updatePatient.pending]: (state) => {
    state.status = "loading";
    state.error = null;
  },
  [updatePatient.fulfilled]: (state, action) => {
    state.status = "success";
    state.error = null;
    state.patientDetails = action.payload;
    state.patients = state.patients.map((patient) =>
      patient._id === action.payload._id ? action.payload : patient
    );
  },
  [updatePatient.rejected]: (state, action) => {
    state.status = "error";
    state.error = action.error.message;
  },

  [deletePatient.pending]: (state) => {
    state.status = "loading";
    state.error = null;
  },
  [deletePatient.fulfilled]: (state, action) => {
    state.status = "success";
    state.error = null;
    state.patients = state.patients.filter(
      (patient) => patient._id !== action.payload._id
    );
  },
  [deletePatient.rejected]: (state, action) => {
    state.status = "error";
    state.error = action.error.message;
  }
});

export default patientSlice.reducer;
