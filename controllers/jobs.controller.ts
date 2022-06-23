import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArrayOfSkillsAPI, getJobsAPI, searchJobsAPI } from './APIS';

interface ActionProps {
  limit: number;
  page: number;
}

const mergeSkillsWithJobs = async (data: { jobs: JobObject[] }) => {
  const { jobs } = data || [];

  for (const job of jobs) {
    const skill = await getArrayOfSkillsAPI(job.relationships.skills);
    job.relationships.skills = skill.data.map((skill: { data: { skill: SkillObject } }) => skill.data.skill);
  }
  return jobs;
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
