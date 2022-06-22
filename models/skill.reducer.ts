import { createSlice } from '@reduxjs/toolkit';
import { getSingleSkill } from 'controllers';

interface StateProps {
  skill: any;
  skillStatus: Status;
}

const initialState = {
  skill: {},
  skillStatus: { loading: false, error: null, success: false },
} as StateProps;

export const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    resetSkill: (state: StateProps) => {
      state.skill = {};
      state.skillStatus = { loading: false, error: null, success: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSingleSkill.pending, (state) => {
      state.skillStatus = { loading: true, error: null, success: false };
    });

    builder.addCase(getSingleSkill.fulfilled, (state, action) => {
      state.skillStatus = { loading: false, error: null, success: true };
      state.skill = { ...action.payload, skill: action.payload.skill };
    });

    builder.addCase(getSingleSkill.rejected, (state, action) => {
      state.skillStatus = { loading: false, error: action.error.message, success: false };
      state.skill = {};
    });
  },
});

export default skillSlice.reducer;
export const { resetSkill } = skillSlice.actions;
