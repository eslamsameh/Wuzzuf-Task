import { combineReducers, configureStore } from '@reduxjs/toolkit';

import jobs from './jobs.reducer';
export * from './jobs.reducer';

const appReducer = combineReducers({ jobs });

export const state = configureStore({ reducer: appReducer });
