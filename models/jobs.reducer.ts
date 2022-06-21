import { createSlice } from '@reduxjs/toolkit';
import { getAllJobs, getJobsResult } from 'controllers';

interface StateProps {
  jobs: any;
  jobStatus: Status;
  searchJobsResults: any;
  searchJobsStatus: Status;
}

const initialState = {
  jobs: {},
  jobStatus: { loading: false, error: null, success: false },
  searchJobsResults: {},
  searchJobsStatus: { loading: false, error: null, success: false },
} as StateProps;

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetAllJobs: (state: StateProps) => {
      state.jobs = {};
      state.jobStatus = { loading: false, error: null, success: false };
    },
    resetAllJobSearchResults: (state: StateProps) => {
      state.searchJobsResults = {};
      state.searchJobsStatus = { loading: false, error: null, success: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.jobStatus = { loading: true, error: null, success: false };
    });

    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.jobStatus = { loading: false, error: null, success: true };
      state.jobs = { ...action.payload, jobs: [...(state.jobs.jobs || []), ...action.payload.jobs] };
    });

    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.jobStatus = { loading: false, error: action.error.message, success: false };
      state.jobs = [];
    });

    builder.addCase(getJobsResult.pending, (state) => {
      state.searchJobsStatus = { loading: true, error: null, success: false };
    });

    builder.addCase(getJobsResult.fulfilled, (state, action) => {
      state.searchJobsStatus = { loading: false, error: null, success: true };
      state.searchJobsResults = action.payload;
    });

    builder.addCase(getJobsResult.rejected, (state, action) => {
      state.searchJobsStatus = { loading: false, error: action.error.message, success: false };
      state.searchJobsResults = [];
    });
  },
});

export default jobsSlice.reducer;
export const { resetAllJobs, resetAllJobSearchResults } = jobsSlice.actions;
