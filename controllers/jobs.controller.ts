import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArrayOfSkillsAPI, getJobsAPI, searchJobsAPI } from './APIS';

interface ActionProps {
  limit: number;
  page: number;
}

const mergeSkillsWithJobs = async (data: any) => {
  const newJobs = (data.jobs || []) as any[];

  for (const job of newJobs) {
    const skill = await getArrayOfSkillsAPI(job.relationships.skills);
    job.relationships.skills = skill.data.map((skill: any) => skill.data.skill);
  }
  return newJobs;
};

export const getAllJobs = createAsyncThunk('fetchJobs', async ({ page, limit }: ActionProps) => {
  const { data, error } = await getJobsAPI(page, limit);
  if (!error) {
    const newJobs = await mergeSkillsWithJobs(data);
    return { ...data, jobs: newJobs, error: null, loading: false };
  } else {
    return { jobs: [], error, loading: false };
  }
});

export const getJobsResult = createAsyncThunk('fetchJobSearch', async (value: string) => {
  const { data, error } = await searchJobsAPI(value);
  if (!error) {
    const newJobs = await mergeSkillsWithJobs(data);
    return { ...data, jobs: newJobs, error: null, loading: false };
  } else {
    return { jobs: [], error, loading: false };
  }
});
