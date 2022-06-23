import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArrayOfJobsAPI, getArrayOfSkillsAPI, getSkillAPI } from './APIS';

const mergeSkillsWithJobs = async (data: { skill: SkillObject }) => {
  const { skill } = data || {};
  const skills = await getArrayOfSkillsAPI(skill?.relationships?.skills);
  const jobs = await getArrayOfJobsAPI(skill?.relationships?.jobs);

  skill.relationships.skills = skills?.data?.map((skill: { data: { skill: SkillObject } }) => skill.data.skill) || [];
  skill.relationships.jobs = jobs?.data?.map((job: { data: { job: JobObject } }) => job.data.job) || [];
  return skill;
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
