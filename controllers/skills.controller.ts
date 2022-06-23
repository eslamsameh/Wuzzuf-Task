import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArrayOfJobsAPI, getArrayOfSkillsAPI, getSkillAPI } from './APIS';

const mergeSkillsWithJobs = async (data: any) => {
  const newData = (data.skill || {}) as any;
  const skills = await getArrayOfSkillsAPI(newData.relationships.skills);
  const jobs = await getArrayOfJobsAPI(newData.relationships.jobs);

  newData.relationships.skills = skills?.data?.map((skill: any) => skill.data.skill) || [];
  newData.relationships.jobs = jobs?.data?.map((job: any) => job.data.job) || [];
  return newData;
};

export const getSingleSkill = createAsyncThunk('fetchSingleSkill', async (id: string) => {
  const { data, error } = await getSkillAPI(id);
  if (!error) {
    const newJobs = await mergeSkillsWithJobs(data);
    return { ...data, skill: newJobs, error: null, loading: false };
  } else {
    return { jobs: [], error, loading: false };
  }
});
