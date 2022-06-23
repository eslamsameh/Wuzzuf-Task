import { createSlice } from '@reduxjs/toolkit';
import { getAllJobs, getJobsResult } from 'controllers';
export const SEARCH_HISTORY = 'SEARCH_HISTORY';

interface StateProps {
  jobs: { jobs: { jobs: JobObject[] | [] } } | Object;
  jobStatus: Status;
  searchJobsResults: { jobs: { jobs: JobObject[] | [] } } | Object;
  searchJobsStatus: Status;
  searchHistory: string[];
}

const initialState = {
  jobs: {},
  jobStatus: { loading: false, error: null, success: false },
  searchJobsResults: {},
  searchJobsStatus: { loading: false, error: null, success: false },
  searchHistory: [],
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
    getSearchResults: (state: StateProps) => {
      const pervouseHistory = JSON.parse(localStorage.getItem(SEARCH_HISTORY) || '[]') as string[];
      state.searchHistory = pervouseHistory;
    },
    addSearchHistory: (state: StateProps, action: { payload: string }) => {
      const pervouseHistory = JSON.parse(localStorage.getItem(SEARCH_HISTORY) || '[]') as string[];
      const isExistBefore = Boolean(pervouseHistory.filter((v) => v.trim() === action.payload.trim()).length);
      if (!isExistBefore) {
        const newSearchHistoryArray = [...pervouseHistory, action.payload.trimEnd()];
        state.searchHistory = [...newSearchHistoryArray];
        localStorage.setItem(SEARCH_HISTORY, JSON.stringify(newSearchHistoryArray));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.jobStatus = { loading: true, error: null, success: false };
    });

    builder.addCase(getAllJobs.fulfilled, (state: { jobs: any; jobStatus: Status }, action) => {
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
export const { resetAllJobs, resetAllJobSearchResults, addSearchHistory, getSearchResults } = jobsSlice.actions;
