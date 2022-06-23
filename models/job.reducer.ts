import { createSlice } from '@reduxjs/toolkit';
import { getSingleJob } from 'controllers';

interface StateProps {
  job: JobObject | Object;
  jobStatus: Status;
}

const initialState = {
  job: {},
  jobStatus: { loading: false, error: null, success: false },
} as StateProps;

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    resetSingleJob: (state: StateProps) => {
      state.job = {};
      state.jobStatus = { loading: false, error: null, success: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSingleJob.pending, (state) => {
      state.jobStatus = { loading: true, error: null, success: false };
    });

    builder.addCase(getSingleJob.fulfilled, (state, action) => {
      state.jobStatus = { loading: false, error: null, success: true };
      state.job = { ...action.payload, job: action.payload.job };
    });

    builder.addCase(getSingleJob.rejected, (state, action) => {
      state.jobStatus = { loading: false, error: action.error.message, success: false };
      state.job = {};
    });
  },
});

export default jobSlice.reducer;
export const { resetSingleJob } = jobSlice.actions;
