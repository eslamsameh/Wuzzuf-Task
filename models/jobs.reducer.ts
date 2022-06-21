import { createSlice } from '@reduxjs/toolkit';
import { getAllJobs } from 'controllers';

interface StateProps {
  jobs: any;
  jobStatus: Status;
}

const initialState = {
  jobs: {},
  jobStatus: { loading: false, error: null, success: false },
} as StateProps;

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetAllJobs: (state: StateProps) => {
      state.jobs = {};
      state.jobStatus = { loading: false, error: null, success: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.jobStatus = { loading: true, error: null, success: false };
    });

    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.jobStatus = { loading: false, error: null, success: true };
      state.jobs = action.payload;
    });

    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.jobStatus = { loading: false, error: action.error.message, success: false };
      state.jobs = [];
    });
  },
});

export default jobsSlice.reducer;
export const { resetAllJobs } = jobsSlice.actions;
