import { combineReducers, configureStore } from '@reduxjs/toolkit';

import jobs from './jobs.reducer';
import skill from './skill.reducer';

export * from './jobs.reducer';
export * from './skill.reducer';

const appReducer = combineReducers({ jobs, skill });

export const state = configureStore({ reducer: appReducer });
