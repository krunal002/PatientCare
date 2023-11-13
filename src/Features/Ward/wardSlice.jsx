import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWard = createAsyncThunk("wards/fetchWard", async () => {
  const response = await axios.get(
    "https://patientcare.krunalmandlekar.repl.co/ward" // Assuming you have a Ward API
  );

  if (response.status === 200) {
    return response.data.data;
  }
});

export const fetchWardDetails = createAsyncThunk(
  "wards/fetchWardDetails",
  async (id) => {
    const response = await axios.get(
      `https://patientcare.krunalmandlekar.repl.co/ward/${id}` // Update API endpoint
    );

    if (response.status === 200) {
      return response.data.data;
    }
  }
);

export const addWard = createAsyncThunk("wards/addWard", async (newWard) => {
  const response = await axios.post(
    "https://patientcare.krunalmandlekar.repl.co/ward", // Update API endpoint
    newWard
  );

  if (response.status === 200) {
    return response.data.data;
  }
});

export const updateWard = createAsyncThunk(
  "wards/updateWard",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `https://patientcare.krunalmandlekar.repl.co/ward/${id}`, // Update API endpoint
      updatedData
    );

    if (response.status === 200) {
      return response.data.data;
    }
  }
);

export const deleteWard = createAsyncThunk("wards/deleteWard", async (id) => {
  const response = await axios.delete(
    `https://patientcare.krunalmandlekar.repl.co/ward/${id}` // Update API endpoint
  );

  if (response.status === 200) {
    return response.data.data;
  }
});

export const addPatientToWard = createAsyncThunk(
  "wards/addPatientToWard",
  async ({ id, patient }) => {
    const response = await axios.post(
      `https://patientcare.krunalmandlekar.repl.co/ward/${id}/patient`,
      patient
    );

    if (response.status === 200) {
      return response.data.data;
    }
  }
);

export const updatePatientInward = createAsyncThunk(
  "wards/updatePatientInward",
  async ({ wardId, patientId, updatedData }) => {
    const response = await axios.put(
      `https://patientcare.krunalmandlekar.repl.co/ward/${wardId}/patient/${patientId}`,
      updatedData
    );

    if (response.status === 200) {
      console.log(response.data.data);
    }
  }
);

export const deletePatientInWard = createAsyncThunk(
  "wards/deletePatientInWard",
  async ({ wardId, patientId }) => {
    response = await axios.delete(
      `https://patientcare.krunalmandlekar.repl.co/ward/${wardId}/patient/${patientId}`
    );

    if (response.status === 200) {
      console.log("Deleted");
    }
  }
);

const initialState = {
  wards: [],
  wardDetails: {},
  status: "idle",
  error: null
};

export const wardSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWard.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.wards = action.payload;
    },
    [fetchWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [fetchWardDetails.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchWardDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.wardDetails = action.payload;
    },
    [fetchWardDetails.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addWard.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [addWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.wards.push(action.payload);
    },
    [addWard.rejected]: (state, action) => {
      state.error = "error";
      state.error = action.error.message;
    },

    [updateWard.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [updateWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.wardDetails = action.payload;
      state.wards = state.wards.map((ward) =>
        ward._id === action.payload._id ? action.payload : ward
      );
    },
    [updateWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [deleteWard.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [deleteWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.wards = state.wards.filter(
        (ward) => ward._id !== action.payload._id
      );
    },
    [deleteWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  },

  [addPatientToWard.pending]: (state) => {
    state.status = "loading";
  },
  [addPatientToWard.fulfilled]: (state, action) => {
    state.status = "success";
    state.wards = state.wards.map((ward) =>
      ward._id === action.payload._id ? action.payload : ward
    );
  },
  [addPatientToWard.rejected]: (state, action) => {
    state.status = "error";
    state.error = action.error.message;
  }
});

export default wardSlice.reducer;
