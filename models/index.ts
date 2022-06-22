import { combineReducers, configureStore } from '@reduxjs/toolkit';

import jobs from './jobs.reducer';
import skill from './skill.reducer';
import job from './job.reducer';

export * from './jobs.reducer';
export * from './skill.reducer';
export * from './job.reducer';

const appReducer = combineReducers({ jobs, skill, job });

export const state = configureStore({ reducer: appReducer });
