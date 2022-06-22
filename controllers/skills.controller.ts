import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from 'helpers';
import { axiosInstance } from './interceptor';

const getSkillService = async (value: string): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/skill/${value}`);
    return { data: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

const getArrayOfSkillsService = async (arrayOfIds: any[]): Promise<ResponseProps> => {
  try {
    const data = await Promise.all(arrayOfIds.map((v) => axiosInstance.get(`/skill/${v.id}`)));
    return { data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

const getArrayOfJobsService = async (arrayOfIds: any[]): Promise<ResponseProps> => {
  try {
    const data = await Promise.all(arrayOfIds.map((v) => axiosInstance.get(`/job/${v.id}`)));
    return { data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

const mergeSkillsWithJobs = async (data: any) => {
  const newData = (data.skill || {}) as any;

  const skills = await getArrayOfSkillsService(newData.relationships.skills);
  const jobs = await getArrayOfJobsService(newData.relationships.jobs);

  newData.relationships.skills = skills.data.map((s: any) => s.data.data.skill);
  newData.relationships.jobs = jobs.data.map((s: any) => s.data.data.job);

  return newData;
};

export const getSingleSkill = createAsyncThunk('fetchSingleSkill', async (id: string) => {
  const { data, error } = await getSkillService(id);
  if (!error) {
    const newJobs = await mergeSkillsWithJobs(data);
    return { ...data, skill: newJobs, error: null, loading: false };
  } else {
    return { jobs: [], error, loading: false };
  }
});
