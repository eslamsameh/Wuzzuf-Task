import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArrayOfJobsAPI, getArrayOfSkillsAPI, getSingleJobAPI } from './APIS';

const mergeSkillsWithJobs = async (data: any) => {
  const { job } = (data || {}) as any;
  const skills = await getArrayOfSkillsAPI(job?.relationships?.skills);
  const jobs = await getArrayOfJobsAPI(job?.relationships?.jobs);

  job.relationships.skills = skills?.data?.map((skill: any) => skill.data.skill) || [];
  job.relationships.jobs = jobs?.data?.map((job: any) => job.data.job) || [];
  return job;
};

export const getSingleJob = createAsyncThunk('fetchSingleJob', async (id: string) => {
  const { data, error } = await getSingleJobAPI(id);
  if (!error) {
    const newJob = await mergeSkillsWithJobs(data);
    return { ...data, job: newJob, error: null, loading: false };
  } else {
    return { job: {}, error, loading: false };
  }
});
